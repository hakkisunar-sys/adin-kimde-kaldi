// SON SEFER — oda akışı: okuma, eylem/görevli/yardımcı oylaması, ölüm olayları, ölü sayfaları.
// Saf motor (engine.js) burada sunucu odasına bağlanır. room.js'teki ortak yardımcılar `core` ile gelir.
import {
  STORY, NODES, ENDINGS, initialState, resolve, livingIds, deadIds, focusId, fill, paras, taskNeed,
  briefFor, ghostPageFor, DEATH_CARD, FATIGUE_LABELS, equipmentOf, clone,
} from './engine.js';

const nameOf = (room, pid) => room.cast.find((c) => c.playerId === pid)?.displayName ?? '?';
const isBot = (room, pid) => !!room.players.find((p) => p.id === pid)?.isBot;

export function start(room, core) {
  room.contentVersion = STORY.contentVersion;
  room.ss = {
    state: initialState(room.cast),
    entry: null,
    focus: null,
    voteKind: null,
    optionId: null,
    actors: [],
    kindRounds: 0,
    rounds: [],
    myVotes: {}, // {pid: {ACTION, PRIMARY, HELPER}} son turdaki oylar; yalnız sahibine
    ghostSeen: {},
    deathEvents: [],
  };
  enterNode(room, 'S2_N01', core);
}

function enterNode(room, nodeId, core) {
  const ss = room.ss;
  room.currentNodeId = nodeId;
  ss.entry = clone(ss.state);
  ss.focus = focusId(nodeId, ss.entry, room.cast);
  ss.optionId = null;
  ss.actors = [];
  ss.voteKind = null;
  ss.rounds = [];
  ss.myVotes = {};
  room.phase = 'READING';
  room.voteRound = 0;
  room.eligibleOptionIds = [];
  room.votesByPlayerId = {};
  room.lastTie = null;
  // ölü oyunculara bu aralığın sayfası (aralık başına bir kez)
  const ghost = {};
  const g = ghostPageFor(nodeId);
  if (g) {
    for (const pid of deadIds(ss.entry, room.cast)) {
      const seen = (ss.ghostSeen[pid] ||= []);
      if (!seen.includes(g.index)) { seen.push(g.index); ghost[pid] = g.index; }
    }
  }
  core.setPage(room, { kind: 'scene', nodeId, entry: clone(ss.entry), focus: ss.focus, ghost });
}

function openVote(room, kind, eligible, core, fresh) {
  const ss = room.ss;
  room.phase = 'VOTING';
  room.voteRound += 1;
  if (fresh) { ss.voteKind = kind; ss.kindRounds = 0; }
  ss.kindRounds += 1;
  room.eligibleOptionIds = eligible;
  room.votesByPlayerId = {};
  for (const id of core.botIds(room)) room.votesByPlayerId[id] = eligible[core.randomInt(eligible.length)];
}

// ---------- Okudum ----------
export function markReady(room, pid, { pageId, phaseVersion }, core) {
  if (!core.inCast(room, pid)) core.fail('Bu oyunun kadrosunda değilsin.');
  if (room.paused) core.fail('Oyun duraklatıldı.');
  if (!['READING', 'RESULT', 'TIE_RESULT', 'ENDING'].includes(room.phase)) core.fail('Şu an okunacak sayfa yok.');
  if (phaseVersion !== room.phaseVersion || pageId !== room.currentPageId) core.fail('STALE');
  if (room.readyPlayerIds.includes(pid)) return;
  room.readyPlayerIds.push(pid);
  if (room.cast.every((c) => room.readyPlayerIds.includes(c.playerId))) advance(room, core);
  else core.bump(room);
}

function advance(room, core) {
  const ss = room.ss;
  switch (room.phase) {
    case 'READING':
      openVote(room, 'ACTION', ['A', 'B', 'C', 'D'], core, true);
      room.readyPlayerIds = [];
      break;
    case 'TIE_RESULT':
      openVote(room, ss.voteKind, room.lastTie.remaining, core, false);
      room.readyPlayerIds = [];
      break;
    case 'RESULT': {
      const last = room.decisionLog.at(-1);
      if (last.target.startsWith('S2_N')) enterNode(room, last.target, core);
      else {
        room.endingId = last.target;
        room.phase = 'ENDING';
        core.setPage(room, { kind: 'ending', endingId: last.target });
      }
      break;
    }
    case 'ENDING':
      room.phase = 'FINISHED';
      room.readyPlayerIds = [];
      break;
  }
  core.bump(room, true);
}

