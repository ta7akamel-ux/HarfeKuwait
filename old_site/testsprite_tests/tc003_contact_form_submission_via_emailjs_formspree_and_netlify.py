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
        # Click on the contact form link to open the form for filling.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/nav/div/ul/li[6]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Fill the name input with a valid Arabic name.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('محمد العتيبي')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('+96555307742')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('mohamed.alotaibi@example.com')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[6]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('أريد تصميم مطبخ جديد بمساحة 4x3 متر مع تفاصيل دقيقة.')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[7]/label/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the submit button to send the form via EmailJS.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Clear the form fields again and fill the form for Formspree submission, avoiding direct input on the message textarea for now or try clicking to focus before input.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('محمد العتيبي')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('+96555307742')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('mohamed.alotaibi@example.com')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[6]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[6]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('أريد تصميم مطبخ جديد بمساحة 4x3 متر مع تفاصيل دقيقة.')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[7]/label').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the submit button to send the form via Formspree.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Try clicking the message textarea to focus it, then input the message text for Netlify Forms submission.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[6]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[6]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('أريد تصميم مطبخ جديد بمساحة 4x3 متر مع تفاصيل دقيقة.')
        

        # Click the submit button to send the form via Netlify Forms.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Clear the phone input and enter an invalid phone number format, then submit the form to check validation.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        # Clear required fields and uncheck privacy policy checkbox, then attempt to submit the form to verify validation errors for missing fields and unchecked privacy.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[6]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div/form/div[7]/label').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/section[7]/div/div[2]/div[2]/div[4]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Assertion for EmailJS submission success indication and no validation errors
        success_message = frame.locator('text=تم إرسال النموذج بنجاح')
        assert await success_message.is_visible(), 'EmailJS submission success message not visible'
        validation_errors = frame.locator('.validation-error')
        assert await validation_errors.count() == 0, 'Validation errors found after EmailJS submission'
        
# Assertion for Formspree submission success and proper API response
        formspree_success = frame.locator('text=تم استلام البيانات بنجاح')
        assert await formspree_success.is_visible(), 'Formspree success message not visible'
        # Optionally check for API response status if accessible via network events (not shown here)
        
# Assertion for Netlify Forms submission success notification
        netlify_success = frame.locator('text=تم إرسال النموذج بنجاح')
        assert await netlify_success.is_visible(), 'Netlify Forms submission success message not visible'
        
# Assertion for invalid phone format validation error
        phone_error = frame.locator('text=رقم الهاتف غير صالح')
        assert await phone_error.is_visible(), 'Phone validation error message not shown for invalid phone number'
        
# Assertion for missing required fields and unchecked privacy acceptance errors
        required_field_errors = frame.locator('.field-error')
        privacy_error = frame.locator('text=يجب الموافقة على سياسة الخصوصية')
        assert await required_field_errors.count() > 0, 'Required field errors not shown for missing fields'
        assert await privacy_error.is_visible(), 'Privacy policy acceptance error not shown'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    