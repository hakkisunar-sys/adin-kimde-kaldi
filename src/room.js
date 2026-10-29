// Oda yaşam döngüsü, okuma ve oylama kuralları.
// Bütün işlemler senkron: tek süreçte bir oda üzerinde aynı anda iki işlem koşamaz.
// Çağıran (server.js) her başarılı yazmadan sonra odayı kalıcı kaydeder ve yayınlar.
import crypto from 'node:crypto';
import {
  STORY, NODES, ENDINGS, initialState, decide, renderScene, renderResult, renderEnding, criticalNotes,
} from './engine.js';
import { validateName } from './names.js';
import { DEFAULT_STORY, storyById, storyList } from './stories.js';
import { makeGame } from './sonsefer/game.js';
import * as SSE from './sonsefer/engine.js';
import * as SME from './sonmisafir/engine.js';

const SURVIVAL = { son_sefer: makeGame(SSE), son_misafirler: makeGame(SME) };

export const MIN_PLAYERS = 4;
export const MAX_PLAYERS = 10;
const CODE_ALPHABET = 'ABCDEFGHJKLMNPRSTUVYZ23456789';

export const newId = (bytes = 9) => crypto.randomBytes(bytes).toString('base64url');
export const hashKey = (key) => crypto.createHash('sha256').update(String(key)).digest('hex');

export function makeRoomCode(exists) {
  for (let i = 0; i < 1000; i++) {
    let c = '';
    for (let j = 0; j < 5; j++) c += CODE_ALPHABET[crypto.randomInt(CODE_ALPHABET.length)];
    if (!exists(c)) return c;
  }
  throw new Error('Oda kodu üretilemedi');
}

class GameError extends Error {}
const fail = (msg) => { throw new GameError(msg); };

function freshGameFields() {
  return {
    gameId: newId(),
    contentVersion: STORY.contentVersion,
    phase: 'LOBBY',
    phaseVersion: 0,
    paused: false,
    cast: [],
    currentNodeId: null,
    currentPageId: null,
    page: null, // sayfa tanımı: {kind, nodeId?, decisionIndex?, endingId?}
    pageSeq: 0,
    pageHistory: [],
    nodeEntryState: null,
    state: null,
    flagSetAt: {},
    readyPlayerIds: [],
    voteRound: 0,
    eligibleOptionIds: [],
    votesByPlayerId: {},
    roundHistory: [],
    lastTie: null,
    decisionLog: [],
    endingId: null,
    ss: null, // hayatta kalma hikâyelerinin oyun durumu
    excluded: [], // ev sahibinin geçici olarak oylamadan çıkardığı (bağlantısı kopuk) oyuncular
  };
}
const isSurvival = (room) => storyById(room.storyId).engine === 'survival';
const sv = (room) => SURVIVAL[room.storyId];

export function createRoom(code, hostName, now = Date.now()) {
  const v = validateName(hostName);
  if (v.error) fail(v.error);
  const key = newId(24);
  const player = { id: newId(), name: v.name, nameKey: v.key, tokenHash: hashKey(key), joinSeq: 1, connected: false };
  const room = {
    roomCode: code,
    createdAt: now,
    updatedAt: now,
    rev: 1,
    joinSeq: 1,
    players: [player],
    hostId: player.id,
    requestLog: {},
    storyId: DEFAULT_STORY,
    ...freshGameFields(),
  };
  return { room, player, key };
}

export function joinRoom(room, name) {
  if (room.phase !== 'LOBBY') fail('Oyun başladı; yeni oyuncu katılamaz. Daha önce katıldıysan aynı cihazdan geri dönebilirsin.');
  if (room.players.length >= MAX_PLAYERS) fail(`Oda dolu (en fazla ${MAX_PLAYERS} kişi).`);
  const v = validateName(name);
  if (v.error) fail(v.error);
  if (room.players.some((p) => p.nameKey === v.key)) fail('Bu ad odada kullanılıyor. Başka bir ad seç.');
  const key = newId(24);
  room.joinSeq += 1;
  const player = { id: newId(), name: v.name, nameKey: v.key, tokenHash: hashKey(key), joinSeq: room.joinSeq, connected: false };
  room.players.push(player);
  bump(room);
  return { player, key };
}

// ---------- Botlar ----------
export const BOT_NAMES = ['Deniz', 'Umut', 'Derya', 'Evren', 'Ekin', 'Kayra', 'Toprak', 'Bulut', 'Ilgın', 'Yağmur', 'Özgür', 'Aydın', 'Doğa', 'Nehir', 'Ufuk', 'Tuna'];

