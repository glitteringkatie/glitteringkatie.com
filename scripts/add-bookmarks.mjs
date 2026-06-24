#!/usr/bin/env node
/**
 * Scans public/bookmarks/images/bookmarks/ for new <id>_front.png / <id>_back.png
 * files and appends skeleton entries to public/bookmarks/js/data.js.
 *
 * Run: node scripts/add-bookmarks.mjs
 *
 * Fields you'll still want to fill in manually: city, visitDate, address, notes, accentColor
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES_DIR = join(ROOT, 'public/bookmarks/images/bookmarks');
const DATA_JS = join(ROOT, 'public/bookmarks/js/data.js');
const IMAGE_PREFIX = 'images/bookmarks';

function toStoreName(id) {
  return id
    .split('-')
    .map(word => {
      // "apple2" → "Apple 2"
      const m = word.match(/^([a-z]*)(\d+)$/);
      if (m) return (m[1] ? capitalize(m[1]) + ' ' : '') + m[2];
      return capitalize(word);
    })
    .join(' ')
    .trim();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Parse existing IDs so we never double-add
const dataContent = readFileSync(DATA_JS, 'utf-8');
const existingIds = new Set(
  [...dataContent.matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1])
);

// Group files by id
const byId = {};
for (const file of readdirSync(IMAGES_DIR)) {
  const front = file.match(/^(.+)_front\.(png|jpe?g)$/i);
  const back  = file.match(/^(.+)_back\.(png|jpe?g)$/i);
  if (front) {
    const id = front[1];
    byId[id] = byId[id] || {};
    byId[id].front = `${IMAGE_PREFIX}/${file}`;
  } else if (back) {
    const id = back[1];
    byId[id] = byId[id] || {};
    byId[id].back = `${IMAGE_PREFIX}/${file}`;
  }
}

const newIds = Object.keys(byId).filter(id => !existingIds.has(id)).sort();

if (newIds.length === 0) {
  console.log('Nothing new to add — data.js is already up to date.');
  process.exit(0);
}

const newEntries = newIds.map(id => {
  const { front, back } = byId[id];
  return `  {
    id: "${id}",
    storeName: "${toStoreName(id)}",
    city: "",
    visitDate: "",
    frontImage: "${front}",
    backImage: ${back ? `"${back}"` : 'null'},
    coords: null,
    link: "",
    notes: "",
    accentColor: "#2c2c2c",
  }`;
});

// Insert before the final ];
const insertAt = dataContent.lastIndexOf('];');
const before = dataContent.slice(0, insertAt).trimEnd();
const after = dataContent.slice(insertAt);
const separator = before.endsWith(',') ? '\n' : ',\n';
const updated = before + separator + newEntries.join(',\n') + ',\n' + after;

writeFileSync(DATA_JS, updated, 'utf-8');

console.log(`Added ${newIds.length} bookmark(s):`);
newIds.forEach(id => {
  const hasBack = Boolean(byId[id].back);
  console.log(`  ${id} → "${toStoreName(id)}"${hasBack ? ' (front + back)' : ' (front only)'}`);
});
console.log('\nFill in city, visitDate, address, notes, and accentColor in data.js.');
