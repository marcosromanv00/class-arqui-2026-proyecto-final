"""
Compilador Maestro de Documento Final
Cámara de Comercio de Alajuela (CCA) - Proyecto Integrador Final (30%)
Curso: EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)
"""

import os
import re
import sys
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

from styles_config import (
    COLOR_NAVY, COLOR_BLACK, COLOR_DARK_GRAY, COLOR_MUTED,
    setup_page_geometry, format_apa_table, add_callout, add_apa_table_title
)

BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR.parent / "documento"
OUTPUT_DIR = BASE_DIR.parent / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

LOGO_PATH = BASE_DIR.parent.parent / ".dev" / "exposicion" / "logo_una_grayscale.png"
DOCX_OUT = OUTPUT_DIR / "Reporte_Final_Consultoria_CCA_UNA.docx"
PDF_OUT = OUTPUT_DIR / "Reporte_Final_Consultoria_CCA_UNA.pdf"

CHAPTER_FILES = [
    "00_portada_resumen.md",
    "01_introduccion_contexto.md",
    "02_organizacion_y_usuarios.md",
    "03_inventario_diagnostico_heuristico.md",
    "04_arquitectura_propuesta_y_sitemap.md",
    "05_organizacion_jerarquica_y_bloques.md",
    "06_validacion_empirica_taxonomia.md",
    "07_composicion_contenido_wireframes.md",
    "08_evaluacion_usabilidad_friccion.md",
    "09_estrategia_busqueda_inteligente.md",
    "10_metadatos_taxonomias_cms.md",
    "11_customer_journey_contenido_social.md",
    "12_inteligencia_artificial_personalizacion.md",
    "13_comercio_electronico_pagos.md",
    "14_conclusiones_recomendaciones.md",
    "15_referencias_bibliograficas.md"
]

def add_styled_heading(doc, text, level):
    clean_text = re.sub(r'[*_`]', '', text).strip()
    h = doc.add_heading(clean_text, level=level)
    h.paragraph_format.keep_with_next = True
    
    styles = {
        1: (18, 6, 14, True, COLOR_NAVY),
        2: (14, 4, 12, True, COLOR_NAVY),
        3: (10, 2, 11, True, COLOR_DARK_GRAY),
        4: (8, 2, 10.5, True, COLOR_DARK_GRAY),
    }
    sb, sa, sz, bld, col = styles.get(level, (6, 2, 10, False, COLOR_DARK_GRAY))
    h.paragraph_format.space_before = Pt(sb)
    h.paragraph_format.space_after = Pt(sa)
    
    for r in h.runs:
        r.font.name = "Arial"
        r.font.size = Pt(sz)
        r.font.bold = bld
        r.font.color.rgb = col
    return h