export function addBot(room, playerId, name) {
  if (!isHost(room, playerId)) fail('Bot yalnız ev sahibi tarafından eklenebilir.');
  if (room.phase !== 'LOBBY') fail('Bot yalnız lobide eklenebilir.');
  if (room.players.length >= MAX_PLAYERS) fail(`Oda dolu (en fazla ${MAX_PLAYERS} karakter; botlar dahil).`);
  let v;
  if (name && name.trim()) {
    v = validateName(name);
    if (v.error) fail(v.error);
    if (room.players.some((p) => p.nameKey === v.key)) fail('Bu ad odada kullanılıyor. Başka bir ad seç.');
  } else {
    const free = BOT_NAMES.map(validateName).find((x) => !room.players.some((p) => p.nameKey === x.key));
    if (!free) fail('Bot için boş ad kalmadı; bir ad yaz.');
    v = free;
  }
  room.joinSeq += 1;
  const bot = { id: newId(), name: v.name, nameKey: v.key, tokenHash: null, joinSeq: room.joinSeq, connected: true, isBot: true };
  room.players.push(bot);
  bump(room);
  return bot;
}

const botIds = (room) => room.cast.filter((c) => room.players.find((p) => p.id === c.playerId)?.isBot).map((c) => c.playerId);

export function authenticate(room, playerId, key) {
  const p = room.players.find((x) => x.id === playerId);
  if (!p || p.isBot || !p.tokenHash) return null;
  const a = Buffer.from(p.tokenHash, 'hex');
  const b = Buffer.from(hashKey(key), 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b) ? p : null;
}

function bump(room, phaseChange = false) {
  room.rev += 1;
  room.updatedAt = Date.now();
  if (phaseChange) room.phaseVersion += 1;
}

const inCast = (room, pid) => room.cast.some((c) => c.playerId === pid);
/** Etkin seçmenler: kadro eksi geçici olarak çıkarılanlar. */
const voterIds = (room) => room.cast.map((c) => c.playerId).filter((id) => !(room.excluded || []).includes(id));
const allReady = (room) => voterIds(room).every((id) => room.readyPlayerIds.includes(id));
const allVoted = (room) => voterIds(room).every((id) => room.votesByPlayerId[id]);
const isHost = (room, pid) => room.hostId === pid;

// ---------- Bağlantı / ev sahibi devri ----------
export function setConnected(room, playerId, connected) {
  const p = room.players.find((x) => x.id === playerId);
  if (!p || p.isBot || p.connected === connected) return false;
  p.connected = connected;
  if (connected && room.excluded?.includes(playerId)) room.excluded = room.excluded.filter((x) => x !== playerId);
  if (!connected && room.hostId === playerId) transferHost(room);
  if (connected && !room.players.find((x) => x.id === room.hostId)?.connected) transferHost(room);
  bump(room);
  return true;
}

function transferHost(room) {
  const next = room.players.filter((p) => p.connected && !p.isBot).sort((a, b) => a.joinSeq - b.joinSeq)[0];
  if (next) room.hostId = next.id;
}

export function leaveLobby(room, playerId, targetId = playerId) {
  if (room.phase !== 'LOBBY') fail('Oyun sürerken odadan çıkılamaz; karakterin hikâyede kalır.');
  if (targetId !== playerId) {
    if (!isHost(room, playerId)) fail('Yalnız ev sahibi oyuncu çıkarabilir.');
    const t = room.players.find((p) => p.id === targetId);
    if (!t) fail('Oyuncu bulunamadı.');
    if (t.connected && !t.isBot) fail('Bağlı oyuncu çıkarılamaz.');
  }
  room.players = room.players.filter((p) => p.id !== targetId);
  if (room.hostId === targetId) transferHost(room);
  bump(room);
}

// ---------- Hikâye seçimi ----------
export function setStory(room, playerId, storyId) {
  if (!isHost(room, playerId)) fail('Hikâyeyi yalnız ev sahibi seçebilir.');
  if (room.phase !== 'LOBBY') fail('Oyun başladıktan sonra hikâye değiştirilemez.');
  if (!storyList().some((s) => s.id === storyId)) fail('Bilinmeyen hikâye.');
  if (room.storyId === storyId) return;
  room.storyId = storyId;
  bump(room);
}

