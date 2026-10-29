// HTTP + WebSocket sunucusu. Sunucu tek otoritedir; istemci yalnız istek gönderir.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import QRCode from 'qrcode';
import { Store } from './store.js';
import * as R from './room.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(here, '../public');
const ROOM_MAX_AGE = 1000 * 60 * 60 * 48; // 48 saat hareketsiz oda silinir
const REQ_LOG_MAX = 40;

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };

export function startServer({ port = 3000, host = '0.0.0.0', dbFile = path.join(here, '../data/oyun.db'), quiet = false } = {}) {
  const log = quiet ? () => {} : (...a) => console.log(new Date().toISOString(), ...a);
  const store = new Store(dbFile);
  const rooms = new Map();
  for (const r of store.loadAll(ROOM_MAX_AGE)) {
    for (const p of r.players) if (!p.isBot) p.connected = false; // yeniden başlatmada herkes bağlantısız başlar
    rooms.set(r.roomCode, r);
  }
  log(`kayıttan ${rooms.size} oda yüklendi`);

  const sockets = new Map(); // roomCode -> Set<ws>
  const rate = new Map(); // ip -> {count, reset}

  function limited(ip, max = 30) {
    const now = Date.now();
    let e = rate.get(ip);
    if (!e || e.reset < now) { e = { count: 0, reset: now + 60_000 }; rate.set(ip, e); }
    e.count += 1;
    return e.count > max;
  }

  function persist(room) { store.save(room); }

  function broadcast(room) {
    const set = sockets.get(room.roomCode);
    if (!set) return;
    for (const ws of set) send(ws, { type: 'snapshot', snapshot: R.snapshot(room, ws.playerId) });
  }

  function send(ws, msg) {
    if (ws.readyState === 1) ws.send(JSON.stringify(msg));
  }

  function bind(ws, room, player) {
    if (ws.roomCode && ws.roomCode !== room.roomCode) unbind(ws);
    ws.roomCode = room.roomCode;
    ws.playerId = player.id;
    if (!sockets.has(room.roomCode)) sockets.set(room.roomCode, new Set());
    sockets.get(room.roomCode).add(ws);
    R.setConnected(room, player.id, true);
  }

  function unbind(ws) {
    const room = rooms.get(ws.roomCode);
    const set = sockets.get(ws.roomCode);
    if (set) set.delete(ws);
    if (room) {
      const still = [...(set || [])].some((s) => s.playerId === ws.playerId);
      if (!still && R.setConnected(room, ws.playerId, false)) { persist(room); broadcast(room); }
    }
    ws.roomCode = null;
    ws.playerId = null;
  }

  // ---------- HTTP ----------
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    if (url.pathname === '/api/health') {
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ ok: true, rooms: rooms.size }));
    }
    if (url.pathname === '/api/qr') {
      const text = (url.searchParams.get('text') || '').slice(0, 300);
      try {
        const svg = await QRCode.toString(text || ' ', { type: 'svg', margin: 1, color: { dark: '#e8e1d4', light: '#00000000' } });
        res.writeHead(200, { 'content-type': 'image/svg+xml', 'cache-control': 'max-age=3600' });
        return res.end(svg);
      } catch { res.writeHead(400); return res.end(); }
    }
    let file = url.pathname === '/' ? '/index.html' : url.pathname;
    const full = path.normalize(path.join(PUBLIC, file));
    if (!full.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
    fs.readFile(full, (err, data) => {
      if (err) {
        // Tek sayfalık uygulama: bilinmeyen yollar ana sayfaya
        return fs.readFile(path.join(PUBLIC, 'index.html'), (e2, html) => {
          if (e2) { res.writeHead(404); return res.end(); }
          res.writeHead(200, { 'content-type': MIME['.html'] });
          res.end(html);
        });
      }
      res.writeHead(200, {
        'content-type': MIME[path.extname(full)] || 'application/octet-stream',
        'cache-control': 'no-cache',
        'x-content-type-options': 'nosniff',
        'content-security-policy': "default-src 'self'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' ws: wss:",
      });
      res.end(data);
    });
  });

  // ---------- WebSocket ----------
  const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 8 * 1024 });

  wss.on('connection', (ws, req) => {
    ws.ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
    ws.on('message', (raw) => {
      let msg;
      try { msg = JSON.parse(raw); } catch { return; }
      if (!msg || typeof msg !== 'object' || typeof msg.type !== 'string') return;
      try { handle(ws, msg); } catch (e) {
        const error = e instanceof R.GameError ? e.message : 'Sunucu hatası.';
        if (!(e instanceof R.GameError)) log('hata', e);
        send(ws, { type: 'response', requestId: msg.requestId, ok: false, error });
      }
    });
    ws.on('close', () => unbind(ws));
  });

  const heartbeat = setInterval(() => {
    for (const ws of wss.clients) {
      if (!ws.isAlive) { ws.terminate(); continue; }
      ws.isAlive = false;
      ws.ping();
    }
  }, 25_000);

  const str = (v, max = 64) => (typeof v === 'string' ? v.slice(0, max) : '');

  function handle(ws, msg) {
    const reply = (extra = {}) => send(ws, { type: 'response', requestId: msg.requestId, ok: true, ...extra });

    // --- kimlik gerektirmeyen ---
    if (msg.type === 'create' || msg.type === 'join' || msg.type === 'resume') {
      if (limited(ws.ip)) throw new R.GameError('Çok fazla deneme. Bir dakika sonra tekrar dene.');
      if (msg.type === 'create') {
        const code = R.makeRoomCode((c) => rooms.has(c));
        const { room, player, key } = R.createRoom(code, str(msg.name, 200));
        rooms.set(code, room);
        bind(ws, room, player);
        persist(room);
        log('oda kuruldu', code);
        send(ws, { type: 'session', roomCode: code, playerId: player.id, key });
        broadcast(room);
        return reply();
      }
      const room = rooms.get(str(msg.roomCode, 10).toUpperCase());
      if (!room) throw new R.GameError('Bu kodla bir oda bulunamadı.');
      if (msg.type === 'join') {
        const { player, key } = R.joinRoom(room, str(msg.name, 200));
        bind(ws, room, player);
        persist(room);
        send(ws, { type: 'session', roomCode: room.roomCode, playerId: player.id, key });
        broadcast(room);
        return reply();
      }
      const player = R.authenticate(room, str(msg.playerId), str(msg.key, 128));
      if (!player) throw new R.GameError('Oturum bulunamadı. Odaya yeniden katılman gerekebilir.');
      bind(ws, room, player);
      persist(room);
      send(ws, { type: 'session', roomCode: room.roomCode, playerId: player.id, resumed: true });
      broadcast(room);
      return reply();
    }

    // --- kimlik gerekli ---
    const room = rooms.get(ws.roomCode);
    if (!room) throw new R.GameError('Önce bir odaya katıl.');
    const pid = ws.playerId;

    if (msg.type === 'snapshot') return send(ws, { type: 'snapshot', snapshot: R.snapshot(room, pid) });
    if (msg.type === 'notes') return reply({ notes: R.notes(room) });

    // Yazma istekleri: idempotent
    const requestId = str(msg.requestId, 64);
    if (!requestId) throw new R.GameError('İstek kimliği eksik.');
    const logp = (room.requestLog[pid] ||= []);
    const seen = logp.find((e) => e[0] === requestId);
    if (seen) return send(ws, { type: 'response', requestId, ...seen[1] });

    if (msg.gameId && msg.gameId !== room.gameId) throw new R.GameError('STALE');

    let result = { ok: true };
    try {
      switch (msg.type) {
        case 'start': R.startGame(room, pid); break;
        case 'addBot': R.addBot(room, pid, str(msg.name, 200)); break;
        case 'ready': R.markReady(room, pid, { pageId: str(msg.pageId), phaseVersion: msg.phaseVersion }); break;
        case 'vote': R.castVote(room, pid, { nodeId: str(msg.nodeId, 4), voteRound: msg.voteRound, optionId: str(msg.optionId, 1), phaseVersion: msg.phaseVersion }); break;
        case 'pause': R.setPaused(room, pid, !!msg.paused); break;
        case 'returnToLobby': R.returnToLobby(room, pid); break;
        case 'leave': R.leaveLobby(room, pid, msg.targetId ? str(msg.targetId) : pid); break;
        default: throw new R.GameError('Bilinmeyen istek.');
      }
    } catch (e) {
      if (!(e instanceof R.GameError)) throw e;
      result = { ok: false, error: e.message };
    }
    // STALE yanıtları önbelleğe alınmaz: istemci güncel görüntüyle yeniden deneyebilir
    if (result.error !== 'STALE') {
      logp.push([requestId, result]);
      if (logp.length > REQ_LOG_MAX) logp.splice(0, logp.length - REQ_LOG_MAX);
    }
    persist(room);
    send(ws, { type: 'response', requestId, ...result });
    if (msg.type === 'leave' && result.ok && (!msg.targetId || msg.targetId === pid)) {
      sockets.get(room.roomCode)?.delete(ws);
      ws.roomCode = null; ws.playerId = null;
      send(ws, { type: 'left' });
    }
    if (result.error === 'STALE') send(ws, { type: 'snapshot', snapshot: R.snapshot(room, pid) });
    else broadcast(room);
  }

  return new Promise((resolve) => {
    server.listen(port, host, () => {
      const actual = server.address().port;
      log(`Adın Kimde Kaldı? → http://localhost:${actual}`);
      resolve({
        port: actual,
        rooms,
        async close() {
          clearInterval(heartbeat);
          for (const ws of wss.clients) ws.terminate();
          await new Promise((r) => wss.close(r));
          await new Promise((r) => server.close(r));
          store.close();
        },
      });
    });
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  startServer({
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
    dbFile: process.env.DB_FILE || path.join(here, '../data/oyun.db'),
  });
}
