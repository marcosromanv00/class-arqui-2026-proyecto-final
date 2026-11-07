import asyncio
from playwright.async_api import async_playwright

async def inspect():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        async def on_req(req):
            if "optimalworkshop.com" in req.url and any(x in req.url for x in ["api", "sort", "participant", "submission", "surveys", "gateway"]):
                print("REQ ->", req.method, req.url)
                if req.post_data:
                    print("POST DATA:", req.post_data[:200])

        async def on_resp(res):
            if "optimalworkshop.com" in res.url and any(x in res.url for x in ["api", "sort", "participant", "submission", "surveys", "gateway"]):
                print("RES <-", res.status, res.url)

        page.on("request", on_req)
        page.on("response", on_resp)
        
        await page.goto("https://b88cjfju.optimalworkshop.com/optimalsort/cca2026", wait_until="networkidle")
        
        btn = page.locator("button:has-text('Continuar'), button:has-text('Continue')").first
        if await btn.is_visible():
            await btn.click()
            await asyncio.sleep(2)
            
        print("Page URL after continue:", page.url)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(inspect())

