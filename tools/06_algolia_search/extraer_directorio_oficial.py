"""
Extrae el directorio oficial de asociados de la CCA a un Excel editable.

Fuente: https://camaraalajuela.com/directorio-de-asociados/ guardada desde el navegador
(Ctrl+S), porque el sitio está detrás de Cloudflare y bloquea descargas automáticas.

Uso:
    python -I extraer_directorio_oficial.py <ruta_html> <salida.xlsx>

Solo extrae datos públicos de empresa: nombre, categorías, teléfonos, web, Facebook y ficha.
NO extrae correos electrónicos.
"""
import html
import re
import sys
from collections import Counter
from datetime import date
from urllib.parse import parse_qs, unquote, urlparse

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

# --- Vocabulario controlado: 64 categorías originales -> 12 sectores (propuesta editable) ---
SECTOR_MAP = {
    "Alimentos y Gastronomía": ["Abarrotes", "Alimentos", "Agroindustria", "Bar", "Cafeteria", "Carniceria",
                                "Catering Service", "Licores", "Panadería", "Restaurante", "vinos"],
    "Salud y Bienestar": ["Medicina", "Odontologia", "Salud", "fisioterapia", "Estética", "gimnasio"],
    "Banca y Finanzas": ["Bancos", "Finanzas", "Cooperativa", "Cooperativas"],
    "Servicios Profesionales": ["Asesoría", "Asesoría Contable", "Consultores", "Derecho",
                                "Servicios de Consultoría (Bienes Raíces)", "Marketing", "Marketing Digital"],
    "Tecnología": ["Tecnologia", "Desarrollo Web"],
    "Construcción y Ferretería": ["Constuctora", "Ferreteria", "Materiales de Construccion", "Armaduras"],
    "Automotriz y Transporte": ["Automotriz", "Repuestos", "taller", "Lavacar", "Grúas", "Rent a Car",
                                "Transporte", "Mensajeria", "Gasolinera", "Aduana", "Aeropuerto", "Parqueo"],
    "Turismo y Recreación": ["Hotel", "Recreación", "Natacion", "Billares"],
    "Educación": ["Educación"],
    "Comercio y Tiendas": ["Comercio", "Tienda", "Ventas", "Zapaterías", "Muebles", "Centro Comercial", "Alquiler"],
    "Industria": ["Industria", "Recicladora"],
    "Otros Servicios": ["Funeraria", "Seguridad Privada", "General", "Informacion"],
}
CAT_TO_SECTOR = {c.lower(): s for s, cats in SECTOR_MAP.items() for c in cats}
# Categorías genéricas: solo deciden el sector si el comercio no tiene otra más específica
GENERIC = {"comercio", "ventas", "industria", "general", "tienda"}

CANTONES_ALAJUELA = ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares",
                     "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles",
                     "Guatuso", "Río Cuarto", "Fuera de la provincia"]


def clean_url(url: str) -> str:
    """Quita el envoltorio de redirección l.facebook.com y el parámetro fbclid."""
    url = html.unescape(url).strip()
    p = urlparse(url)
    if p.netloc.endswith("l.facebook.com") and "u" in parse_qs(p.query):
        url = unquote(parse_qs(p.query)["u"][0])
    url = re.sub(r"[?&]fbclid=[^&]*", "", url)
    # El sitio oficial trae algunas URLs sin "://" ni "/" (ej. "httpswww.durman.comfbclidIwAR...")
    m = re.match(r"^(https?)(?!s?://)(.*?)(?:fbclid.*)?$", url)
    if m:
        rest = m.group(2)
        # dominio + ruta pegados: "instagram.comBordados" -> "instagram.com/Bordados", "linktr.eeinfo" -> "linktr.ee/info"
        rest = re.sub(r"^([^/]+?\.(?:com|ee|net|org|site))(?=[A-Za-z_])", r"\1/", rest)
        url = f"{m.group(1)}://{rest}"
    return url


def text(s: str) -> str:
    return html.unescape(re.sub(r"\s+", " ", s)).strip()


def parse(html_src: str):
    chunks = html_src.split('class="directorio-card-shortcode"')[1:]
    rows = []
    for ch in chunks:
        title = re.search(r'card-title-shortcode">\s*<a href="([^"]+)">(.*?)</a>', ch, re.S)
        if not title:
            continue
        ficha, name = clean_url(title.group(1)), text(title.group(2))
        slug = urlparse(ficha).path.rstrip("/").split("/")[-1]
        cats = [text(c) for c in re.findall(r'categoria-tag-shortcode">(.*?)</span>', ch, re.S)]
        phones = [text(t) for t in re.findall(r'title="Llamar al ([^"]*)"', ch)]
        web = re.search(r'href="([^"]+)"[^>]*title="Visitar sitio web"', ch)
        fb = re.search(r'href="([^"]+)" class="contacto-icon-shortcode facebook"', ch)
        sectors = [CAT_TO_SECTOR.get(c.lower()) for c in cats]
        specific = [s for c, s in zip(cats, sectors) if s and c.lower() not in GENERIC]
        any_sector = [s for s in sectors if s]
        sector = (specific or any_sector or [""])[0]
        rows.append({
            "objectID": slug,
            "name": name,
            "categorias_originales": ", ".join(cats),
            "sector": sector,
            "canton": "",
            "district": "",
            "telefonos": " | ".join(phones),
            "web": clean_url(web.group(1)) if web else "",
            "facebook": clean_url(fb.group(1)) if fb else "",
            "ficha_oficial": ficha,
            "notas": "",
        })
    return rows


