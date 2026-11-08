"""
Configuración de Estilos y Geometría APA 7 Sencillo (Escala de Grises) para python-docx
Cámara de Comercio de Alajuela (CCA) - Proyecto Final EIF-511 UNA
Formato: Arial 12 pt, Justificado, Escala de Grises, Tablas con bordes definidos
"""

import os
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

# Paleta Estricta en Escala de Grises
COLOR_BLACK = RGBColor(0x00, 0x00, 0x00)       # Negro puro para texto principal
COLOR_DARK_GRAY = RGBColor(0x22, 0x22, 0x22)   # Gris muy oscuro para encabezados secundarios
COLOR_MID_GRAY = RGBColor(0x44, 0x44, 0x44)    # Gris medio para subtítulos y notas
COLOR_MUTED = RGBColor(0x66, 0x66, 0x66)       # Gris para encabezados de página y notas al pie

def setup_page_geometry(doc):
    """Configura márgenes estándar APA 7 (1 pulgada = 2.54 cm en los 4 lados) y paginación en escala de grises."""
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        section.different_first_page_header_footer = True
        
        header = section.header
        p = header.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p.paragraph_format.space_after = Pt(6)
        
        r_head = p.add_run("EIF-511 Arquitectura de Información | Proyecto Integrador Final · CCA  |  Pág. ")
        r_head.font.name = "Arial"
        r_head.font.size = Pt(9)
        r_head.font.color.rgb = COLOR_MUTED
        
        # Campo XML de número de página dinámico
        run_pg = p.add_run()
        fld_begin = parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="begin"/>')
        fld_inst = parse_xml(f'<w:instrText {nsdecls("w")} xml:space="preserve"> PAGE </w:instrText>')
        fld_sep = parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="separate"/>')
        fld_end = parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="end"/>')
        run_pg._r.extend([fld_begin, fld_inst, fld_sep, fld_end])
        run_pg.font.name = "Arial"
        run_pg.font.size = Pt(9)
        run_pg.font.color.rgb = COLOR_MUTED

def set_cell_background(cell, fill_hex):
    """Aplica sombreado de fondo en escala de grises a una celda."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
    """Configura padding interno de las celdas en dxa (1 pt = 20 dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def format_apa_table(table, header_bg="E5E7EB", row_alt_bg="F9FAFB"):
    """
    Aplica formato en escala de grises con bordes definidos sencillos para todas las celdas.
    Cabecera en gris claro (E5E7EB) con texto en negrita y bordes finos estándar.
    """
    tblPr = table._tbl.tblPr
    # Bordes generales de la tabla: líneas sencillas y definidas en gris oscuro (4B5563)
    borders = parse_xml(f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="6" w:space="0" w:color="4B5563"/>
            <w:left w:val="single" w:sz="6" w:space="0" w:color="4B5563"/>
            <w:bottom w:val="single" w:sz="6" w:space="0" w:color="4B5563"/>
            <w:right w:val="single" w:sz="6" w:space="0" w:color="4B5563"/>
            <w:insideH w:val="single" w:sz="4" w:space="0" w:color="9CA3AF"/>
            <w:insideV w:val="single" w:sz="4" w:space="0" w:color="9CA3AF"/>
        </w:tblBorders>
    ''')
    tblPr.append(borders)
    
    # Cabecera
    for cell in table.rows[0].cells:
        set_cell_background(cell, header_bg)
        set_cell_margins(cell, top=140, bottom=140, left=160, right=160)
        for p in cell.paragraphs:
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for r in p.runs:
                r.font.bold = True
                r.font.name = "Arial"
                r.font.size = Pt(10)
                r.font.color.rgb = COLOR_BLACK

    # Filas de datos
    for row_idx, row in enumerate(table.rows[1:], start=1):
        bg = row_alt_bg if row_idx % 2 == 1 else "FFFFFF"
        for cell in row.cells:
            if bg != "FFFFFF":
                set_cell_background(cell, bg)
            set_cell_margins(cell, top=120, bottom=120, left=160, right=160)
            for p in cell.paragraphs:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                for r in p.runs:
                    r.font.name = "Arial"
                    r.font.size = Pt(10)
                    r.font.color.rgb = COLOR_DARK_GRAY

def add_callout(doc, text, title="Especificación Técnica"):
    """Inserta un cuadro destacado en escala de grises con borde izquierdo sencillo."""
    tbl = doc.add_table(rows=1, cols=1)
    tbl.autofit = False
    tbl.columns[0].width = Inches(6.5)
    cell = tbl.rows[0].cells[0]
    set_cell_background(cell, "F3F4F6")
    set_cell_margins(cell, top=140, bottom=140, left=200, right=200)
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:left w:val="single" w:sz="24" w:space="0" w:color="374151"/>
            <w:bottom w:val="none"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(tcBorders)
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    r_t = p.add_run(f"■ {title}\n")
    r_t.font.name = "Arial"
    r_t.font.bold = True
    r_t.font.size = Pt(10.5)
    r_t.font.color.rgb = COLOR_BLACK
    r_c = p.add_run(text)
    r_c.font.name = "Arial"
    r_c.font.size = Pt(10)
    r_c.font.italic = False
    r_c.font.color.rgb = COLOR_DARK_GRAY
    doc.add_paragraph()

def add_apa_table_title(doc, number, title):
    """Título formal APA 7 en escala de grises."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(2)
    r_num = p.add_run(f"Tabla {number}.\n")
    r_num.font.bold = True
    r_num.font.name = "Arial"
    r_num.font.size = Pt(10.5)
    r_num.font.color.rgb = COLOR_BLACK
    r_title = p.add_run(title)
    r_title.font.italic = True
    r_title.font.name = "Arial"
    r_title.font.size = Pt(10.5)
    r_title.font.color.rgb = COLOR_DARK_GRAY
