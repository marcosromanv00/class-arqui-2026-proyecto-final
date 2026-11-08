"""
Compilador Maestro de Documento Final APA 7
Cámara de Comercio de Alajuela (CCA) - Proyecto Integrador Final (30%)
Curso: EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)

Formato: Arial 12 pt, Justificado a ambos lados, Escala de Grises completa,
Tablas con bordes definidos sencillos, Soporte de Imágenes Markdown embebidas,
Sangría francesa automática en secciones de referencias bibliográficas.
"""

import os
import re
import sys
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

from styles_config import (
    COLOR_BLACK, COLOR_DARK_GRAY, COLOR_MID_GRAY, COLOR_MUTED,
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
    
    # Escala de grises estricta para títulos y subtítulos APA 7
    styles = {
        1: (18, 8, 16, True, COLOR_BLACK),       # H1: 16 pt negrita, negro
        2: (14, 5, 14, True, COLOR_DARK_GRAY),   # H2: 14 pt negrita, gris oscuro
        3: (10, 3, 12, True, COLOR_DARK_GRAY),   # H3: 12 pt negrita, gris oscuro
        4: (8, 2, 12, False, COLOR_MID_GRAY),    # H4: 12 pt itálica, gris medio
    }
    sb, sa, sz, bld, col = styles.get(level, (6, 2, 12, False, COLOR_DARK_GRAY))
    h.paragraph_format.space_before = Pt(sb)
    h.paragraph_format.space_after = Pt(sa)
    
    # Nivel 1 centrado según APA 7 (para capítulos)
    if level == 1:
        h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    else:
        h.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    for r in h.runs:
        r.font.name = "Arial"
        r.font.size = Pt(sz)
        r.font.bold = bld
        if level == 4:
            r.font.italic = True
        r.font.color.rgb = col
    return h

def add_styled_paragraph(doc, text):
    """Párrafo estándar APA 7: Arial 12 pt, Justificado a ambos lados, color Negro."""
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(6)
    
    # Si contiene citas o llamadas de atención en blockquote
    if text.startswith("> "):
        p.paragraph_format.left_indent = Inches(0.5)
        p.paragraph_format.right_indent = Inches(0.4)
        r = p.add_run(text[2:].strip())
        r.font.name = "Arial"
        r.font.size = Pt(11)
        r.font.italic = True
        r.font.color.rgb = COLOR_DARK_GRAY
        return p

    # Parsear negritas **bold** e itálicas *italic*
    parts = re.split(r'(\*\*.*?\*\*)', text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            bold_text = part[2:-2]
            r = p.add_run(bold_text)
            r.font.name = "Arial"
            r.font.size = Pt(12)
            r.font.bold = True
            r.font.color.rgb = COLOR_BLACK
        else:
            subparts = re.split(r'(\*.*?\*)', part)
            for sub in subparts:
                if sub.startswith('*') and sub.endswith('*'):
                    r = p.add_run(sub[1:-1])
                    r.font.name = "Arial"
                    r.font.size = Pt(12)
                    r.font.italic = True
                    r.font.color.rgb = COLOR_BLACK
                else:
                    clean_sub = re.sub(r'[`]', '', sub)
                    if clean_sub:
                        r = p.add_run(clean_sub)
                        r.font.name = "Arial"
                        r.font.size = Pt(12)
                        r.font.color.rgb = COLOR_BLACK
    return p

def add_styled_bullet(doc, text):
    """Viñeta estándar: Arial 11.5 pt, justificado, color negro."""
    p = doc.add_paragraph(style='List Bullet')
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(3)
    
    clean_text = re.sub(r'^[*\-]\s+', '', text)
    parts = re.split(r'(\*\*.*?\*\*)', clean_text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            r = p.add_run(part[2:-2])
            r.font.name = "Arial"
            r.font.size = Pt(11.5)
            r.font.bold = True
            r.font.color.rgb = COLOR_BLACK
        else:
            clean_part = re.sub(r'[`*]', '', part)
            r = p.add_run(clean_part)
            r.font.name = "Arial"
            r.font.size = Pt(11.5)
            r.font.color.rgb = COLOR_BLACK
    return p

def add_styled_number(doc, text):
    """Lista numerada: Arial 11.5 pt, justificado, color negro."""
    p = doc.add_paragraph(style='List Number')
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(3)
    
    clean_text = re.sub(r'^\d+\.\s+', '', text)
    parts = re.split(r'(\*\*.*?\*\*)', clean_text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            r = p.add_run(part[2:-2])
            r.font.name = "Arial"
            r.font.size = Pt(11.5)
            r.font.bold = True
            r.font.color.rgb = COLOR_BLACK
        else:
            clean_part = re.sub(r'[`*]', '', part)
            r = p.add_run(clean_part)
            r.font.name = "Arial"
            r.font.size = Pt(11.5)
            r.font.color.rgb = COLOR_BLACK
    return p

def insert_markdown_table(doc, table_lines):
    """Inserta tabla con formato en escala de grises y bordes de celda definidos sencillos."""
    if not table_lines:
        return
    
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

def insert_markdown_image(doc, img_line, base_chapter_dir):
    """
    Parsea e inserta imágenes markdown en formato: ![alt](path) o ![alt](path "title")
    Resuelve rutas relativas y centra la imagen con un ancho máximo seguro de 5.8 pulgadas.
    """
    match = re.search(r'!\[(.*?)\]\((.*?)(?:\s+["\'](.*?)["\'])?\)', img_line.strip())
    if not match:
        return False
        
    alt_text, raw_path, _ = match.groups()
    raw_path = raw_path.strip()
    
    candidates = [
        base_chapter_dir / raw_path,
        DOCS_DIR / raw_path,
        DOCS_DIR / "figuras" / Path(raw_path).name,
        BASE_DIR.parent.parent / raw_path,
        BASE_DIR.parent / raw_path
    ]
    
    resolved_path = None
    for cand in candidates:
        if cand.exists() and cand.is_file():
            resolved_path = cand
            break
            
    if resolved_path:
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        run_img = p_img.add_run()
        run_img.add_picture(str(resolved_path), width=Inches(5.8))
        
        # Pie de figura en escala de grises
        if alt_text:
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cap.paragraph_format.space_after = Pt(8)
            r_cap = p_cap.add_run(f"Figura: {alt_text}")
            r_cap.font.name = "Arial"
            r_cap.font.size = Pt(9.5)
            r_cap.font.italic = True
            r_cap.font.color.rgb = COLOR_DARK_GRAY
        return True
    else:
        # Fallback limpio si la imagen aún no está exportada físicamente
        p_warn = doc.add_paragraph()
        p_warn.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_warn.paragraph_format.space_before = Pt(6)
        p_warn.paragraph_format.space_after = Pt(6)
        r_warn = p_warn.add_run(f"[Figura Técnica / Captura: {alt_text or raw_path}]")
        r_warn.font.name = "Arial"
        r_warn.font.size = Pt(10)
        r_warn.font.italic = True
        r_warn.font.color.rgb = COLOR_MUTED
        return True

def add_reference_apa(doc, text):
    """Referencia APA 7: sangría francesa de 0.5 pulgadas, justificado, Arial 11 pt."""
    clean_text = re.sub(r'^[*\-]\s+', '', text.strip())
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.left_indent = Inches(0.5)
    p.paragraph_format.first_line_indent = Inches(-0.5)
    
    match = re.match(r'^(.*?\(\d{4}[a-z]?\)\.)\s*(.*)$', clean_text)
    if match:
        author_part, rest_part = match.groups()
        r1 = p.add_run(author_part + " ")
        r1.font.name = "Arial"
        r1.font.size = Pt(11)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_BLACK
        
        r2 = p.add_run(rest_part)
        r2.font.name = "Arial"
        r2.font.size = Pt(11)
        r2.font.color.rgb = COLOR_BLACK
    else:
        r = p.add_run(clean_text)
        r.font.name = "Arial"
        r.font.size = Pt(11)
        r.font.color.rgb = COLOR_BLACK

def build_portada_formal(doc):
    """Construye la portada oficial institucional de la UNA en escala de grises."""
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
    r_inst.font.size = Pt(11)
    r_inst.font.color.rgb = COLOR_BLACK

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
    r_title.font.size = Pt(13.5)
    r_title.font.color.rgb = COLOR_BLACK

    p_aut = doc.add_paragraph()
    p_aut.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_aut.paragraph_format.space_before = Pt(36)
    r_aut = p_aut.add_run(
        "Equipo Consultor / Estudiantes:\n"
        "1. Marcos Román Valverde (Coordinador) — Cédula: 305290253\n"
        "2. Emanuel Soto\n"
        "3. Allan Arce\n\n"
        "Heredia, Costa Rica — Noviembre, 2026"
    )
    r_aut.font.name = "Arial"
    r_aut.font.size = Pt(11)
    r_aut.font.color.rgb = COLOR_DARK_GRAY

    doc.add_page_break()

def compile_all_chapters():
    print("Iniciando compilación de capítulos Markdown a DOCX formal en escala de grises (Arial 12 Justificado)...")
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

        is_portada_file = (chapter_filename == "00_portada_resumen.md")
        is_ref_file = (chapter_filename == "15_referencias_bibliograficas.md")
        in_chapter_ref_section = False

        table_buffer = []
        code_buffer = []
        in_code_block = False

        for line in lines:
            # Control de bloques de código
            if line.strip().startswith("```"):
                if in_code_block:
                    in_code_block = False
                    code_text = "\n".join(code_buffer)
                    add_callout(doc, code_text, title="Especificación Técnica de Configuración")
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

            # Imágenes Markdown
            if re.search(r'!\[(.*?)\]\((.*?)\)', line.strip()):
                insert_markdown_image(doc, line.strip(), chapter_path.parent)
                continue

            # Si es portada original, solo procesamos a partir del Resumen Ejecutivo
            if is_portada_file and not line.startswith("## Resumen Ejecutivo") and "Resumen Ejecutivo" not in line and not table_buffer:
                if not hasattr(compile_all_chapters, "_past_portada_header"):
                    if "Resumen Ejecutivo" in line:
                        compile_all_chapters._past_portada_header = True
                    else:
                        continue

            # Detección de encabezados
            m_h1 = re.match(r'^#\s+(.+)$', line)
            m_h2 = re.match(r'^##\s+(.+)$', line)
            m_h3 = re.match(r'^###\s+(.+)$', line)
            m_h4 = re.match(r'^####\s+(.+)$', line)

            if m_h1:
                if not is_portada_file:
                    doc.add_page_break()
                in_chapter_ref_section = False
                add_styled_heading(doc, m_h1.group(1), level=1)
            elif m_h2:
                # Comprobar si entramos a sección de referencias del capítulo
                h2_text = m_h2.group(1)
                in_chapter_ref_section = ("referencia" in h2_text.lower() or "bibliograf" in h2_text.lower())
                add_styled_heading(doc, h2_text, level=2)
            elif m_h3:
                add_styled_heading(doc, m_h3.group(1), level=3)
            elif m_h4:
                add_styled_heading(doc, m_h4.group(1), level=4)
            elif line.strip() == "---":
                continue
            elif line.strip():
                # Si estamos en sección de referencias o archivo de referencias
                if (is_ref_file or in_chapter_ref_section) and not line.startswith("#"):
                    add_reference_apa(doc, line.strip())
                elif line.strip().startswith("* ") or line.strip().startswith("- "):
                    add_styled_bullet(doc, line.strip())
                elif re.match(r'^\d+\.\s+', line.strip()):
                    add_styled_number(doc, line.strip())
                else:
                    add_styled_paragraph(doc, line.strip())

        if table_buffer:
            insert_markdown_table(doc, table_buffer)

    print(f"Guardando documento DOCX en: {DOCX_OUT}")
    doc.save(str(DOCX_OUT))
    print("DOCX generado exitosamente.")

    # Generación de PDF opcional
    if "--pdf" in sys.argv:
        print("Intentando generar versión PDF sincronizada...")
        try:
            from docx2pdf import convert
            convert(str(DOCX_OUT), str(PDF_OUT))
            print(f"PDF generado exitosamente en: {PDF_OUT}")
        except Exception as error:
            print(f"Aviso en conversión PDF: {error}")
            print("El archivo DOCX maestro está 100% listo para ser exportado a PDF desde Word.")
    else:
        print("Para generar PDF automático, ejecuta: python compilar_documento_final.py --pdf")

if __name__ == "__main__":
    compile_all_chapters()
