import { DB } from '@cloudflare/d1';
import fs from 'node:fs/promises';
import path from 'node:path';

export default {
  async fetch(request, env, ctx) {
    const db = env.DB;
    const jsonDir = './backend/data/jsons';

    const files = await fs.readdir(jsonDir);
    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const content = await fs.readFile(path.join(jsonDir, file), 'utf-8');
      const items = JSON.parse(content);

      for (const category of items) {
        const categoryName = category.category;
        for (const item of category.items || []) {
          const name = item.name;
          const url = item.url;
          const meta = JSON.stringify(item.meta);
          await db
            .prepare("INSERT INTO items (name, url, category, meta) VALUES (?, ?, ?, ?)")
            .bind(name, url, categoryName, meta)
            .run();
        }
      }
    }

    return new Response("✅ Data import complete!", { status: 200 });
  },
};