// ---------- Oyun başlangıcı ----------
export function startGame(room, playerId, shuffle = cryptoShuffle) {
  if (!isHost(room, playerId)) fail('Oyunu yalnız ev sahibi başlatabilir.');
  if (room.phase !== 'LOBBY') fail('Oyun zaten başladı.');
  const n = room.players.length;
  if (n < MIN_PLAYERS) fail(`En az ${MIN_PLAYERS} oyuncu gerekli (şu an ${n}).`);
  if (n > MAX_PLAYERS) fail(`En fazla ${MAX_PLAYERS} oyuncu olabilir.`);
  const ids = shuffle(room.players.map((p) => p.id));
  room.cast = ids.map((id) => ({ playerId: id, displayName: room.players.find((p) => p.id === id).name }));
  room.decisionLog = [];
  room.pageHistory = [];
  if (isSurvival(room)) {
    sv(room).start(room, core);
    bump(room, true);
    return;
  }
  room.contentVersion = STORY.contentVersion;
  room.state = initialState();
  room.flagSetAt = {};
  room.decisionLog = [];
  room.pageHistory = [];
  enterNode(room, 'N01');
  bump(room, true);
}

export function cryptoShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setPage(room, desc) {
  if (room.page) room.pageHistory.push(room.page);
  room.pageSeq += 1;
  room.page = desc;
  room.currentPageId = `${room.gameId}.${room.pageSeq}`;
  room.readyPlayerIds = botIds(room);
}

function enterNode(room, nodeId) {
  room.currentNodeId = nodeId;
  room.nodeEntryState = { ...room.state };
  room.phase = 'READING';
  room.voteRound = 0;
  room.eligibleOptionIds = [];
  room.votesByPlayerId = {};
  room.roundHistory = [];
  room.lastTie = null;
  setPage(room, { kind: 'scene', nodeId, flagSetAt: { ...room.flagSetAt }, state: { ...room.state } });
}

function openVoting(room, eligible) {
  room.phase = 'VOTING';
  room.voteRound += 1;
  room.eligibleOptionIds = eligible;
  room.votesByPlayerId = {};
  for (const id of botIds(room)) room.votesByPlayerId[id] = eligible[crypto.randomInt(eligible.length)];
}

// ---------- Okudum ----------
export function markReady(room, playerId, { pageId, phaseVersion }) {
  if (isSurvival(room)) return sv(room).markReady(room, playerId, { pageId, phaseVersion }, core);
  if (!inCast(room, playerId)) fail('Bu oyunun kadrosunda değilsin.');
  if (room.paused) fail('Oyun duraklatıldı.');
  if (!['READING', 'RESULT', 'TIE_RESULT', 'ENDING'].includes(room.phase)) fail('Şu an okunacak sayfa yok.');
  if (phaseVersion !== room.phaseVersion || pageId !== room.currentPageId) fail('STALE');
  if (room.readyPlayerIds.includes(playerId)) return;
  room.readyPlayerIds.push(playerId);
  if (allReady(room)) advanceAfterRead(room);
  else bump(room);
}

function advanceAfterRead(room) {
  switch (room.phase) {
    case 'READING':
      openVoting(room, ['A', 'B', 'C', 'D']);
      room.readyPlayerIds = [];
      break;
    case 'TIE_RESULT':
      openVoting(room, room.lastTie.remaining);
      room.readyPlayerIds = [];
      break;
    case 'RESULT': {
      const last = room.decisionLog.at(-1);
      if (last.target.startsWith('N')) enterNode(room, last.target);
      else {
        room.endingId = last.target;
        room.phase = 'ENDING';
        setPage(room, { kind: 'ending', endingId: last.target });
      }
      break;
    }
    case 'ENDING':
      room.phase = 'FINISHED';
      room.readyPlayerIds = [];
      break;
  }
  bump(room, true);
}

// ---------- Oylama ----------
export function castVote(room, playerId, { nodeId, voteRound, optionId, phaseVersion }) {
  if (isSurvival(room)) return sv(room).castVote(room, playerId, { nodeId, voteRound, optionId, phaseVersion }, core);
  if (!inCast(room, playerId)) fail('Bu oyunun kadrosunda değilsin.');
  if (room.paused) fail('Oyun duraklatıldı.');
  if (room.phase !== 'VOTING' || phaseVersion !== room.phaseVersion || nodeId !== room.currentNodeId || voteRound !== room.voteRound) fail('STALE');
  if (!room.eligibleOptionIds.includes(optionId)) fail('Bu seçenek bu turda oylanmıyor.');
  const prev = room.votesByPlayerId[playerId];
  if (prev) {
    if (prev === optionId) return; // aynı oyun tekrarı
    fail('Oyun kilitlendi; bu turda değiştirilemez.');
  }
  room.votesByPlayerId[playerId] = optionId;
  if (allVoted(room)) closeRound(room);
  else bump(room);
}