def add_styled_paragraph(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(6)
    
    # Si contiene citas o llamadas de atención
    if text.startswith("> "):
        p.paragraph_format.left_indent = Inches(0.4)
        p.paragraph_format.right_indent = Inches(0.4)
        r = p.add_run(text[2:].strip())
        r.font.name = "Arial"
        r.font.size = Pt(10)
        r.font.italic = True
        r.font.color.rgb = COLOR_DARK_GRAY
        return p

    # Parsear negritas **bold** y texto normal
    parts = re.split(r'(\*\*.*?\*\*)', text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            bold_text = part[2:-2]
            r = p.add_run(bold_text)
            r.font.name = "Arial"
            r.font.size = Pt(10.5)
            r.font.bold = True
            r.font.color.rgb = COLOR_BLACK
        else:
            # Parsear itálicas *italic*
            subparts = re.split(r'(\*.*?\*)', part)
            for sub in subparts:
                if sub.startswith('*') and sub.endswith('*'):
                    r = p.add_run(sub[1:-1])
                    r.font.name = "Arial"
                    r.font.size = Pt(10.5)
                    r.font.italic = True
                    r.font.color.rgb = COLOR_DARK_GRAY
                else:
                    clean_sub = re.sub(r'[`]', '', sub)
                    if clean_sub:
                        r = p.add_run(clean_sub)
                        r.font.name = "Arial"
                        r.font.size = Pt(10.5)
                        r.font.color.rgb = COLOR_DARK_GRAY
    return p

def add_styled_bullet(doc, text):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(3)
    
    clean_text = re.sub(r'^[*\-]\s+', '', text)
    parts = re.split(r'(\*\*.*?\*\*)', clean_text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            r = p.add_run(part[2:-2])
            r.font.name = "Arial"
            r.font.size = Pt(10)
            r.font.bold = True
            r.font.color.rgb = COLOR_BLACK
        else:
            clean_part = re.sub(r'[`*]', '', part)
            r = p.add_run(clean_part)
            r.font.name = "Arial"
            r.font.size = Pt(10)
            r.font.color.rgb = COLOR_DARK_GRAY
    return p

def add_styled_number(doc, text):
    p = doc.add_paragraph(style='List Number')
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(3)
    
    clean_text = re.sub(r'^\d+\.\s+', '', text)
    parts = re.split(r'(\*\*.*?\*\*)', clean_text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            r = p.add_run(part[2:-2])
            r.font.name = "Arial"
            r.font.size = Pt(10)
            r.font.bold = True
            r.font.color.rgb = COLOR_BLACK
        else:
            clean_part = re.sub(r'[`*]', '', part)
            r = p.add_run(clean_part)
            r.font.name = "Arial"
            r.font.size = Pt(10)
            r.font.color.rgb = COLOR_DARK_GRAY
    return p

def insert_markdown_table(doc, table_lines):
    if not table_lines:
        return
    
    # Extraer encabezados y filas
    parsed_rows = []
    for line in table_lines:
        if re.match(r'^\s*\|?\s*:?---', line):
            continue  # Fila separadora markdown
        cells = [re.sub(r'[*_`]', '', c).strip() for c in line.strip().strip('|').split('|')]
        if cells and any(cells):
            parsed_rows.append(cells)
            
    if len(parsed_rows) < 2:
        return

    headers = parsed_rows[0]
    data_rows = parsed_rows[1:]
    num_cols = len(headers)

    tbl = doc.add_table(rows=len(data_rows) + 1, cols=num_cols)
    tbl.autofit = True
    
    for c_idx, h_text in enumerate(headers):
        tbl.rows[0].cells[c_idx].paragraphs[0].text = h_text
        
    for r_idx, row in enumerate(data_rows, start=1):
        for c_idx, cell_text in enumerate(row):
            if c_idx < num_cols:
                tbl.rows[r_idx].cells[c_idx].paragraphs[0].text = cell_text

    format_apa_table(tbl)
    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_after = Pt(4)

def add_reference_apa(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.left_indent = Inches(0.5)
    p.paragraph_format.first_line_indent = Inches(-0.5)
    
    # Separar autor y resto si hay año entre paréntesis
    match = re.match(r'^(.*?\(\d{4}[a-z]?\)\.)\s*(.*)$', text)
    if match:
        author_part, rest_part = match.groups()
        r1 = p.add_run(author_part + " ")
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_BLACK
        
        r2 = p.add_run(rest_part)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = COLOR_DARK_GRAY
    else:
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(9.5)
        r.font.color.rgb = COLOR_DARK_GRAY

def build_portada_formal(doc):
    """Construye la portada oficial institucional de la UNA."""
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_before = Pt(20)
    p_logo.paragraph_format.space_after = Pt(14)
    if LOGO_PATH.exists():
        p_logo.add_run().add_picture(str(LOGO_PATH), width=Inches(2.6))
        
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_after = Pt(20)
    r_inst = p_inst.add_run(
        "UNIVERSIDAD NACIONAL DE COSTA RICA\n"
        "FACULTAD DE CIENCIAS EXACTAS Y NATURALES\n"
        "ESCUELA DE INFORMÁTICA\n"
        "LICENCIATURA EN INFORMÁTICA CON ÉNFASIS EN SISTEMAS WEB\n\n"
        "CURSO: ARQUITECTURA DE INFORMACIÓN (EIF-511) — II CICLO 2026\n"
        "DOCENTE: MSC. CYNTHIA BOLAÑOS ESPINOZA"
    )
    r_inst.font.name = "Arial"
    r_inst.font.bold = True
    r_inst.font.size = Pt(10.5)
    r_inst.font.color.rgb = COLOR_DARK_GRAY

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(24)
    p_title.paragraph_format.space_after = Pt(18)
    r_title = p_title.add_run(
        "DISEÑO Y REESTRUCTURACIÓN INTEGRAL DE LA ARQUITECTURA DE INFORMACIÓN PARA EL PORTAL DIGITAL DE LA CÁMARA DE COMERCIO DE ALAJUELA\n\n"
        "Entregable 2: Proyecto Integrador Final (30%)\n"
        "Consolidado Metodológico y Tecnológico (Semanas 1 a 14)"
    )
    r_title.font.name = "Arial"
    r_title.font.bold = True
    r_title.font.size = Pt(13)
    r_title.font.color.rgb = COLOR_NAVY

    p_aut = doc.add_paragraph()
    p_aut.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_aut.paragraph_format.space_before = Pt(36)
    r_aut = p_aut.add_run(
        "Equipo Consultor / Estudiantes:\n"
        "1. Marcos Román Valverde (Coordinador) — Cédula: 305290253\n"
        "2. Emanuel Soto\n"
        "3. Allan Arce\n\n"
        "Heredia, Costa Rica — Octubre, 2026"
    )
    r_aut.font.name = "Arial"
    r_aut.font.size = Pt(10)
    r_aut.font.color.rgb = COLOR_DARK_GRAY

    doc.add_page_break()

def compile_all_chapters():
    print("Iniciando compilación de capítulos Markdown a DOCX formal...")
    doc = Document()
    setup_page_geometry(doc)
    build_portada_formal(doc)

    for chapter_filename in CHAPTER_FILES:
        chapter_path = DOCS_DIR / chapter_filename
        if not chapter_path.exists():
            print(f"Advertencia: Archivo no encontrado: {chapter_filename}")
            continue

        print(f"Procesando: {chapter_filename}")
        content = chapter_path.read_text(encoding="utf-8")
        lines = content.splitlines()

        # Omitir portada si es el archivo 00 (ya generada formalmente arriba)
        is_portada_file = (chapter_filename == "00_portada_resumen.md")
        is_ref_file = (chapter_filename == "15_referencias_bibliograficas.md")

        table_buffer = []
        code_buffer = []
        in_code_block = False

        for line in lines:
            # Control de bloques de código
            if line.strip().startswith("```"):
                if in_code_block:
                    in_code_block = False
                    code_text = "\n".join(code_buffer)
                    add_callout(doc, code_text, title="Especificación de Código / Configuración Técnica")
                    code_buffer = []
                else:
                    in_code_block = True
                    code_buffer = []
                continue

            if in_code_block:
                code_buffer.append(line)
                continue

            # Tablas Markdown
            if line.strip().startswith("|") and line.strip().endswith("|"):
                table_buffer.append(line)
                continue
            else:
                if table_buffer:
                    insert_markdown_table(doc, table_buffer)
                    table_buffer = []

            # Si es portada original, solo procesamos a partir del Resumen Ejecutivo
            if is_portada_file and not line.startswith("## Resumen Ejecutivo") and "Resumen Ejecutivo" not in line and not table_buffer:
                if not hasattr(compile_all_chapters, "_past_portada_header"):
                    if "Resumen Ejecutivo" in line:
                        compile_all_chapters._past_portada_header = True
                    else:
                        continue

            # Encabezados
            m_h1 = re.match(r'^#\s+(.+)$', line)
            m_h2 = re.match(r'^##\s+(.+)$', line)
            m_h3 = re.match(r'^###\s+(.+)$', line)
            m_h4 = re.match(r'^####\s+(.+)$', line)

            if m_h1:
                # Salto de página antes de cada capítulo principal (excepto el primero)
                if not is_portada_file:
                    doc.add_page_break()
                add_styled_heading(doc, m_h1.group(1), level=1)
            elif m_h2:
                add_styled_heading(doc, m_h2.group(1), level=2)
            elif m_h3:
                add_styled_heading(doc, m_h3.group(1), level=3)
            elif m_h4:
                add_styled_heading(doc, m_h4.group(1), level=4)
            elif line.strip().startswith("* ") or line.strip().startswith("- "):
                add_styled_bullet(doc, line.strip())
            elif re.match(r'^\d+\.\s+', line.strip()):
                add_styled_number(doc, line.strip())
            elif line.strip() == "---":
                continue
            elif line.strip():
                if is_ref_file and not line.startswith("#"):
                    add_reference_apa(doc, line.strip())
                else:
                    add_styled_paragraph(doc, line.strip())

        if table_buffer:
            insert_markdown_table(doc, table_buffer)

    print(f"Guardando documento DOCX en: {DOCX_OUT}")
    doc.save(str(DOCX_OUT))
    print("DOCX generado exitosamente.")

    # Generación de PDF mediante docx2pdf / Word COM
    print("Generando versión PDF con fidelidad tipográfica...")
    try:
        from docx2pdf import convert
        convert(str(DOCX_OUT), str(PDF_OUT))
        print(f"PDF generado exitosamente en: {PDF_OUT}")
    except Exception as error:
        print(f"Aviso en docx2pdf: {error}. Intentando fallback COM...")
        try:
            import win32com.client
            word = win32com.client.Dispatch("Word.Application")
            word.Visible = False
            wb = word.Documents.Open(str(DOCX_OUT.resolve()))
            wb.SaveAs(str(PDF_OUT.resolve()), FileFormat=17) # 17 = wdFormatPDF
            wb.Close()
            word.Quit()
            print(f"PDF generado exitosamente vía Word COM en: {PDF_OUT}")
        except Exception as com_err:
            print(f"Fallback Word COM no disponible: {com_err}")
            print("El archivo DOCX maestro está 100% listo para ser exportado a PDF desde Word.")

if __name__ == "__main__":
    compile_all_chapters()
