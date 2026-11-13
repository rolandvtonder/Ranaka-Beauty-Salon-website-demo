/**
 * After `vite build`, renders every page to static HTML so search engines and
 * link previews see the full content without running JavaScript.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const {render} = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);

for (const [key, dir] of [['home', ''], ['services', 'services'], ['gallery', 'gallery'], ['about', 'about'], ['contact', 'contact']]) {
  const file = path.join(root, 'dist', dir, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('<!--app-->')) throw new Error(`No <!--app--> slot in ${file}`);
  fs.writeFileSync(file, html.replace('<!--app-->', render(key)));
  console.log(`prerendered /${dir}`);
}
fs.rmSync(path.join(root, 'dist-server'), {recursive: true, force: true});
