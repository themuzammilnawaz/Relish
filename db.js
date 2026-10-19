import fs from 'node:fs';
import path from 'node:path';
import { config } from './config.js';

const FILE = path.resolve(process.cwd(), config.dataFile);
const COLLECTIONS = ['menu', 'orders', 'reservations', 'reviews', 'messages', 'tables'];

let data = null;

function save() {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function init(seedFactory) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  if (fs.existsSync(FILE)) {
    try {
      data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    } catch {
      data = seedFactory();
    }
  } else {
    data = seedFactory();
    save();
    console.log('[db] seeded fresh database at', FILE);
  }
  for (const c of COLLECTIONS) if (!Array.isArray(data[c])) data[c] = [];
}

export function all(c, filter) {
  const rows = data[c] || [];
  return filter ? rows.filter(filter) : rows.slice();
}

export function find(c, id) {
  return (data[c] || []).find(r => Number(r.id) === Number(id)) || null;
}

export function insert(c, doc) {
  const rows = data[c];
  const nextId = rows.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0) + 1;
  const row = { ...doc, id: nextId, createdAt: doc.createdAt || new Date().toISOString() };
  rows.push(row);
  save();
  return row;
}

export function update(c, id, patch) {
  const rows = data[c] || [];
  const i = rows.findIndex(r => Number(r.id) === Number(id));
  if (i === -1) return null;
  rows[i] = { ...rows[i], ...patch, id: rows[i].id };
  save();
  return rows[i];
}

export function remove(c, id) {
  const rows = data[c] || [];
  const i = rows.findIndex(r => Number(r.id) === Number(id));
  if (i === -1) return false;
  rows.splice(i, 1);
  save();
  return true;
}

export function resetWith(seedData) {
  data = structuredClone(seedData);
  save();
}
