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

function check(label, value, warn = false) {
  const icon = value ? '✅' : (warn ? '⚠️' : '❌');
  const status = value || 'NOT FOUND';
  console.log(`  ${icon} ${label}: ${typeof status === 'string' ? status.substring(0, 120) : status}`);
  return !!value;
}

async function run() {
  let totalTests = 0;
  let passedTests = 0;

  for (const route of routes) {
    const { statusCode, data } = await fetchRoute(route);
    const decodedRoute = decodeURI(route);
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Route: ${decodedRoute} (Status: ${statusCode})`);
    console.log('='.repeat(60));

    if (route === '/unknown-page-404') {
      // 404 test: should return 200 with SPA fallback but contain "404" content
      const has404Content = data.includes('404') || data.includes('غير موجودة');
      totalTests++;
      if (has404Content) {
        passedTests++;
        console.log('  ✅ 404 page contains expected content');
      } else {
        console.log('  ⚠️ 404 page may not show proper error content');
      }
      continue;
    }

    // Basic SEO checks
    const title = data.match(/<title[^>]*>(.*?)<\/title>/)?.[1];
    const metaDesc = data.match(/<meta name="description" content="(.*?)"/)?.[1];
    const canonical = data.match(/<link rel="canonical" href="(.*?)"/)?.[1] || data.match(/<link[^>]*rel="canonical"[^>]*href="(.*?)"/)?.[1];
    const h1Match = data.match(/<h1[^>]*>(.*?)<\/h1>/s);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : null;

    // Structured data
    const hasJsonLd = data.includes('application/ld+json');
    const jsonLdMatch = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    let jsonLdValid = false;
    let hasBusinessSchema = false;
    let hasWebPageSchema = false;
    let hasServiceSchema = false;
    let hasFaqSchema = false;

    if (jsonLdMatch) {
      try {
        const schema = JSON.parse(jsonLdMatch[1]);
        jsonLdValid = true;
        const graph = schema['@graph'] || [schema];
        hasBusinessSchema = graph.some(e => e['@type'] === 'HomeAndConstructionBusiness');
        hasWebPageSchema = graph.some(e => e['@type'] === 'WebPage');
        hasServiceSchema = graph.some(e => e['@type'] === 'Service');
        hasFaqSchema = graph.some(e => e['@type'] === 'FAQPage');
      } catch (e) {
        jsonLdValid = false;
      }
    }

    // Open Graph
    const ogTitle = data.match(/<meta property="og:title" content="(.*?)"/)?.[1];
    const ogDesc = data.match(/<meta property="og:description" content="(.*?)"/)?.[1];
    const ogImage = data.match(/<meta property="og:image" content="(.*?)"/)?.[1];
    const ogType = data.match(/<meta property="og:type" content="(.*?)"/)?.[1];
    const ogLocale = data.match(/<meta property="og:locale" content="(.*?)"/)?.[1];
    
    // Twitter
    const twitterCard = data.match(/<meta name="twitter:card" content="(.*?)"/)?.[1];

    // FAQ in DOM
    const hasFaqContent = data.includes('faq-answer-') || data.includes('الأسئلة الشائعة');
    
    // Content checks
    const hasRealContent = data.length > 2000;
    const isNotNoindex = !data.includes('noindex');

    // Run checks
    const tests = [
      check('Title', title),
      check('Meta Description', metaDesc),
      check('Canonical', canonical),
      check('H1', h1),
      check('JSON-LD present', hasJsonLd ? 'Yes' : null),
      check('JSON-LD valid', jsonLdValid ? 'Yes' : null),
      check('Business schema', hasBusinessSchema ? 'Yes' : null),
      check('WebPage schema', hasWebPageSchema ? 'Yes' : null, true),
      check('OG Title', ogTitle),
      check('OG Description', ogDesc),
      check('OG Image', ogImage),
      check('OG Type', ogType),
      check('OG Locale', ogLocale),
      check('Twitter Card', twitterCard),
      check('Not noindex', isNotNoindex ? 'Yes' : null),
      check('Has real content', hasRealContent ? 'Yes' : null),
      check('FAQ content in DOM', hasFaqContent ? 'Yes' : null),
    ];

    if (route !== '/') {
      tests.push(check('Service schema', hasServiceSchema ? 'Yes' : null, true));
      tests.push(check('FAQ schema', hasFaqSchema ? 'Yes' : null, true));
    }

    totalTests += tests.length;
    passedTests += tests.filter(Boolean).length;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`RESULTS: ${passedTests}/${totalTests} tests passed`);
  console.log('='.repeat(60));
}

run();