// ---------- Oylama ----------
export function castVote(room, pid, { nodeId, voteRound, optionId, phaseVersion }, core) {
  if (!core.inCast(room, pid)) core.fail('Bu oyunun kadrosunda değilsin.');
  if (room.paused) core.fail('Oyun duraklatıldı.');
  if (room.phase !== 'VOTING' || phaseVersion !== room.phaseVersion || nodeId !== room.currentNodeId || voteRound !== room.voteRound) core.fail('STALE');
  if (!room.eligibleOptionIds.includes(optionId)) core.fail('Bu seçenek bu turda oylanmıyor.');
  const prev = room.votesByPlayerId[pid];
  if (prev) {
    if (prev === optionId) return;
    core.fail('Oyun kilitlendi; bu turda değiştirilemez.');
  }
  room.votesByPlayerId[pid] = optionId;
  if (room.cast.every((c) => room.votesByPlayerId[c.playerId])) closeRound(room, core);
  else core.bump(room);
}

function closeRound(room, core) {
  const ss = room.ss;
  const { tally, top } = core.tallyVotes(room.votesByPlayerId, room.eligibleOptionIds);
  ss.rounds.push({ kind: ss.voteKind, round: ss.kindRounds, eligible: [...room.eligibleOptionIds], tally });
  if (top.length > 1) {
    room.lastTie = { kind: ss.voteKind, round: ss.kindRounds, tally, remaining: top };
    room.phase = 'TIE_RESULT';
    room.votesByPlayerId = {};
    core.setPage(room, { kind: 'tie', nodeId: room.currentNodeId, voteKind: ss.voteKind, round: ss.kindRounds, tally, remaining: top });
    core.bump(room, true);
    return;
  }
  const winner = top[0];
  for (const c of room.cast) (ss.myVotes[c.playerId] ||= {})[ss.voteKind] = room.votesByPlayerId[c.playerId];
  room.votesByPlayerId = {};
  const node = NODES[room.currentNodeId];
  const living = livingIds(ss.entry, room.cast);
  if (ss.voteKind === 'ACTION') {
    ss.optionId = winner;
    const need = taskNeed(node.options.find((o) => o.id === winner), living.length);
    if (need === 0) return finish(room, core);
    if (living.length === 1) { ss.actors = [living[0]]; return finish(room, core); }
    openVote(room, 'PRIMARY', living, core, true);
    return core.bump(room, true);
  }
  if (ss.voteKind === 'PRIMARY') {
    ss.actors = [winner];
    const need = taskNeed(node.options.find((o) => o.id === ss.optionId), living.length);
    if (need < 2) return finish(room, core);
    const rest = living.filter((p) => p !== winner);
    if (rest.length === 1) { ss.actors.push(rest[0]); return finish(room, core); }
    openVote(room, 'HELPER', rest, core, true);
    return core.bump(room, true);
  }
  ss.actors.push(winner);
  finish(room, core);
}

function finish(room, core) {
  const ss = room.ss;
  const nodeId = room.currentNodeId;
  const r = resolve(nodeId, ss.optionId, ss.entry, ss.actors, room.cast);
  const index = room.decisionLog.length;
  const ghostAtDeath = {};
  const g = ghostPageFor(nodeId);
  for (const d of r.deaths) {
    ss.deathEvents.push({
      id: core.newId(), playerId: d.playerId, nodeId, decisionIndex: index, key: d.key,
      status: isBot(room, d.playerId) ? 'skipped' : 'pending', liveSent: isBot(room, d.playerId),
    });
    if (g) {
      const seen = (ss.ghostSeen[d.playerId] ||= []);
      if (!seen.includes(g.index)) { seen.push(g.index); ghostAtDeath[d.playerId] = g.index; }
    }
  }
  room.decisionLog.push({
    index, nodeId, optionId: ss.optionId, actors: [...ss.actors], focus: ss.focus, caseIndex: r.caseIndex,
    preState: clone(ss.entry), postState: r.state, deaths: r.deaths, target: r.target, terminal: r.terminal,
    rounds: ss.rounds.map((x) => ({ ...x })), myVotes: clone(ss.myVotes), ghostAtDeath, at: Date.now(),
  });
  ss.state = r.state;
  room.phase = 'RESULT';
  room.votesByPlayerId = {};
  core.setPage(room, { kind: 'result', decisionIndex: index });
  core.bump(room, true);
}

