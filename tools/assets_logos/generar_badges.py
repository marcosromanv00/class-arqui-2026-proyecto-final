from playwright.sync_api import sync_playwright
import os

icons = {
    'algolia': ('Algolia', '#003DFF', 'white', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/algolia.svg'),
    'strapi': ('Strapi', '#4945FF', 'white', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/strapi.svg'),
    'miro': ('Miro', '#FFD02F', '#050038', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/miro.svg'),
    'figma': ('Figma', '#09090B', 'white', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg'),
    'flowmapp': ('FlowMapp', '#FF5C35', 'white', None),
    'octopus': ('Octopus.do', '#1E293B', 'white', None),
    'optimal': ('Optimal Workshop', '#2563EB', 'white', None),
    'clarity': ('Microsoft Clarity', '#0078D4', 'white', 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg'),
}

os.makedirs('tools/assets_logos', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, (label, bg_color, icon_color, svg_url) in icons.items():
        page = browser.new_page(viewport={'width': 400, 'height': 400})
        if svg_url:
            icon_markup = f'<img src="{svg_url}" style="width: 190px; height: 190px; filter: {"invert(1)" if icon_color=="white" else "none"};" />'
        else:
            # Lettermark monogram with clean modern typography
            letter = label[0]
            icon_markup = f'<div style="font-family: -apple-system, system-ui, sans-serif; font-weight: 800; font-size: 140px; color: {icon_color}; line-height: 1;">{letter}</div>'
            
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {{ margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; width: 400px; height: 400px; }}
            .card {{ width: 320px; height: 320px; border-radius: 72px; background: {bg_color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.15); }}
          </style>
        </head>
        <body>
          <div class="card">
            {icon_markup}
          </div>
        </body>
        </html>
        """
        page.set_content(html)
        page.wait_for_timeout(600)
        out_path = f'tools/assets_logos/{name}_badge.png'
        page.locator('.card').screenshot(path=out_path, omit_background=True)
        print(f'Generado badge: {out_path} ({os.path.getsize(out_path)} bytes)')
        page.close()
    browser.close()