export function tallyVotes(votes, eligible) {
  const tally = Object.fromEntries(eligible.map((o) => [o, 0]));
  for (const v of Object.values(votes)) tally[v] += 1;
  const max = Math.max(...Object.values(tally));
  const top = eligible.filter((o) => tally[o] === max);
  return { tally, top };
}

function closeRound(room) {
  const { tally, top } = tallyVotes(room.votesByPlayerId, room.eligibleOptionIds);
  room.roundHistory.push({ round: room.voteRound, eligible: [...room.eligibleOptionIds], tally });
  if (top.length > 1) {
    room.lastTie = { round: room.voteRound, tally, remaining: top };
    room.phase = 'TIE_RESULT';
    room.votesByPlayerId = {};
    setPage(room, { kind: 'tie', nodeId: room.currentNodeId, round: room.voteRound });
    bump(room, true);
    return;
  }
  resolveDecision(room, top[0]);
}

function resolveDecision(room, optionId) {
  const pre = { ...room.nodeEntryState };
  const { state, changed, target } = decide(room.currentNodeId, optionId, pre);
  const index = room.decisionLog.length;
  room.decisionLog.push({
    index,
    nodeId: room.currentNodeId,
    optionId,
    rounds: room.roundHistory.map((r) => ({ ...r })),
    finalVotes: { ...room.votesByPlayerId }, // yalnız sahibine gösterilir
    preState: pre,
    postState: state,
    target,
    at: Date.now(),
  });
  for (const f of changed) if (f !== 'stain' && state[f] === true) room.flagSetAt[f] = index;
  room.state = state;
  room.phase = 'RESULT';
  room.votesByPlayerId = {};
  setPage(room, { kind: 'result', nodeId: room.currentNodeId, decisionIndex: index });
  bump(room, true);
}

// ---------- Bağlantısı kopan oyuncuyu geçici olarak oylamadan çıkarma ----------
export function setExcluded(room, playerId, targetId, excluded) {
  if (!isHost(room, playerId)) fail('Yalnız ev sahibi oyuncuyu oylamadan çıkarabilir.');
  if (room.phase === 'LOBBY' || room.phase === 'FINISHED') fail('Şu an oylama yok.');
  if (!inCast(room, targetId)) fail('Oyuncu bulunamadı.');
  const t = room.players.find((p) => p.id === targetId);
  room.excluded ||= [];
  if (excluded) {
    if (t?.connected) fail('Bağlı oyuncu oylamadan çıkarılamaz.');
    if (room.excluded.includes(targetId)) return;
    room.excluded.push(targetId);
    delete room.votesByPlayerId[targetId]; // bu turdaki oyu iptal
  } else {
    room.excluded = room.excluded.filter((x) => x !== targetId);
  }
  if (!recheck(room)) bump(room);
}

/** Seçmen listesi değişince turun bitip bitmediğini yeniden değerlendirir. */
function recheck(room) {
  if (isSurvival(room)) return sv(room).recheck(room, core);
  if (['READING', 'RESULT', 'TIE_RESULT', 'ENDING'].includes(room.phase) && allReady(room)) { advanceAfterRead(room); return true; }
  if (room.phase === 'VOTING' && allVoted(room)) { closeRound(room); return true; }
  return false;
}

// ---------- Ev sahibi işlemleri ----------
export function setPaused(room, playerId, paused) {
  if (!isHost(room, playerId)) fail('Yalnız ev sahibi duraklatabilir.');
  if (room.phase === 'LOBBY' || room.phase === 'FINISHED') fail('Şu an duraklatılacak oyun yok.');
  if (room.paused === !!paused) return;
  room.paused = !!paused;
  bump(room);
}

export function returnToLobby(room, playerId) {
  if (!isHost(room, playerId)) fail('Yalnız ev sahibi lobiye döndürebilir.');
  if (room.phase === 'LOBBY') return;
  Object.assign(room, freshGameFields());
  bump(room, true);
}

// ---------- Görünüm ----------
export function renderPage(room, desc) {
  const cast = room.cast;
  if (desc.kind === 'scene') return renderScene(desc.nodeId, desc.state, desc.flagSetAt || {}, cast);
  if (desc.kind === 'result') {
    const d = room.decisionLog[desc.decisionIndex];
    const r = renderResult(d.nodeId, d.optionId, d.preState, d.postState, cast);
    const last = d.rounds.at(-1);
    return { ...r, tally: last.tally, rounds: d.rounds.length };
  }
  if (desc.kind === 'ending') return renderEnding(desc.endingId, cast);
  if (desc.kind === 'tie') {
    const t = room.lastTie;
    const node = NODES[desc.nodeId];
    return {
      kind: 'tie', nodeId: desc.nodeId, title: node.title, round: t.round, tally: t.tally,
      remaining: t.remaining.map((id) => ({ id, label: node.options.find((o) => o.id === id).label })),
    };
  }
  return null;
}