export function ackDeath(room, pid, eventId, core) {
  const e = room.ss?.deathEvents.find((x) => x.id === eventId && x.playerId === pid);
  if (!e) core.fail('Olay bulunamadı.');
  if (e.status === 'pending' || e.status === 'delivered') { e.status = 'acknowledged'; core.bump(room); }
}

/** Sunucunun yalnız ölenin bağlantısına canlı göndermesi gereken olaylar. */
export function takeLiveDeaths(room) {
  const out = (room.ss?.deathEvents || []).filter((e) => !e.liveSent);
  for (const e of out) e.liveSent = true;
  return out;
}

// ---------- Görünüm ----------
const ghostOut = (i) => (i == null ? null : { title: STORY.ghostPages[i].title, paragraphs: paras(STORY.ghostPages[i].text) });

function aliveLists(room, state) {
  return {
    alive: livingIds(state, room.cast).map((p) => nameOf(room, p)),
    dead: deadIds(state, room.cast).map((p) => nameOf(room, p)),
  };
}

export function renderPage(room, desc, pid) {
  const cast = room.cast;
  if (desc.kind === 'scene') {
    const n = NODES[desc.nodeId];
    return {
      kind: 'scene', nodeId: n.id, title: n.title,
      paragraphs: paras(fill(n.text, { cast, state: desc.entry, focus: desc.focus, arrivalState: desc.entry })),
      focusName: cast.length > 4 && desc.focus ? nameOf(room, desc.focus) : null,
      viewerDead: desc.entry.alive[pid] === false,
      ghost: ghostOut(desc.ghost?.[pid]),
      equipment: equipmentOf(desc.entry),
      ...aliveLists(room, desc.entry),
    };
  }
  if (desc.kind === 'tie') {
    const n = NODES[desc.nodeId];
    const label = (id) => (desc.voteKind === 'ACTION' ? n.options.find((o) => o.id === id).label : nameOf(room, id));
    return {
      kind: 'tie', nodeId: n.id, title: n.title, voteKind: desc.voteKind, round: desc.round,
      tally: Object.entries(desc.tally).map(([id, c]) => ({ id, label: label(id), count: c, short: desc.voteKind === 'ACTION' ? id : label(id) })),
      remaining: desc.remaining.map((id) => ({ id: desc.voteKind === 'ACTION' ? id : '•', label: label(id) })),
    };
  }
  if (desc.kind === 'result') {
    const d = room.decisionLog[desc.decisionIndex];
    const n = NODES[d.nodeId];
    const opt = n.options.find((o) => o.id === d.optionId);
    const c = opt.cases[d.caseIndex];
    const actionRound = [...d.rounds].reverse().find((r) => r.kind === 'ACTION');
    const out = {
      kind: 'result', nodeId: n.id, title: n.title, optionId: d.optionId, label: opt.label,
      actors: d.actors.map((p) => nameOf(room, p)),
      paragraphs: paras(fill(c.text, { cast, state: d.postState, focus: d.focus, actors: d.actors })),
      tally: actionRound.tally,
      rounds: d.rounds.filter((r) => r.kind === 'ACTION').length,
      deathsNow: d.deaths.map((x) => nameOf(room, x.playerId)),
      viewerDead: d.postState.alive[pid] === false,
      ...aliveLists(room, d.postState),
    };
    const ev = room.ss.deathEvents.find((e) => e.decisionIndex === d.index && e.playerId === pid);
    if (ev) {
      out.personal = { eventId: ev.id, key: ev.key, status: ev.status, card: DEATH_CARD, ghost: ghostOut(d.ghostAtDeath[pid]) };
    }
    return out;
  }
  if (desc.kind === 'ending') return renderEnding(room, desc.endingId);
  return null;
}

function renderEnding(room, endingId) {
  const e = ENDINGS[endingId];
  const s = room.ss.state;
  return {
    kind: 'ending', endingId, title: e.title, classification: e.class,
    paragraphs: paras(fill(e.text, { cast: room.cast, state: s })),
    ...aliveLists(room, s),
  };
}

