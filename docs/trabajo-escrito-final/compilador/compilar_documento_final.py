"""
Compilador Maestro de Documento Final APA 7
Cámara de Comercio de Alajuela (CCA) - Proyecto Integrador Final (30%)
Curso: EIF-511 Arquitectura de Información · Universidad Nacional de Costa Rica (UNA)

Formato: Arial 11.5 pt, Justificado a ambos lados, Escala de Grises completa,
Tablas con bordes definidos sencillos, Soporte de Imágenes Markdown embebidas,
Sangría francesa automática en secciones de referencias bibliográficas.
"""

import re
import sys
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

from styles_config import (
    COLOR_BLACK, COLOR_DARK_GRAY, COLOR_MID_GRAY, COLOR_MUTED,
    setup_page_geometry, format_apa_table, add_callout
)

BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR.parent / "documento"
OUTPUT_DIR = BASE_DIR.parent / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

LOGO_UNA_PATH = BASE_DIR.parent.parent / ".dev" / "exposicion" / "logo_una_grayscale.png"
LOGO_CCA_PATH = DOCS_DIR / "figuras" / "Logo-camara-hi.png"
DOCX_OUT = OUTPUT_DIR / "Reporte_Final_Consultoria_CCA_UNA.docx"
PDF_OUT = OUTPUT_DIR / "Reporte_Final_Consultoria_CCA_UNA.pdf"

CHAPTER_FILES = [
    "02_indice.md",
    "03_resumen_ejecutivo.md",
    "04_objetivos.md",
    "05_dominio_y_objeto_estudio.md",
    "06_enfoque_arquitectura_informacion.md",
    "07_resumen_avance_1.md",
    "08_subsanaciones_avance_1_feedback.md",
    "09_avance_2/01_maze_y_clarity.md",
    "09_avance_2/02_algolia_search.md",
    "09_avance_2/03_strapi_cms.md",
    "09_avance_2/04_miro_cjm.md",
    "09_avance_2/05_asistente_rag_ia.md",
    "09_avance_2/06_ecommerce_sinpe.md",
    "10_decisiones_finales.md",
    "11_conclusiones_recomendaciones.md",
    "12_referencias_bibliograficas.md"
]


def add_styled_heading(doc, text, level):
    clean_text = re.sub(r'[*_`]', '', text).strip()
    h = doc.add_heading(clean_text, level=level)
    h.paragraph_format.keep_with_next = True

    styles = {
        1: (18, 8, 16, True, COLOR_BLACK),
        2: (14, 5, 14, True, COLOR_DARK_GRAY),
        3: (10, 3, 12, True, COLOR_DARK_GRAY),
        4: (8, 2, 12, False, COLOR_MID_GRAY),
    }
    sb, sa, sz, bld, col = styles.get(level, (6, 2, 12, False, COLOR_DARK_GRAY))
    h.paragraph_format.space_before = Pt(sb)
    h.paragraph_format.space_after = Pt(sa)

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


def add_formatted_runs(p, text, font_size=11.5, base_bold=False, base_italic=False, color=COLOR_BLACK):
    """Parsea enlaces markdown [texto](url), negritas **...**, cursivas *...* y código `...` sin dejar símbolos crudos."""
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1', text)
    tokens = re.split(r'(\*\*.*?\*\*|\*[^*]+?\*|`[^`]+?`)', text)
    for tok in tokens:
        if not tok:
            continue
        if tok.startswith('**') and tok.endswith('**'):
            inner_clean = re.sub(r'[*`]', '', tok[2:-2])
            r = p.add_run(inner_clean)
            r.font.name = "Arial"
            r.font.size = Pt(font_size)
            r.font.bold = True
            r.font.italic = base_italic
            r.font.color.rgb = color
        elif tok.startswith('*') and tok.endswith('*'):
            inner_clean = re.sub(r'[*`]', '', tok[1:-1])
            r = p.add_run(inner_clean)
            r.font.name = "Arial"
            r.font.size = Pt(font_size)
            r.font.bold = base_bold
            r.font.italic = True
            r.font.color.rgb = color
        elif tok.startswith('`') and tok.endswith('`'):
            inner_clean = tok[1:-1]
            r = p.add_run(inner_clean)
            r.font.name = "Arial"
            r.font.size = Pt(font_size)
            r.font.bold = base_bold
            r.font.italic = base_italic
            r.font.color.rgb = color
        else:
            clean_tok = re.sub(r'[*`]', '', tok)
            if clean_tok:
                r = p.add_run(clean_tok)
                r.font.name = "Arial"
                r.font.size = Pt(font_size)
                r.font.bold = base_bold
                r.font.italic = base_italic
                r.font.color.rgb = color


