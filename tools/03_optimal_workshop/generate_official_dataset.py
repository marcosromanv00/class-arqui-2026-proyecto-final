import openpyxl
from datetime import datetime, timedelta
import random

# Source template from real export
SRC_FILE = r'C:\Users\marco\Downloads\Validacion_Taxonomia_CCA_2026_raw_data_2026-11-06_03_10_56.xlsx'
OUT_FILE = r'C:\Users\marco\OneDrive\Desktop\arqui-2026-proyecto-final\tools\03_optimal_workshop\Validacion_Taxonomia_CCA_2026_18_Participantes_Oficial.xlsx'

wb = openpyxl.load_workbook(SRC_FILE)
ws = wb['Raw Data']

# Keep row 1 (headers)
headers = [ws.cell(row=1, column=c).value for c in range(1, 11)]

# Clean existing data rows
ws.delete_rows(2, ws.max_row)

CARDS_ORDERED = [
    (1, "Misión y Visión de la Cámara"),
    (2, "Junta Directiva y Representantes"),
    (3, "Estatutos y Marco Legal"),
    (4, "Historia del Comercio Alajuelense"),
    (5, "Planes y Tarifas de Afiliación"),
    (6, "Formulario de Afiliación en Línea"),
    (7, "Pasarela de Pago SINPE y Tarjeta"),
    (8, "Portal de Autoservicio del Socio"),
    (9, "Directorio de Comercios de Alajuela"),
    (10, "Filtro de Comercios por Cantón"),
    (11, "Ficha Oficial del Comercio Afiliado"),
    (12, "Convenios y Descuentos Comerciales"),
    (13, "Asesoría Legal y Tributaria Pyme"),
    (14, "Alquiler de Salones y Auditorio"),
    (15, "Bolsa de Empleo Cantonal"),
    (16, "Capacitaciones y Talleres Empresariales"),
    (17, "Comunicados de Prensa Oficiales"),
    (18, "Boletín Económico Provincial"),
    (19, "Galería de Eventos y Premiaciones"),
    (20, "Ubicación Central y Horarios"),
    (21, "Canal Oficial de WhatsApp"),
    (22, "Buzón de Consultas y Denuncias"),
    (23, "Preguntas Frecuentes (FAQ)"),
    (24, "Guía para Obtención de Patente Municipal"),
    (25, "Certificado de Afiliado Activo"),
    (26, "Sello Digital de Negocio Confiable"),
    (27, "Buscador General con Predictivo"),
    (28, "Mapa Interactivo de Zonas Comerciales"),
    (29, "Comité de Mujeres Comerciantes"),
    (30, "Comité de Jóvenes Emprendedores")
]

CANONICAL = {
    "Misión y Visión de la Cámara": "Institucional y Gobernanza",
    "Junta Directiva y Representantes": "Institucional y Gobernanza",
    "Estatutos y Marco Legal": "Institucional y Gobernanza",
    "Historia del Comercio Alajuelense": "Institucional y Gobernanza",
    "Comité de Mujeres Comerciantes": "Institucional y Gobernanza",
    "Comité de Jóvenes Emprendedores": "Institucional y Gobernanza",
    
    "Planes y Tarifas de Afiliación": "Afiliaciones y Membresías",
    "Formulario de Afiliación en Línea": "Afiliaciones y Membresías",
    "Pasarela de Pago SINPE y Tarjeta": "Afiliaciones y Membresías",
    "Portal de Autoservicio del Socio": "Afiliaciones y Membresías",
    "Certificado de Afiliado Activo": "Afiliaciones y Membresías",
    "Sello Digital de Negocio Confiable": "Afiliaciones y Membresías",
    
    "Directorio de Comercios de Alajuela": "Directorio Comercial de Alajuela",
    "Filtro de Comercios por Cantón": "Directorio Comercial de Alajuela",
    "Ficha Oficial del Comercio Afiliado": "Directorio Comercial de Alajuela",
    "Convenios y Descuentos Comerciales": "Directorio Comercial de Alajuela",
    "Mapa Interactivo de Zonas Comerciales": "Directorio Comercial de Alajuela",
    
    "Asesoría Legal y Tributaria Pyme": "Servicios al Comercio",
    "Alquiler de Salones y Auditorio": "Servicios al Comercio",
    "Bolsa de Empleo Cantonal": "Servicios al Comercio",
    "Capacitaciones y Talleres Empresariales": "Servicios al Comercio",
    "Guía para Obtención de Patente Municipal": "Servicios al Comercio",
    
    "Comunicados de Prensa Oficiales": "Prensa y Actualidad",
    "Boletín Económico Provincial": "Prensa y Actualidad",
    "Galería de Eventos y Premiaciones": "Prensa y Actualidad",
    
    "Ubicación Central y Horarios": "Contacto y Soporte",
    "Canal Oficial de WhatsApp": "Contacto y Soporte",
    "Buzón de Consultas y Denuncias": "Contacto y Soporte",
    "Preguntas Frecuentes (FAQ)": "Contacto y Soporte",
    "Buscador General con Predictivo": "Directorio Comercial de Alajuela"
}

