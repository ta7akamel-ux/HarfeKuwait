const http = require('http');

const routes = [
  '/',
  '/%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D9%85%D8%B7%D8%A7%D8%A8%D8%AE-%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%88%D9%85/',
  '/%D8%AA%D8%B5%D9%84%D9%8A%D8%AD-%D9%85%D8%B7%D8%A7%D8%A8%D8%AE-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA/',
  '/%D9%81%D9%83-%D9%88%D8%AA%D8%B1%D9%83%D9%8A%D8%A8-%D9%85%D8%B7%D8%A7%D8%A8%D8%AE/',
  '/%D8%AA%D8%B5%D9%84%D9%8A%D8%AD-%D9%83%D8%A8%D8%AA%D8%A7%D8%AA-%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%A8%D8%AE/',
  '/unknown-page-404'
];

async function fetchRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    });
  });
}

async function run() {
  for (const route of routes) {
    const { statusCode, data } = await fetchRoute(route);
    console.log(`\nRoute: ${decodeURI(route)} (Status: ${statusCode})`);
    if (statusCode === 200) {
      const title = data.match(/<title>(.*?)<\/title>/)?.[1] || 'NOT FOUND';
      const metaDesc = data.match(/<meta name="description" content="(.*?)"/)?.[1] || 'NOT FOUND';
      const canonical = data.match(/<link rel="canonical" href="(.*?)"/)?.[1] || 'NOT FOUND';
      const h1Match = data.match(/<h1[^>]*>(.*?)<\/h1>/);
      const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '') : 'NOT FOUND'; // strip inner span if any
      
      console.log(`Title: ${title}`);
      console.log(`Meta Desc: ${metaDesc}`);
      console.log(`Canonical: ${canonical}`);
      console.log(`H1: ${h1}`);
    } else {
      console.log(`Returned expected non-200 status: ${statusCode}`);
    }
  }
}

run();