export function snapshot(room, playerId) {
  const me = room.players.find((p) => p.id === playerId);
  const castIds = room.cast.map((c) => c.playerId);
  const players = (room.phase === 'LOBBY' ? room.players.map((p) => p.id) : castIds).map((id) => {
    const p = room.players.find((x) => x.id === id);
    return {
      id,
      name: p ? p.name : '?',
      connected: !!p?.connected,
      isHost: room.hostId === id,
      isBot: !!p?.isBot,
      ready: room.readyPlayerIds.includes(id),
      voted: !!room.votesByPlayerId[id],
      excluded: (room.excluded || []).includes(id),
    };
  });
  const snap = {
    rev: room.rev,
    roomCode: room.roomCode,
    gameId: room.gameId,
    contentVersion: room.contentVersion,
    phase: room.phase,
    phaseVersion: room.phaseVersion,
    paused: room.paused,
    me: me ? { id: me.id, name: me.name, isHost: room.hostId === me.id, inCast: castIds.includes(me.id) } : null,
    players,
    limits: { min: MIN_PLAYERS, max: MAX_PLAYERS },
    pageId: room.currentPageId,
    page: null,
    readyCount: room.readyPlayerIds.length,
    castCount: room.cast.length - (room.excluded || []).length,
  };
  const story = storyById(room.storyId);
  snap.storyId = story.id;
  snap.storyTitle = story.title;
  snap.engine = story.engine;
  if (room.phase === 'LOBBY') { snap.intro = story.intro; snap.stories = storyList(); }
  if (room.phase !== 'LOBBY' && isSurvival(room)) return sv(room).decorate(snap, room, playerId);
  snap.page = room.page ? renderPage(room, room.page) : null;
  if (room.phase === 'VOTING') {
    const node = NODES[room.currentNodeId];
    snap.voting = {
      nodeId: node.id,
      question: node.question,
      round: room.voteRound,
      isRepeat: room.voteRound > 1,
      options: node.options.filter((o) => room.eligibleOptionIds.includes(o.id)).map((o) => ({ id: o.id, label: o.label })),
      votedCount: Object.keys(room.votesByPlayerId).length,
      myVote: room.votesByPlayerId[playerId] || null,
    };
  }
  if (room.phase === 'ENDING' || room.phase === 'FINISHED') {
    const e = ENDINGS[room.endingId];
    const last = room.decisionLog.at(-1);
    snap.ending = {
      endingId: e.id,
      title: e.title,
      classification: e.classification,
      paragraphs: renderEnding(e.id, room.cast).paragraphs,
      path: room.decisionLog.map((d) => ({
        title: NODES[d.nodeId].title,
        label: NODES[d.nodeId].options.find((o) => o.id === d.optionId).label,
        myVote: d.finalVotes[playerId] || null,
        winner: d.optionId,
        repeats: d.rounds.length - 1,
      })),
      notes: last.nodeId === 'N20' ? criticalNotes(last.postState) : [],
      fakeVoteNames: e.id === 'E20' ? room.cast.slice(0, 4).map((c) => c.displayName) : null,
    };
  }
  return snap;
}

/** "Gecenin notları": yalnız okunmuş geçmiş sayfalar. */
export function notes(room, playerId) {
  if (isSurvival(room)) return sv(room).notes(room, playerId);
  return room.pageHistory
    .filter((d) => d.kind === 'scene' || d.kind === 'result')
    .map((d) => {
      const r = renderPage(room, d);
      return { kind: r.kind, title: r.title, label: r.label || null, reminder: r.reminder || null, paragraphs: r.paragraphs, contribution: r.contribution || null };
    });
}

export function ackDeath(room, playerId, eventId) {
  if (!isSurvival(room)) fail('Bu hikâyede ölüm olayı yok.');
  sv(room).ackDeath(room, playerId, eventId, core);
}
export const takeLiveDeaths = (room) => (isSurvival(room) ? sv(room).takeLiveDeaths(room) : []);

// Hikâye sürücülerine verilen ortak yardımcılar
const core = {
  fail, bump, setPage: (room, desc) => setPage(room, desc), botIds, inCast, tallyVotes, newId, allReady, allVoted,
  randomInt: (n) => crypto.randomInt(n),
};

export { GameError };
