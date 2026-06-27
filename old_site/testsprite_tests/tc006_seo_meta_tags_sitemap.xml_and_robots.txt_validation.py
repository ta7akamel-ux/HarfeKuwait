import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Access the sitemap.xml file by navigating to http://localhost:5173/sitemap.xml to verify its presence and content.
        await page.goto('http://localhost:5173/sitemap.xml', timeout=10000)
        

        # Access the robots.txt file at http://localhost:5173/robots.txt to verify its presence and validate its directives.
        await page.goto('http://localhost:5173/robots.txt', timeout=10000)
        

        # Return to the home page to inspect favicon link tags and manifest for favicon and PWA integration checks.
        await page.goto('http://localhost:5173/', timeout=10000)
        

        # Manually check for favicon files at expected paths /assets/favicon-32x32.png, /assets/favicon-16x16.png, and /favicon.ico by requesting these URLs to verify their presence and HTTP response.
        await page.goto('http://localhost:5173/assets/favicon-32x32.png', timeout=10000)
        

        await page.goto('http://localhost:5173/assets/favicon-16x16.png', timeout=10000)
        

        await page.goto('http://localhost:5173/favicon.ico', timeout=10000)
        

        # Check HTTP headers for favicon.ico to verify content-type, content-length, and caching headers.
        await page.goto('http://localhost:5173/favicon.ico', timeout=10000)
        

        # Check HTTP headers for /assets/favicon-32x32.png and /assets/favicon-16x16.png to verify content-type, content-length, and caching headers.
        await page.goto('http://localhost:5173/assets/favicon-32x32.png', timeout=10000)
        

        # Search for manifest.json or sw.js files in the root or common locations to verify PWA integration and service worker presence.
        await page.goto('http://localhost:5173/manifest.json', timeout=10000)
        

        # Check if service worker (sw.js) file exists in the root or common locations to verify PWA service worker presence.
        await page.goto('http://localhost:5173/sw.js', timeout=10000)
        

        # Verify that robots.txt and sitemap.xml do not block favicon or manifest paths and check for any conflicting favicon tags in the HTML head.
        await page.goto('http://localhost:5173/robots.txt', timeout=10000)
        

        # Assert sitemap.xml loads correctly and contains expected URLs and sitemap declaration
        content = await page.content()
        assert '<urlset' in content or '<sitemapindex' in content, 'Sitemap XML does not contain expected <urlset> or <sitemapindex> tags'
        assert 'https://harfekuwait.com/' in content, 'Expected URLs missing in sitemap.xml'
        # Assert robots.txt presence and valid directives
        robots_text = await page.text_content('body')
        assert 'User-agent' in robots_text and 'Allow' in robots_text, 'robots.txt missing required directives'
        assert 'Sitemap: https://harfekuwait.com/sitemap.xml' in robots_text, 'robots.txt missing sitemap declaration'
        # Assert favicon link tags in home page HTML
        html = await page.content()
        assert '<link rel="icon" href="/assets/favicon-32x32.png"' in html, 'Missing favicon 32x32 link tag'
        assert '<link rel="icon" href="/assets/favicon-16x16.png"' in html, 'Missing favicon 16x16 link tag'
        assert '<link rel="icon" href="/favicon.ico"' in html, 'Missing favicon.ico link tag'
        # Assert favicon files load with 200 status and correct content-type and non-zero content-length
        for favicon_path, expected_type in [('/assets/favicon-32x32.png', 'image/png'), ('/assets/favicon-16x16.png', 'image/png'), ('/favicon.ico', 'image/x-icon')]:
            response = await page.goto(f'http://localhost:5173{favicon_path}')
            assert response.status == 200, f'Favicon {favicon_path} did not load with status 200'
            ct = response.headers.get('content-type', '')
            assert expected_type in ct, f'Favicon {favicon_path} has incorrect content-type: {ct}'
            cl = int(response.headers.get('content-length', '0'))
            assert cl > 0, f'Favicon {favicon_path} has zero content-length'
        # Assert manifest.json and sw.js exist and load with 200 status
        for p in ['/manifest.json', '/sw.js']:
            response = await page.goto(f'http://localhost:5173{p}')
            assert response.status == 200, f'{p} did not load with status 200'
        # Assert robots.txt and sitemap.xml do not block favicon or manifest paths
        assert 'Disallow: /assets/favicon-32x32.png' not in robots_text, 'robots.txt blocks favicon 32x32'
        assert 'Disallow: /assets/favicon-16x16.png' not in robots_text, 'robots.txt blocks favicon 16x16'
        assert 'Disallow: /favicon.ico' not in robots_text, 'robots.txt blocks favicon.ico'
        assert 'Disallow: /manifest.json' not in robots_text, 'robots.txt blocks manifest.json'
        assert 'Disallow: /sw.js' not in robots_text, 'robots.txt blocks sw.js'
        # Assert no duplicate or conflicting favicon tags (apple-touch-icon, mask-icon) causing override
        assert '<link rel="apple-touch-icon"' not in html, 'Unexpected apple-touch-icon tag found'
        assert '<link rel="mask-icon"' not in html, 'Unexpected mask-icon tag found'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    