def main(src, out):
    with open(src, encoding="utf-8") as f:
        rows = parse(f.read())

    # Señalar posibles duplicados por nombre normalizado (ej. "Jinca Foods" / "Jinca Foods S.A")
    norm = lambda n: re.sub(r"\b(s\.?a\.?|r\.?l\.?|ltda\.?)$", "", re.sub(r"[^\w ]", "", n.lower())).strip()
    counts = Counter(norm(r["name"]) for r in rows)
    for r in rows:
        if counts[norm(r["name"])] > 1:
            r["notas"] = "Posible duplicado: revisar"
        if not r["categorias_originales"]:
            r["notas"] = (r["notas"] + "; " if r["notas"] else "") + "Sin categoría en el sitio oficial"

    wb = Workbook()
    ws = wb.active
    ws.title = "Comercios"
    headers = list(rows[0].keys())
    labels = {"objectID": "objectID (no tocar)", "name": "Nombre", "categorias_originales": "Categorías originales (sitio)",
              "sector": "Sector normalizado (propuesta)", "canton": "Cantón ✏️", "district": "Distrito ✏️",
              "telefonos": "Teléfonos", "web": "Sitio web", "facebook": "Facebook",
              "ficha_oficial": "Ficha oficial", "notas": "Notas"}
    ws.append([labels[h] for h in headers])
    for r in rows:
        ws.append([r[h] for h in headers])

    head_fill = PatternFill("solid", fgColor="991B1B")
    edit_fill = PatternFill("solid", fgColor="FEF3C7")
    for c in ws[1]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = head_fill
        c.alignment = Alignment(wrap_text=True, vertical="center")
    edit_cols = [headers.index(h) + 1 for h in ("sector", "canton", "district", "notas")]
    for row in ws.iter_rows(min_row=2):
        for c in row:
            if c.column in edit_cols:
                c.fill = edit_fill
    widths = {"objectID": 28, "name": 40, "categorias_originales": 28, "sector": 26, "canton": 18,
              "district": 20, "telefonos": 30, "web": 34, "facebook": 34, "ficha_oficial": 40, "notas": 30}
    for i, h in enumerate(headers, 1):
        ws.column_dimensions[ws.cell(1, i).column_letter].width = widths[h]
    ws.freeze_panes = "C2"
    ws.auto_filter.ref = ws.dimensions

    # Listas desplegables
    lists = wb.create_sheet("Listas")
    lists.append(["Cantones", "Sectores"])
    sectors = list(SECTOR_MAP.keys())
    for i in range(max(len(CANTONES_ALAJUELA), len(sectors))):
        lists.append([CANTONES_ALAJUELA[i] if i < len(CANTONES_ALAJUELA) else None,
                      sectors[i] if i < len(sectors) else None])
    n = len(rows) + 1
    col = lambda h: ws.cell(1, headers.index(h) + 1).column_letter
    dv_c = DataValidation(type="list", formula1=f"=Listas!$A$2:$A${len(CANTONES_ALAJUELA)+1}", allow_blank=True)
    dv_s = DataValidation(type="list", formula1=f"=Listas!$B$2:$B${len(sectors)+1}", allow_blank=True)
    ws.add_data_validation(dv_c)
    ws.add_data_validation(dv_s)
    dv_c.add(f"{col('canton')}2:{col('canton')}{n}")
    dv_s.add(f"{col('sector')}2:{col('sector')}{n}")

    # Hoja de mapeo de categorías (evidencia del vocabulario controlado para el Cap. 9/10)
    mp = wb.create_sheet("Mapeo categorías")
    mp.append(["Categoría original (sitio CCA)", "Sector normalizado", "Nº comercios"])
    cat_counts = Counter(c.strip() for r in rows for c in r["categorias_originales"].split(",") if c.strip())
    for cat, cnt in sorted(cat_counts.items(), key=lambda x: x[0].lower()):
        mp.append([cat, CAT_TO_SECTOR.get(cat.lower(), "SIN MAPEO"), cnt])
    for c in mp[1]:
        c.font = Font(bold=True)
    mp.column_dimensions["A"].width = 40
    mp.column_dimensions["B"].width = 28

    info = wb.create_sheet("Instrucciones", 0)
    for line in [
        "Dataset oficial de asociados · Cámara de Comercio de Alajuela",
        f"Fuente: https://camaraalajuela.com/directorio-de-asociados/ (guardada el {date.today().isoformat()})",
        f"Registros extraídos: {len(rows)} (el sitio dice '171 resultados'; su encabezado dice '173 Empresas Certificadas')",
        "",
        "Qué completar (columnas amarillas en la hoja 'Comercios'):",
        "  • Cantón: elegir de la lista desplegable (16 cantones de Alajuela o 'Fuera de la provincia').",
        "  • Distrito: texto libre (ej. Alajuela Centro, El Coyol, La Guácima, San Antonio).",
        "  • Sector normalizado: ya viene una propuesta; corregir si no calza.",
        "  • Notas: marcar duplicados o comercios que ya no existen.",
        "No modificar 'objectID': es la llave única que usa Algolia.",
        "Si no se sabe el cantón de un comercio, dejarlo vacío (no adivinar).",
        "Correos electrónicos excluidos a propósito (datos de contacto que no aportan a la búsqueda).",
    ]:
        info.append([line])
    info["A1"].font = Font(bold=True, size=14)
    info.column_dimensions["A"].width = 110

    wb.save(out)
    print(f"Registros: {len(rows)}")
    print(f"Sin sector: {sum(1 for r in rows if not r['sector'])}")
    print(f"Posibles duplicados: {sum(1 for r in rows if 'duplicado' in r['notas'])}")
    print("Por sector:", dict(Counter(r['sector'] or '(vacío)' for r in rows).most_common()))
    unmapped = [c for c in cat_counts if c.lower() not in CAT_TO_SECTOR]
    print("Categorías sin mapeo:", unmapped or "ninguna")
    print(f"Categorías originales distintas: {len(cat_counts)}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