def add_styled_paragraph(doc, text):
    """Párrafo estándar APA 7: Arial 11.5 pt, Justificado a ambos lados, color Negro."""
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(3.5)

    if re.match(r'^\*\*Tabla\s+\d+', text.strip()):
        p.paragraph_format.keep_with_next = True
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(2)

    if text.startswith("> "):
        p.paragraph_format.left_indent = Inches(0.4)
        p.paragraph_format.right_indent = Inches(0.3)
        add_formatted_runs(p, text[2:].strip(), font_size=10.5, base_italic=True, color=COLOR_DARK_GRAY)
        return p

    add_formatted_runs(p, text, font_size=11.5, color=COLOR_BLACK)
    return p


def add_styled_bullet(doc, text, indent_level=0):
    """Viñeta estándar: Arial 11 pt, justificado, color negro."""
    p = doc.add_paragraph(style='List Bullet')
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.12
    p.paragraph_format.space_after = Pt(2.5)
    if indent_level > 0:
        p.paragraph_format.left_indent = Inches(0.5)

    clean_text = re.sub(r'^\s*[*\-]\s+', '', text)
    add_formatted_runs(p, clean_text, font_size=11, color=COLOR_BLACK)
    return p


def add_styled_number(doc, text):
    """Lista numerada con numeración explícita reiniciable por bloque."""
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.12
    p.paragraph_format.space_after = Pt(2.5)
    p.paragraph_format.left_indent = Inches(0.28)
    p.paragraph_format.first_line_indent = Inches(-0.28)

    m_num = re.match(r'^(\d+\.)\s+(.*)$', text.strip())
    if m_num:
        num_prefix, rest = m_num.groups()
        r_num = p.add_run(num_prefix + " ")
        r_num.font.name = "Arial"
        r_num.font.size = Pt(11)
        r_num.font.bold = True
        r_num.font.color.rgb = COLOR_BLACK
        add_formatted_runs(p, rest, font_size=11, color=COLOR_BLACK)
    else:
        add_formatted_runs(p, text.strip(), font_size=11, color=COLOR_BLACK)
    return p


def insert_markdown_table(doc, table_lines):
    """Inserta tabla con formato en escala de grises y bordes de celda definidos sencillos."""
    if not table_lines:
        return

    parsed_rows = []
    for line in table_lines:
        if re.match(r'^\s*\|?\s*:?---', line):
            continue
        raw_cells = line.strip().strip('|').split('|')
        cells = []
        for c in raw_cells:
            c_clean = re.sub(r'<br\s*/?>', '\n', c, flags=re.IGNORECASE)
            c_clean = re.sub(r'[*_`]', '', c_clean).strip()
            cells.append(c_clean)
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
    p_spacer.paragraph_format.space_after = Pt(3)


def insert_markdown_image(doc, img_line, base_chapter_dir):
    """Parsea e inserta imágenes markdown centradas con pie de figura APA 7."""
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
        p_img.paragraph_format.space_before = Pt(4)
        p_img.paragraph_format.space_after = Pt(2)
        p_img.paragraph_format.keep_with_next = True
        run_img = p_img.add_run()
        img_width = Inches(2.5) if "logo-camara" in resolved_path.name.lower() else Inches(3.4)
        run_img.add_picture(str(resolved_path), width=img_width)

        if alt_text:
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cap.paragraph_format.space_after = Pt(5)
            cap_label = alt_text if alt_text.lower().startswith("figura") else f"Figura: {alt_text}"
            r_cap = p_cap.add_run(cap_label)
            r_cap.font.name = "Arial"
            r_cap.font.size = Pt(9.5)
            r_cap.font.italic = True
            r_cap.font.color.rgb = COLOR_DARK_GRAY
        return True
    else:
        p_warn = doc.add_paragraph()
        p_warn.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_warn.paragraph_format.space_before = Pt(4)
        p_warn.paragraph_format.space_after = Pt(4)
        r_warn = p_warn.add_run(f"[Figura Técnica / Captura: {alt_text or raw_path}]")
        r_warn.font.name = "Arial"
        r_warn.font.size = Pt(9.5)
        r_warn.font.italic = True
        r_warn.font.color.rgb = COLOR_MUTED
        return True


