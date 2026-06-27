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
        # Open gallery section by clicking the 'معرض شغلنا' link.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/nav/div/ul/li[5]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Scroll down to trigger lazy loading of additional images and verify if new images load.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Click on a gallery image to verify it opens in a lightbox.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[5]/div/div[2]/div/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the next image button (index 34) to navigate to the next image in the lightbox.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[3]/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the next image button (index 33) to verify navigation to the next image in the lightbox.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[3]/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the close button (index 32) to close the lightbox.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[3]/div/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Scroll down to find and click the download button for a gallery image to verify image download functionality.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Scroll further down or extract content to find any image download buttons or links in the gallery section.
        await page.mouse.wheel(0, window.innerHeight)
        

        # Assertion: Verify initial images in gallery are loaded (lazy loading behavior).
        initial_images = frame.locator('xpath=html/body/section[5]/div/div[2]/div/div/img')
        initial_count = await initial_images.count()
        assert initial_count > 0, 'No initial images found in gallery.'
        for i in range(initial_count):
            img = initial_images.nth(i)
            # Check that the image has a non-empty src attribute indicating it is loaded or loading
            src = await img.get_attribute('src')
            assert src and src.strip() != '', f'Image at index {i} does not have a valid src attribute.'
        # Scroll down to trigger lazy loading of additional images
        await page.mouse.wheel(0, 1000)
        await page.wait_for_timeout(2000)
        # Check if new images have loaded after scroll
        new_images = frame.locator('xpath=html/body/section[5]/div/div[2]/div/div/img')
        new_count = await new_images.count()
        assert new_count >= initial_count, 'No new images loaded after scrolling, lazy loading may not be working.'
        # Assertion: Verify image opens in lightbox overlay after click
        lightbox = frame.locator('xpath=html/body/div[3]')
        assert await lightbox.is_visible(), 'Lightbox overlay is not visible after clicking an image.'
        # Assertion: Verify navigation controls in lightbox change images
        # Get current image src in lightbox
        lightbox_img = lightbox.locator('img')
        current_src = await lightbox_img.get_attribute('src')
        # Click next button
        next_button = lightbox.locator('xpath=html/body/div[3]/div/div[2]/button').nth(0)
        await next_button.click()
        await page.wait_for_timeout(1000)
        next_src = await lightbox_img.get_attribute('src')
        assert next_src != current_src, 'Lightbox image did not change after clicking next button.'
        # Click previous button
        prev_button = lightbox.locator('xpath=html/body/div[3]/div/div[2]/button').nth(1)
        await prev_button.click()
        await page.wait_for_timeout(1000)
        prev_src = await lightbox_img.get_attribute('src')
        assert prev_src == current_src, 'Lightbox image did not revert to previous after clicking previous button.'
        # Assertion: Verify lightbox closes when close button clicked
        close_button = lightbox.locator('xpath=html/body/div[3]/div/span').nth(0)
        await close_button.click()
        await page.wait_for_timeout(1000)
        assert not await lightbox.is_visible(), 'Lightbox did not close after clicking close button.'
        # Assertion: Verify images can be downloaded from gallery interface
        # Find download buttons or links in gallery section
        download_buttons = frame.locator('xpath=//section[contains(@class, "gallery")]//a[contains(@href, ".jpg") or contains(@href, ".png") or contains(@href, ".jpeg")]')
        download_count = await download_buttons.count()
        assert download_count > 0, 'No download links/buttons found in gallery.'
        # Verify that each download link href corresponds to a gallery image src
        gallery_images_srcs = []
        for i in range(await initial_images.count()):
            src = await initial_images.nth(i).get_attribute('src')
            if src:
                gallery_images_srcs.append(src)
        for i in range(download_count):
            href = await download_buttons.nth(i).get_attribute('href')
            assert href in gallery_images_srcs, f'Download link href {href} does not correspond to any gallery image src.'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    