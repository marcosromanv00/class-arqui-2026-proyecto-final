"""
Script para insertar separadores de sección y badges de herramientas en la presentación final CCA.
Preserva el 100% de las 16 diapositivas editadas manualmente por el usuario.
"""
import copy
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN

# Rutas
PPTX_IN = Path('docs/presentacion/Presentacion_Final_CCA_UNA.pptx')
PPTX_OUT = Path('docs/presentacion/Presentacion_Final_CCA_UNA.pptx')
BADGES_DIR = Path('tools/assets_logos')

# Paleta editorial
COLOR_BG = RGBColor(0xFA, 0xFA, 0xF9)        # Neutral light background
COLOR_CARMIN = RGBColor(0x99, 0x1B, 0x1B)    # Brand carmin
COLOR_GRAPHITE = RGBColor(0x09, 0x09, 0x0B)  # Main text ink
COLOR_MUTED = RGBColor(0x52, 0x52, 0x5B)     # Muted text
COLOR_BORDER = RGBColor(0xE4, 0xE4, 0xE7)    # Subtle border
COLOR_CARD = RGBColor(0xFF, 0xFF, 0xFF)      # Pure white card

FONT_HEADING = "Newsreader"
FONT_BODY = "Plus Jakarta Sans"

def build_presentation_with_dividers():
    prs = Presentation(str(PPTX_IN))
    blank_layout = prs.slide_layouts[6]

    # Diccionario de nuevas diapositivas a crear
    # (id_referencia, funcion_constructora)
    
    def apply_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()
        return bg

    def create_agenda_slide():
        s = prs.slides.add_slide(blank_layout)
        apply_bg(s)

        # Header tag
        tb = s.shapes.add_textbox(Inches(1.2), Inches(1.0), Inches(10.9), Inches(0.4))
        p = tb.text_frame.paragraphs[0]
        p.text = "ESTRUCTURA DE LA DEFENSA · CONSULTORÍA EIF-511"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_CARMIN

        # Main title
        tb2 = s.shapes.add_textbox(Inches(1.2), Inches(1.35), Inches(10.9), Inches(0.8))
        p2 = tb2.text_frame.paragraphs[0]
        p2.text = "Agenda Ejecutiva"
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(38)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GRAPHITE

        # 4 Blocks
        blocks = [
            ("01", "Diagnóstico", "Patologías críticas, pérdida de confianza y fricción en el portal anterior."),
            ("02", "Fase 1: Estructura", "Sitemaps macro, modelado en FlowMapp, Octopus y validación en Optimal Workshop."),
            ("03", "Fase 2: Herramientas", "Búsqueda con Algolia, CMS Strapi, Customer Journey Miro y Transaccionalidad."),
            ("04", "Conclusiones", "Resultados cuantitativos SUS (89.5), impacto gremial y hoja de ruta institucional.")
        ]

        card_w = Inches(2.55)
        card_h = Inches(3.6)
        spacing = Inches(0.24)
        start_x = Inches(1.2)
        start_y = Inches(2.5)

        for idx, (num, title, desc) in enumerate(blocks):
            x = start_x + idx * (card_w + spacing)
            card = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, start_y, card_w, card_h)
            card.fill.solid()
            card.fill.fore_color.rgb = COLOR_CARD
            card.line.color.rgb = COLOR_BORDER
            card.line.width = Pt(1)

            tb_card = s.shapes.add_textbox(x + Inches(0.22), start_y + Inches(0.25), card_w - Inches(0.44), card_h - Inches(0.5))
            tf = tb_card.text_frame
            tf.word_wrap = True

            p_num = tf.paragraphs[0]
            p_num.text = num
            p_num.font.name = FONT_BODY
            p_num.font.size = Pt(13)
            p_num.font.bold = True
            p_num.font.color.rgb = COLOR_CARMIN
            p_num.space_after = Pt(14)

            p_title = tf.add_paragraph()
            p_title.text = title
            p_title.font.name = FONT_HEADING
            p_title.font.size = Pt(20)
            p_title.font.bold = True
            p_title.font.color.rgb = COLOR_GRAPHITE
            p_title.space_after = Pt(10)

            p_desc = tf.add_paragraph()
            p_desc.text = desc
            p_desc.font.name = FONT_BODY
            p_desc.font.size = Pt(11)
            p_desc.font.color.rgb = COLOR_MUTED

        return s

    def create_section_divider(number_str, title_str, subtitle_str):
        s = prs.slides.add_slide(blank_layout)
        apply_bg(s)

        # Container box centered vertically
        tb = s.shapes.add_textbox(Inches(1.5), Inches(2.2), Inches(10.3), Inches(3.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p_num = tf.paragraphs[0]
        p_num.text = f"SECCIÓN {number_str}".upper()
        p_num.font.name = FONT_BODY
        p_num.font.size = Pt(12)
        p_num.font.bold = True
        p_num.font.color.rgb = COLOR_CARMIN
        p_num.space_after = Pt(16)

        p_title = tf.add_paragraph()
        p_title.text = title_str
        p_title.font.name = FONT_HEADING
        p_title.font.size = Pt(54)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_GRAPHITE
        p_title.space_after = Pt(16)

        p_sub = tf.add_paragraph()
        p_sub.text = subtitle_str
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(16)
        p_sub.font.color.rgb = COLOR_MUTED

        # Accent bar
        bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.5), Inches(2.0), Inches(0.8), Inches(0.08))
        bar.fill.solid()
        bar.fill.fore_color.rgb = COLOR_CARMIN
        bar.line.fill.background()

        return s

    def create_tool_divider(badge_filename, tool_name, phrase_short, detail_str, section_tag="HERRAMIENTA CLAVE · AVANCE 2"):
        s = prs.slides.add_slide(blank_layout)
        apply_bg(s)

        # Center card container
        card_w = Inches(10.3)
        card_h = Inches(4.5)
        card_x = Inches(1.5)
        card_y = Inches(1.5)

        card = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, card_y, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER
        card.line.width = Pt(1)

        # Badge image on the left
        badge_path = BADGES_DIR / badge_filename
        if badge_path.exists():
            s.shapes.add_picture(str(badge_path), card_x + Inches(0.8), card_y + Inches(1.15), Inches(2.2), Inches(2.2))

        # Text box on the right
        text_x = card_x + Inches(3.4)
        text_w = card_w - Inches(3.8)
        tb = s.shapes.add_textbox(text_x, card_y + Inches(0.7), text_w, Inches(3.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p_tag = tf.paragraphs[0]
        p_tag.text = section_tag.upper()
        p_tag.font.name = FONT_BODY
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = COLOR_CARMIN
        p_tag.space_after = Pt(12)

        p_name = tf.add_paragraph()
        p_name.text = tool_name
        p_name.font.name = FONT_HEADING
        p_name.font.size = Pt(44)
        p_name.font.bold = True
        p_name.font.color.rgb = COLOR_GRAPHITE
        p_name.space_after = Pt(12)

        p_phrase = tf.add_paragraph()
        p_phrase.text = phrase_short
        p_phrase.font.name = FONT_BODY
        p_phrase.font.size = Pt(18)
        p_phrase.font.bold = True
        p_phrase.font.color.rgb = COLOR_GRAPHITE
        p_phrase.space_after = Pt(12)

        p_detail = tf.add_paragraph()
        p_detail.text = detail_str
        p_detail.font.name = FONT_BODY
        p_detail.font.size = Pt(13)
        p_detail.font.color.rgb = COLOR_MUTED

        return s

    # 1. Crear las slides nuevas al final
    s_agenda = create_agenda_slide()
    s_diag = create_section_divider("01", "Diagnóstico", "Patologías de arquitectura en el sitio previo (camaraalajuela.com) y pérdida de confianza gremial.")
    s_fase1 = create_section_divider("02", "Fase 1: Mapeo y Validación", "Estructuración en FlowMapp, bloques Octopus y validación con usuarios en Optimal Workshop.")
    s_fase2 = create_section_divider("03", "Fase 2: Arquitectura y Herramientas", "Despliegue de capacidades de búsqueda, contenido desacoplado, mapeo de experiencia y pagos.")
    
    # Herramientas
    s_algolia = create_tool_divider("algolia_badge.png", "Algolia Search", "Búsqueda predictiva ultrarrápida (< 18 ms) para el Directorio Comercial.", "Indexación facetada de los 171 asociados reales, tolerancia a erratas y analítica de consultas sin resultados.")
    s_strapi = create_tool_divider("strapi_badge.png", "Strapi Headless CMS", "Gobernanza editorial con esquemas y vocabularios controlados.", "Arquitectura desacoplada para gestión autónoma de asociados, vacantes y convenios con validación estricta.")
    s_miro = create_tool_divider("miro_badge.png", "Miro CJM", "Mapeo del viaje del usuario y resolución de barreras de afiliación.", "Matriz 5x5 para auditar puntos de contacto, reducir fricción y diseñar la estrategia omnicanal.")
    
    s_fase3 = create_section_divider("04", "Laboratorio e Implementación", "Prototipo interactivo Next.js 16 para validar la arquitectura en condiciones operativas reales.")
    s_concl = create_section_divider("05", "Conclusiones y Resultados", "Evaluación cuantitativa SUS (89.5 pts), retorno de confianza y hoja de ruta estratégica.")

    # Mapeo de IDs originales (las primeras 16 slides)
    sldIdLst = prs.slides._sldIdLst
    orig_ids = [s.id for s in sldIdLst[:16]]

    # Las 9 nuevas slides son las últimas 9 añadidas
    new_slides = [s_agenda, s_diag, s_fase1, s_fase2, s_algolia, s_strapi, s_miro, s_fase3, s_concl]
    new_elements = list(sldIdLst[16:])

    # Estructura del nuevo orden deseado:
    # 0: Slide 1 (Portada original)
    # 1: Agenda (NUEVA)
    # 2: Diagnóstico (NUEVA)
    # 3..6: Slides 2, 3, 4, 5 (Originales de diagnóstico)
    # 7: Fase 1 (NUEVA)
    # 8..10: Slides 6, 7, 8 (Originales de Fase 1: FlowMapp, Optimal, Polijerarquía)
    # 11: Fase 2 (NUEVA)
    # 12: Algolia (NUEVA)
    # 13: Slide 9 (Original: Búsqueda predictiva)
    # 14: Strapi (NUEVA)
    # 15: Slide 10 (Original: Gobernanza de contenido)
    # 16: Miro (NUEVA)
    # 17: Slide 11 (Original: Customer Journey y Transaccionalidad)
    # 18: Laboratorio e Implementación (NUEVA)
    # 19..21: Slides 12, 13, 14 (Originales de implementación: Portada, Directorio/Empleo, Afiliación)
    # 22: Conclusiones y Resultados (NUEVA)
    # 23..24: Slides 15, 16 (Originales: SUS 89.5, Conclusiones)

    desired_sequence = [
        ('orig', 0),            # Slide 1: Portada
        ('new', 0),             # Agenda macro (s_agenda)
        ('new', 1),             # Intro: Diagnóstico (s_diag)
        ('orig', 1),            # Slide 2: Brecha y contexto
        ('orig', 2),            # Slide 3: Portada y navegación
        ('orig', 3),            # Slide 4: Etiquetado
        ('orig', 4),            # Slide 5: Módulos vacíos
        ('new', 2),             # Intro: Fase 1 (s_fase1)
        ('orig', 5),            # Slide 6: FlowMapp y Octopus
        ('orig', 6),            # Slide 7: Optimal Workshop
        ('orig', 7),            # Slide 8: Polijerarquía
        ('new', 3),             # Intro: Fase 2 (s_fase2)
        ('new', 4),             # Intro Herramienta: Algolia (s_algolia)
        ('orig', 8),            # Slide 9: Sistema de búsqueda
        ('new', 5),             # Intro Herramienta: Strapi (s_strapi)
        ('orig', 9),            # Slide 10: Gobernanza de contenido
        ('new', 6),             # Intro Herramienta: Miro (s_miro)
        ('orig', 10),           # Slide 11: Customer Journey
        ('new', 7),             # Intro: Laboratorio e Implementación (s_fase3)
        ('orig', 11),           # Slide 12: Portada prototipo
        ('orig', 12),           # Slide 13: Directorio y Empleo
        ('orig', 13),           # Slide 14: Proceso transaccional
        ('new', 8),             # Intro: Conclusiones (s_concl)
        ('orig', 14),           # Slide 15: Métricas SUS (89.5)
        ('orig', 15),           # Slide 16: Cierre institucional
    ]

    # Construir lista de sldId según la secuencia deseada
    final_sldId_elements = []
    
    # Mapa de elementos existentes
    orig_elem_map = {i: sldIdLst[i] for i in range(16)}
    new_elem_map = {i: elem for i, elem in enumerate(new_elements)}

    for kind, ref in desired_sequence:
        if kind == 'orig':
            final_sldId_elements.append(orig_elem_map[ref])
        else:
            final_sldId_elements.append(new_elem_map[ref])

    # Reemplazar la lista interna de slides en el XML de la presentación
    # Limpiamos sldIdLst y volvemos a insertar en el orden exacto
    for elem in list(sldIdLst):
        sldIdLst.remove(elem)
    
    for elem in final_sldId_elements:
        sldIdLst.append(elem)

    # Guardar
    prs.save(str(PPTX_OUT))
    print(f"Presentación actualizada exitosamente con {len(desired_sequence)} diapositivas en {PPTX_OUT}")

if __name__ == '__main__':
    build_presentation_with_dividers()