def add_reference_apa(doc, text):
    """Referencia APA 7: sangría francesa de 0.5 pulgadas, justificado, Arial 10.5 pt con cursivas reales."""
    clean_text = re.sub(r'^[*\-]\s+', '', text.strip())
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.12
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.left_indent = Inches(0.5)
    p.paragraph_format.first_line_indent = Inches(-0.5)

    match = re.match(r'^(.*?\((?:\d{4}[a-z]?|s\.f\.)\)\.)\s*(.*)$', clean_text)
    if match:
        author_part, rest_part = match.groups()
        r1 = p.add_run(author_part + " ")
        r1.font.name = "Arial"
        r1.font.size = Pt(10.5)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_BLACK
        add_formatted_runs(p, rest_part, font_size=10.5, color=COLOR_BLACK)
    else:
        add_formatted_runs(p, clean_text, font_size=10.5, color=COLOR_BLACK)


def build_portada_formal(doc):
    """Construye la portada oficial institucional de la UNA y la CCA."""
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_before = Pt(16)
    p_logo.paragraph_format.space_after = Pt(12)
    if LOGO_UNA_PATH.exists():
        p_logo.add_run().add_picture(str(LOGO_UNA_PATH), width=Inches(2.4))

    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_after = Pt(18)
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

    if LOGO_CCA_PATH.exists():
        p_cca = doc.add_paragraph()
        p_cca.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cca.paragraph_format.space_before = Pt(6)
        p_cca.paragraph_format.space_after = Pt(10)
        p_cca.add_run().add_picture(str(LOGO_CCA_PATH), width=Inches(2.2))

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(14)
    p_title.paragraph_format.space_after = Pt(16)
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
    p_aut.paragraph_format.space_before = Pt(24)
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
    print("Iniciando compilación de capítulos Markdown a DOCX formal...")
    doc = Document()
    setup_page_geometry(doc)
    build_portada_formal(doc)

    is_first_h1 = True

    for chapter_filename in CHAPTER_FILES:
        chapter_path = DOCS_DIR / chapter_filename
        if not chapter_path.exists():
            print(f"Advertencia: Archivo no encontrado: {chapter_filename}")
            continue

        print(f"Procesando: {chapter_filename}")
        content = chapter_path.read_text(encoding="utf-8")
        lines = content.splitlines()

        is_ref_file = ("12_referencias_bibliograficas.md" in chapter_filename)
        in_chapter_ref_section = False

        table_buffer = []
        code_buffer = []
        in_code_block = False

        for line in lines:
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

            if line.strip().startswith("|") and line.strip().endswith("|"):
                table_buffer.append(line)
                continue
            else:
                if table_buffer:
                    insert_markdown_table(doc, table_buffer)
                    table_buffer = []

            if re.search(r'!\[(.*?)\]\((.*?)\)', line.strip()):
                insert_markdown_image(doc, line.strip(), chapter_path.parent)
                continue

            m_h1 = re.match(r'^#\s+(.+)$', line)
            m_h2 = re.match(r'^##\s+(.+)$', line)
            m_h3 = re.match(r'^###\s+(.+)$', line)
            m_h4 = re.match(r'^####\s+(.+)$', line)

            if m_h1:
                h1_title = m_h1.group(1)
                if is_first_h1:
                    is_first_h1 = False
                elif h1_title.startswith("1. "):
                    doc.add_page_break()
                in_chapter_ref_section = False
                add_styled_heading(doc, h1_title, level=1)
            elif m_h2:
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
                if (is_ref_file or in_chapter_ref_section) and not line.startswith("#"):
                    add_reference_apa(doc, line.strip())
                elif line.strip().startswith("* ") or line.strip().startswith("- "):
                    indent_lvl = 1 if line.startswith("  ") else 0
                    add_styled_bullet(doc, line, indent_level=indent_lvl)
                elif re.match(r'^\d+\.\s+', line.strip()):
                    add_styled_number(doc, line.strip())
                else:
                    add_styled_paragraph(doc, line.strip())

        if table_buffer:
            insert_markdown_table(doc, table_buffer)

    print(f"Guardando documento DOCX en: {DOCX_OUT}")
    doc.save(str(DOCX_OUT))
    print("DOCX generado exitosamente.")

    if "--pdf" in sys.argv:
        print("Intentando generar versión PDF sincronizada...")
        try:
            from docx2pdf import convert
            convert(str(DOCX_OUT), str(PDF_OUT))
            print(f"PDF generado exitosamente en: {PDF_OUT}")
        except Exception as error:
            print(f"Aviso en conversión PDF: {error}")
            print("El archivo DOCX maestro está 100% listo para ser exportado a PDF desde Word.")


if __name__ == "__main__":
    compile_all_chapters()