export function decorate(snap, room, pid) {
  const ss = room.ss;
  if (!ss) return snap;
  const s = room.phase === 'VOTING' ? ss.entry : ss.state;
  snap.survival = {
    me: { alive: s.alive[pid] !== false, fatigue: s.fatigue[pid] ?? 0 },
    players: Object.fromEntries(room.cast.map((c) => [c.playerId, { alive: s.alive[c.playerId], fatigue: s.fatigue[c.playerId], fatigueLabel: FATIGUE_LABELS[s.fatigue[c.playerId]] }])),
  };
  const myDeath = ss.deathEvents.find((e) => e.playerId === pid);
  if (myDeath) snap.survival.myDeath = { eventId: myDeath.id, key: myDeath.key, status: myDeath.status, nodeTitle: NODES[myDeath.nodeId].title };
  snap.page = room.page ? renderPage(room, room.page, pid) : null;
  if (room.phase === 'VOTING') {
    const node = NODES[room.currentNodeId];
    const living = livingIds(ss.entry, room.cast);
    const v = {
      nodeId: node.id, kind: ss.voteKind, round: room.voteRound, kindRound: ss.kindRounds, isRepeat: ss.kindRounds > 1,
      votedCount: Object.keys(room.votesByPlayerId).length, myVote: room.votesByPlayerId[pid] || null,
      ghosts: deadIds(ss.entry, room.cast).map((p) => nameOf(room, p)),
      equipment: equipmentOf(ss.entry),
    };
    if (ss.voteKind === 'ACTION') {
      v.question = node.question;
      v.options = node.options.filter((o) => room.eligibleOptionIds.includes(o.id)).map((o) => ({
        id: o.id, label: o.label, need: taskNeed(o, living.length), brief: briefFor(o, living.length),
      }));
    } else {
      const opt = node.options.find((o) => o.id === ss.optionId);
      const need = taskNeed(opt, living.length);
      v.action = { id: opt.id, label: opt.label, brief: briefFor(opt, living.length), need };
      v.question = ss.voteKind === 'PRIMARY' ? (need === 2 ? 'Birinci görevli kim olsun?' : 'Bu işi kim yapacak?') : 'İkinci görevli kim olsun?';
      if (ss.voteKind === 'HELPER') v.primaryName = nameOf(room, ss.actors[0]);
      v.options = room.eligibleOptionIds.map((p) => ({
        id: p, label: nameOf(room, p), fatigue: ss.entry.fatigue[p], fatigueLabel: FATIGUE_LABELS[ss.entry.fatigue[p]], isMe: p === pid,
      }));
    }
    snap.voting = v;
  }
  if (room.phase === 'ENDING' || room.phase === 'FINISHED') {
    const end = renderEnding(room, room.endingId);
    snap.ending = {
      ...end,
      losses: room.decisionLog.flatMap((d) => d.deaths.map((x) => ({ name: nameOf(room, x.playerId), where: NODES[d.nodeId].title, label: NODES[d.nodeId].options.find((o) => o.id === d.optionId).label }))),
      path: room.decisionLog.map((d) => ({
        title: NODES[d.nodeId].title,
        label: NODES[d.nodeId].options.find((o) => o.id === d.optionId).label,
        winner: d.optionId,
        actors: d.actors.map((p) => nameOf(room, p)),
        deaths: d.deaths.map((x) => nameOf(room, x.playerId)),
        myVote: d.myVotes[pid]?.ACTION || null,
        repeats: d.rounds.filter((r) => r.kind === 'ACTION').length - 1,
      })),
      notes: [],
      fakeVoteNames: null,
    };
  }
  return snap;
}

export function notes(room, pid) {
  return room.pageHistory
    .filter((d) => d.kind === 'scene' || d.kind === 'result')
    .map((d) => {
      const r = renderPage(room, d, pid);
      const extra = [];
      if (r.ghost) extra.push(r.ghost.title + ': ' + r.ghost.paragraphs.join(' '));
      if (r.personal?.ghost) extra.push(r.personal.ghost.title + ': ' + r.personal.ghost.paragraphs.join(' '));
      return {
        kind: r.kind, title: r.title, label: r.label || null,
        reminder: r.kind === 'result' && r.actors.length ? 'Görevli: ' + r.actors.join(', ') : null,
        paragraphs: r.paragraphs,
        contribution: [r.kind === 'result' && r.deathsNow.length ? 'Kaybedilen: ' + r.deathsNow.join(', ') : null, ...extra].filter(Boolean).join('\n\n') || null,
      };
    });
}
