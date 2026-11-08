"""
Convierte el Excel revisado del directorio oficial CCA al JSON que indexa Algolia.

Uso:
    python -P xlsx_a_algolia.py directorio_oficial_cca_171.xlsx cca_directorio_oficial.json
"""
import json
import re
import sys
from collections import Counter

from openpyxl import load_workbook

# Encabezados del Excel -> clave interna (por prefijo, para tolerar emojis/sufijos)
COLS = {
    "objectID": "objectID", "Nombre": "name", "Categorías originales": "categories",
    "Sector normalizado": "sector", "Cantón ✏": "canton", "Distrito": "district",
    "Teléfonos": "phones", "Sitio web": "web", "Facebook": "facebook", "Ficha oficial": "ficha",
    "Notas": "notes", "Dirección verificada": "address", "Fuente de ubicación": "geoSource",
    "Estado geográfico": "geoStatus", "Provincia verificada": "province", "Cantón real": "cantonReal",
}


# --- Convenios ILUSTRATIVOS (no reales) para mantener la lógica de beneficios del prototipo ---
# El sitio oficial no publica convenios por comercio; estos textos se marcan con convenioIlustrativo=True
# y la UI los rotula como tales. Se asignan de forma determinística según el objectID.
CONVENIOS = {
    "Alimentos y Gastronomía": [("10% en consumo para afiliados CCA y sus colaboradores", "₡12.000 / mes en alimentación"),
                                ("Precio preferencial en pedidos corporativos y eventos", "₡20.000 por evento empresarial")],
    "Salud y Bienestar": [("15% en consultas y servicios para afiliados CCA", "₡25.000 por colaborador al año"),
                          ("Tarifa preferencial en paquetes de salud ocupacional", "₡40.000 en salud ocupacional")],
    "Banca y Finanzas": [("Tasa preferencial en crédito pyme para afiliados CCA", "Hasta 1 punto menos en tasa de interés"),
                         ("Asesoría financiera sin costo para afiliados", "₡50.000 en asesoría")],
    "Servicios Profesionales": [("Primera consulta sin costo para afiliados CCA", "₡45.000 en honorarios"),
                                ("10% en honorarios de asesoría anual", "₡60.000 al año")],
    "Tecnología": [("Diagnóstico tecnológico gratuito + 10% en servicios", "₡70.000 en consultoría")],
    "Construcción y Ferretería": [("Precios de mayoreo para proyectos de afiliados CCA", "8% de ahorro en materiales"),
                                  ("10% en herramientas y acabados", "₡30.000 por compra mayor")],
    "Automotriz y Transporte": [("10% en servicios y repuestos para flotillas de afiliados", "₡35.000 al año por vehículo"),
                                ("Tarifa preferencial en fletes y envíos", "12% en envíos")],
    "Turismo y Recreación": [("Tarifa corporativa para afiliados CCA", "15% en hospedaje y eventos"),
                             ("2x1 en entradas para colaboradores de afiliados", "₡10.000 por visita")],
    "Educación": [("15% en matrícula para afiliados y sus colaboradores", "₡40.000 por curso")],
    "Comercio y Tiendas": [("10% en compras para afiliados CCA", "₡15.000 / mes en compras"),
                           ("Descuento por volumen para compras empresariales", "7% en compras corporativas")],
    "Industria": [("Precio preferencial en compras por volumen", "6% en suministros")],
    "Otros Servicios": [("Tarifa preferencial para afiliados CCA", "10% en servicios contratados")],
    "Sin clasificar": [("Beneficio por definir con la Cámara", "—")],
}

PHONE_RE = re.compile(r"(\d[\d\s-]{6,}\d)")


def pick_whatsapp(phones):
    """WhatsApp solo si la ficha lo rotula, o si hay un celular (8 dígitos que inician en 5-8)."""
    labeled = [p for p in phones if "whatsapp" in p.lower()]
    for p in labeled + phones:
        if "fax" in p.lower():
            continue
        for m in PHONE_RE.findall(p):
            digits = re.sub(r"\D", "", m)
            if len(digits) == 8 and (p in labeled or digits[0] in "5678"):
                return "506" + digits
    return ""


def s(v):
    return re.sub(r"\s+", " ", str(v)).strip() if v not in (None, "") else ""


def main(src, out):
    ws = load_workbook(src, read_only=True)["Comercios"]
    rows = list(ws.iter_rows(values_only=True))
    header = [s(h) for h in rows[0]]
    idx = {}
    for key_prefix, key in COLS.items():
        hit = [i for i, h in enumerate(header) if h.startswith(key_prefix)]
        if hit:
            idx[key] = hit[0]

    records = []
    for r in rows[1:]:
        g = {k: s(r[i]) for k, i in idx.items()}
        # Repara URLs dañadas por la primera versión del extractor ("http://s://..." -> "https://...")
        for k in ("web", "facebook", "ficha"):
            g[k] = g.get(k, "").replace("http://s://", "https://")
        if not g.get("objectID"):
            continue
        # La fuente citada como "directorio-de-asociados/...all_listings" es en realidad el directorio heredado
        src_url = g.get("geoSource", "")
        if "wpbdp_view=all_listings" in src_url:
            src_url = src_url.replace("/directorio-de-asociados/", "/directorio-asociados-old/")
        rec = {
            "objectID": g["objectID"],
            "name": g["name"],
            "sector": g.get("sector") or "Sin clasificar",
            "categories": [c.strip() for c in g.get("categories", "").split(",") if c.strip()],
            "canton": g.get("canton", ""),
            "district": g.get("district", ""),
            "province": g.get("province", ""),
            "address": g.get("address", ""),
            "phones": [p.strip() for p in g.get("phones", "").split("|") if p.strip()],
            "web": g.get("web", ""),
            "facebook": g.get("facebook", ""),
            "ficha": g.get("ficha", ""),
            "geoStatus": g.get("geoStatus", ""),
            "geoSource": src_url,
        }
        cats = rec["categories"]
        rec["description"] = (f"Asociado certificado de la CCA · {', '.join(cats)}." if cats
                              else "Asociado certificado de la Cámara de Comercio de Alajuela.")
        opts = CONVENIOS.get(rec["sector"], CONVENIOS["Otros Servicios"])
        conv, ahorro = opts[sum(map(ord, rec["objectID"])) % len(opts)]
        rec["convenio"], rec["ahorroEstimado"], rec["convenioIlustrativo"] = conv, ahorro, True
        rec["whatsapp"] = pick_whatsapp(rec["phones"])
        rec["verified"] = True  # los 171 figuran como "Empresas Certificadas" en el sitio oficial
        # Completitud de la ficha (0-4): criterio de ranking en ausencia de datos de convenio/verificación
        rec["profileScore"] = sum(bool(x) for x in (rec["phones"], rec["web"], rec["facebook"], rec["address"]))
        keep = {"categories", "phones", "profileScore", "verified", "convenioIlustrativo"}  # siempre presentes (listas pueden ir vacías)
        records.append({k: v for k, v in rec.items() if k in keep or v != ""})

    with open(out, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)

    print(f"Registros: {len(records)}")
    print("Por cantón:", dict(Counter(r.get("canton", "(vacío)") for r in records).most_common()))
    print("Con distrito:", sum(1 for r in records if r.get("district")))
    print("Con dirección:", sum(1 for r in records if r.get("address")))
    print("Por sector:", dict(Counter(r["sector"] for r in records).most_common()))
    print("profileScore:", dict(sorted(Counter(r["profileScore"] for r in records).items())))
    print("Con WhatsApp:", sum(1 for r in records if r.get("whatsapp")))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
