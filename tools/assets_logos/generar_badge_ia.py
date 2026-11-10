from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 400, 'height': 400})
    
    # Modern clean AI Sparkle / Brain icon for RAG IA in purple/indigo
    html = """
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; width: 400px; height: 400px; }
        .card { width: 320px; height: 320px; border-radius: 72px; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #D946EF 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(124, 58, 237, 0.25); }
      </style>
    </head>
    <body>
      <div class="card">
        <svg viewBox="0 0 24 24" width="180" height="180" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" fill="white" fill-opacity="0.2" />
        </svg>
      </div>
    </body>
    </html>
    """
    page.set_content(html)
    page.wait_for_timeout(500)
    out = 'tools/assets_logos/rag_ia_badge.png'
    page.locator('.card').screenshot(path=out, omit_background=True)
    print('Generado:', out, os.path.getsize(out))
    browser.close()