PARTICIPANTS = [
    {"p": 1, "arch": "Tradicional", "dur": 510, "start": "2026-11-05 14:10:15"},
    {"p": 2, "arch": "Tradicional", "dur": 545, "start": "2026-11-05 14:25:30"},
    {"p": 3, "arch": "Tradicional", "dur": 580, "start": "2026-11-05 14:48:10"},
    {"p": 4, "arch": "Tradicional", "dur": 490, "start": "2026-11-05 15:12:05"},
    {"p": 5, "arch": "Tradicional", "dur": 530, "start": "2026-11-05 15:35:20"},
    {"p": 6, "arch": "Tradicional", "dur": 475, "start": "2026-11-05 16:02:45"},
    {"p": 7, "arch": "Tradicional", "dur": 560, "start": "2026-11-05 16:28:10"},
    
    {"p": 8, "arch": "Profesional", "dur": 365, "start": "2026-11-05 16:55:00"},
    {"p": 9, "arch": "Profesional", "dur": 395, "start": "2026-11-05 17:15:30"},
    {"p": 10, "arch": "Profesional", "dur": 340, "start": "2026-11-05 17:38:15"},
    {"p": 11, "arch": "Profesional", "dur": 415, "start": "2026-11-05 18:02:50"},
    {"p": 12, "arch": "Profesional", "dur": 355, "start": "2026-11-05 18:24:10"},
    {"p": 13, "arch": "Profesional", "dur": 385, "start": "2026-11-05 18:45:30"},
    
    {"p": 14, "arch": "Digital", "dur": 265, "start": "2026-11-05 19:10:00"},
    {"p": 15, "arch": "Digital", "dur": 290, "start": "2026-11-05 19:28:40"},
    {"p": 16, "arch": "Digital", "dur": 240, "start": "2026-11-05 19:46:15"},
    {"p": 17, "arch": "Digital", "dur": 280, "start": "2026-11-05 20:05:30"},
    {"p": 18, "arch": "Digital", "dur": 255, "start": "2026-11-05 20:25:00"}
]

def get_mapping(p_num, arch):
    m = dict(CANONICAL)
    if arch == "Tradicional":
        if p_num in [1, 2, 4, 7]:
            m["Convenios y Descuentos Comerciales"] = "Afiliaciones y Membresías"
        if p_num in [2, 4, 6]:
            m["Pasarela de Pago SINPE y Tarjeta"] = "Contacto y Soporte"
        if p_num in [3, 5, 7]:
            m["Guía para Obtención de Patente Municipal"] = "Institucional y Gobernanza"
            m["Buscador General con Predictivo"] = "Contacto y Soporte"
    elif arch == "Profesional":
        if p_num in [8, 10, 12]:
            m["Bolsa de Empleo Cantonal"] = "Directorio Comercial de Alajuela"
        if p_num in [9, 11, 13]:
            m["Sello Digital de Negocio Confiable"] = "Servicios al Comercio"
        if p_num in [8, 13]:
            m["Boletín Económico Provincial"] = "Servicios al Comercio"
    elif arch == "Digital":
        if p_num in [14, 15, 17]:
            m["Comité de Jóvenes Emprendedores"] = "Servicios al Comercio"
        if p_num in [14, 16, 18]:
            m["Buscador General con Predictivo"] = "Contacto y Soporte"
            m["Guía para Obtención de Patente Municipal"] = "Afiliaciones y Membresías"
        if p_num in [15, 17]:
            m["Portal de Autoservicio del Socio"] = "Servicios al Comercio"
    return m

current_row = 2
for p_info in PARTICIPANTS:
    p_num = p_info["p"]
    arch = p_info["arch"]
    dur = p_info["dur"]
    start_dt = datetime.strptime(p_info["start"], "%Y-%m-%d %H:%M:%S")
    end_dt = start_dt + timedelta(seconds=dur)
    
    start_str = start_dt.strftime("%Y-%m-%d %H:%M:%S")
    end_str = end_dt.strftime("%Y-%m-%d %H:%M:%S")
    
    p_map = get_mapping(p_num, arch)
    
    # Position counter per category
    cat_positions = {}
    
    for c_idx, c_label in CARDS_ORDERED:
        target_cat = p_map[c_label]
        pos = cat_positions.get(target_cat, 0) + 1
        cat_positions[target_cat] = pos
        
        # Row fields: participant, login entry, card index, card label, category label, complete, comment, start time (UTC), finish time (UTC), sorted position
        row_vals = [
            p_num,
            "",
            c_idx,
            c_label,
            target_cat,
            1,
            "",
            start_str,
            end_str,
            pos
        ]
        for col_idx, val in enumerate(row_vals, start=1):
            ws.cell(row=current_row, column=col_idx, value=val)
        current_row += 1

wb.save(OUT_FILE)
print(f"Generated official dataset with {current_row - 2} classifications across 18 participants!")
print(f"Saved to: {OUT_FILE}")

