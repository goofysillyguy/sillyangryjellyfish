import fs from 'fs/promises';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await open({
  filename: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/rust_items_db.sqlite',
  driver: sqlite3.Database
});

const jsonDir = path.join('backend', 'data', 'jsons');

const files = await fs.readdir(jsonDir);

for (const file of files) {
  const tableName = path.basename(file, '.json');
  const filePath = path.join(jsonDir, file);
  const content = await fs.readFile(filePath, 'utf8');

  let data;
  try {
    data = JSON.parse(content);
  } catch (err) {
    console.error(`❌ Failed to parse ${file}:`, err.message);
    continue;
  }

  if (!Array.isArray(data)) {
    console.warn(`⚠️ Skipping ${file}: expected an array of objects`);
    continue;
  }

  console.log(`📥 Importing ${file} (${data.length} entries) → table '${tableName}'`);

  for (const entry of data) {
    const keys = Object.keys(entry);
    const values = Object.values(entry);

    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

    try {
      await db.run(sql, values);
    } catch (err) {
      console.error(`❌ Failed to insert into ${tableName}:`, err.message);
    }
  }
}

console.log('✅ Import complete.');
