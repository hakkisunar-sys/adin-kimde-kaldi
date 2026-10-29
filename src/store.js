// Kalıcı kayıt: SQLite (Node'un yerleşik node:sqlite modülü). Tek süreçli kurulum için.
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export class Store {
  constructor(file) {
    if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true });
    this.db = new DatabaseSync(file);
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      CREATE TABLE IF NOT EXISTS rooms (
        code TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );`);
    this.upsert = this.db.prepare('INSERT INTO rooms (code, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(code) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at');
    this.del = this.db.prepare('DELETE FROM rooms WHERE code = ?');
  }
  save(room) {
    this.upsert.run(room.roomCode, JSON.stringify(room), room.updatedAt);
  }
  remove(code) {
    this.del.run(code);
  }
  loadAll(maxAgeMs) {
    const since = Date.now() - maxAgeMs;
    this.db.prepare('DELETE FROM rooms WHERE updated_at < ?').run(since);
    return this.db.prepare('SELECT data FROM rooms').all().map((r) => JSON.parse(r.data));
  }
  close() { this.db.close(); }
}
