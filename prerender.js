import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

const routesToPrerender = [
  '/',
  '/صيانة-مطابخ-المنيوم/',
  '/تصليح-مطابخ-الكويت/',
  '/فك-وتركيب-مطابخ/',
  '/تصليح-كبتات-المطابخ/'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const url of routesToPrerender) {
  const helmetContext = {};
  const appHtml = render(url, helmetContext);
  
  // Extract helmet data if available
  const { helmet } = helmetContext;
  let appHead = '';
  
  if (helmet) {
    appHead = [
      helmet.title?.toString() || '',
      helmet.meta?.toString() || '',
      helmet.link?.toString() || '',
      helmet.script?.toString() || ''
    ].join('\n    ');
  }

  const html = template
    .replace('<!--app-html-->', appHtml)
    .replace('<!--app-head-->', appHead);

  const filePath = `dist/static${url === '/' ? '/index.html' : `${url}index.html`}`;
  const resolvedPath = toAbsolute(filePath);
  
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, html);
  console.log('Pre-rendered:', filePath);

  const fullUrl = `https://harfekuwait.com${url}`;
  sitemap += `  <url>\n    <loc>${encodeURI(fullUrl)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
}

sitemap += `</urlset>`;
fs.writeFileSync(toAbsolute('dist/static/sitemap.xml'), sitemap);
console.log('Generated sitemap.xml (single source of truth)');

const robots = `User-agent: *
Allow: /

Sitemap: https://harfekuwait.com/sitemap.xml
`;
fs.writeFileSync(toAbsolute('dist/static/robots.txt'), robots);
console.log('Generated robots.txt');

// Move everything from dist/static to dist
fs.cpSync(toAbsolute('dist/static'), toAbsolute('dist'), { recursive: true });
console.log('Moved prerendered files to dist/');
console.log('');
console.log('=== Prerender Summary ===');
console.log(`Routes prerendered: ${routesToPrerender.length}`);
console.log('Sitemap: dist/static/sitemap.xml (canonical URLs only)');
console.log('robots.txt: dist/static/robots.txt');
