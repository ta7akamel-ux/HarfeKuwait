import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

import { seoData } from './src/seoData.js';

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
  
  const seo = seoData[url] || { title: 'حرفي الكويت للألومنيوم', description: '' };
  const fullUrl = `https://harfekuwait.com${url}`;
  
  const appHead = `
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}">
    <link rel="canonical" href="${encodeURI(fullUrl)}">
    <meta property="og:title" content="${seo.title}">
    <meta property="og:description" content="${seo.description}">
    <meta property="og:url" content="${encodeURI(fullUrl)}">
  `;

  const html = template
    .replace('<!--app-html-->', appHtml)
    .replace('<!--app-head-->', appHead);

  const filePath = `dist/static${url === '/' ? '/index.html' : `${url}index.html`}`;
  const resolvedPath = toAbsolute(filePath);
  
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, html);
  console.log('Pre-rendered:', filePath);

  sitemap += `  <url>\n    <loc>${encodeURI(fullUrl)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
}

sitemap += `</urlset>`;
fs.writeFileSync(toAbsolute('dist/static/sitemap.xml'), sitemap);
console.log('Generated sitemap.xml');

const robots = `User-agent: *
Allow: /

Sitemap: https://harfekuwait.com/sitemap.xml
`;
fs.writeFileSync(toAbsolute('dist/static/robots.txt'), robots);
console.log('Generated robots.txt');

// Move everything from dist/static to dist, and clean up dist/server
fs.cpSync(toAbsolute('dist/static'), toAbsolute('dist'), { recursive: true });
//fs.rmSync(toAbsolute('dist/static'), { recursive: true, force: true });
//fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });
console.log('Moved prerendered files to dist/');

