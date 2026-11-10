"""
Script para insertar separadores de sección, badges de herramientas y el módulo de Asistente RAG con IA
en la presentación final CCA.
Preserva el 100% de las diapositivas editadas manualmente por el usuario.
"""
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

PPTX_BASE_ORIGINAL = Path('docs/presentacion/Presentacion_Final_CCA_UNA_MANUAL_5_29MB.pptx')
PPTX_OUT = Path('docs/presentacion/Presentacion_Final_CCA_UNA.pptx')
BADGES_DIR = Path('tools/assets_logos')

COLOR_BG = RGBColor(0xFA, 0xFA, 0xF9)
COLOR_CARMIN = RGBColor(0x99, 0x1B, 0x1B)
COLOR_GRAPHITE = RGBColor(0x09, 0x09, 0x0B)
COLOR_MUTED = RGBColor(0x52, 0x52, 0x5B)
COLOR_BORDER = RGBColor(0xE4, 0xE4, 0xE7)
COLOR_CARD = RGBColor(0xFF, 0xFF, 0xFF)

FONT_HEADING = "Newsreader"
FONT_BODY = "Plus Jakarta Sans"

def build_presentation_full():
    prs = Presentation(str(PPTX_BASE_ORIGINAL))
    blank_layout = prs.slide_layouts[6]

    def apply_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()
        return bg

    def create_agenda_slide():
        s = prs.slides.add_slide(blank_layout)
        apply_bg(s)

        tb = s.shapes.add_textbox(Inches(1.2), Inches(1.0), Inches(10.9), Inches(0.4))
        p = tb.text_frame.paragraphs[0]
        p.text = "ESTRUCTURA DE LA DEFENSA · CONSULTORÍA EIF-511"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_CARMIN

        tb2 = s.shapes.add_textbox(Inches(1.2), Inches(1.35), Inches(10.9), Inches(0.8))
        p2 = tb2.text_frame.paragraphs[0]
        p2.text = "Agenda Ejecutiva"
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(38)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GRAPHITE

        blocks = [
            ("01", "Diagnóstico", "Patologías críticas, pérdida de confianza y fricción en el portal anterior."),
            ("02", "Fase 1: Estructura", "Sitemaps macro, modelado en FlowMapp, Octopus y validación en Optimal Workshop."),
            ("03", "Fase 2: Herramientas", "Búsqueda con Algolia, CMS Strapi, Customer Journey Miro, Asistente RAG y SINPE."),
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

        bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.5), Inches(2.0), Inches(0.8), Inches(0.08))
        bar.fill.solid()
        bar.fill.fore_color.rgb = COLOR_CARMIN
        bar.line.fill.background()

        return s

    def create_tool_divider(badge_filename, tool_name, phrase_short, detail_str, section_tag="HERRAMIENTA CLAVE · AVANCE 2"):
        s = prs.slides.add_slide(blank_layout)
        apply_bg(s)

        card_w = Inches(10.3)
        card_h = Inches(4.5)
        card_x = Inches(1.5)
        card_y = Inches(1.5)

        card = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, card_y, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER
        card.line.width = Pt(1)

        badge_path = BADGES_DIR / badge_filename
        if badge_path.exists():
            s.shapes.add_picture(str(badge_path), card_x + Inches(0.8), card_y + Inches(1.15), Inches(2.2), Inches(2.2))

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

    def create_rag_content_slide():
        """Slide de contenido demostrativo para el Asistente RAG con IA"""
        s = prs.slides.add_slide(blank_layout)
        apply_bg(s)

        # Header standard
        tb = s.shapes.add_textbox(Inches(0.9), Inches(0.55), Inches(11.5), Inches(0.35))
        p = tb.text_frame.paragraphs[0]
        p.text = "¿QUÉ USAMOS? · INTELIGENCIA ARTIFICIAL & RAG"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = COLOR_CARMIN

        tb2 = s.shapes.add_textbox(Inches(0.9), Inches(0.9), Inches(11.5), Inches(0.75))
        p2 = tb2.text_frame.paragraphs[0]
        p2.text = "Asistente institucional fundamentado con cero alucinaciones"
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(26)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GRAPHITE

        tb3 = s.shapes.add_textbox(Inches(0.9), Inches(1.65), Inches(11.5), Inches(0.45))
        p3 = tb3.text_frame.paragraphs[0]
        p3.text = "Indexación vectorial de estatutos y leyes comerciales (RAC Ley 7727 y Renta Ley 7092) para resolver dudas en lenguaje natural."
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13.5)
        p3.font.color.rgb = COLOR_MUTED

        # 3 Cards de columnas
        cards_data = [
            ("Recuperación Vectorial", "Similitud Coseno con Bigramas", "El motor en Python (`rag_asistente_cca.py`) vectoriza el corpus normativo oficial sin depender de servidores externos de pago ($0.00/mes)."),
            ("Cero Alucinación", "Umbral Estricto de Seguridad", "Si una consulta no alcanza el score mínimo (0.15), el sistema se abstiene éticamente y deriva a un asesor humano por WhatsApp."),
            ("Atribución Jurídica", "Certeza en Trámites y Cuotas", "Cada respuesta cita textualmente el artículo de ley o estatuto de respaldo, garantizando rigor institucional ante los comerciantes.")
        ]

        card_w = Inches(3.64)
        card_h = Inches(4.3)
        spacing = Inches(0.28)
        start_x = Inches(0.9)
        start_y = Inches(2.35)

        for idx, (title, tech, desc) in enumerate(cards_data):
            x = start_x + idx * (card_w + spacing)
            card = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, start_y, card_w, card_h)
            card.fill.solid()
            card.fill.fore_color.rgb = COLOR_CARD
            card.line.color.rgb = COLOR_BORDER
            card.line.width = Pt(1)

            tb_c = s.shapes.add_textbox(x + Inches(0.3), start_y + Inches(0.35), card_w - Inches(0.6), card_h - Inches(0.7))
            tf = tb_c.text_frame
            tf.word_wrap = True

            pt = tf.paragraphs[0]
            pt.text = title
            pt.font.name = FONT_HEADING
            pt.font.size = Pt(20)
            pt.font.bold = True
            pt.font.color.rgb = COLOR_GRAPHITE
            pt.space_after = Pt(8)

            ptech = tf.add_paragraph()
            ptech.text = tech
            ptech.font.name = FONT_BODY
            ptech.font.size = Pt(12)
            ptech.font.bold = True
            ptech.font.color.rgb = COLOR_CARMIN
            ptech.space_after = Pt(14)

            pdesc = tf.add_paragraph()
            pdesc.text = desc
            pdesc.font.name = FONT_BODY
            pdesc.font.size = Pt(13)
            pdesc.font.color.rgb = COLOR_MUTED

        return s

    # Construir las slides
    s_agenda = create_agenda_slide()
    s_diag = create_section_divider("01", "Diagnóstico", "Patologías de arquitectura en el sitio previo (camaraalajuela.com) y pérdida de confianza gremial.")
    s_fase1 = create_section_divider("02", "Fase 1: Mapeo y Validación", "Estructuración en FlowMapp, bloques Octopus y validación con usuarios en Optimal Workshop.")
    s_fase2 = create_section_divider("03", "Fase 2: Arquitectura y Herramientas", "Despliegue de capacidades de búsqueda, contenido desacoplado, mapeo de experiencia, IA y pagos.")
    
    # Herramientas del Avance 2
    s_algolia = create_tool_divider("algolia_badge.png", "Algolia Search", "Búsqueda predictiva ultrarrápida (< 18 ms) para el Directorio Comercial.", "Indexación facetada de los 171 asociados reales, tolerancia a erratas y analítica de consultas sin resultados.")
    s_strapi = create_tool_divider("strapi_badge.png", "Strapi Headless CMS", "Gobernanza editorial con esquemas y vocabularios controlados.", "Arquitectura desacoplada para gestión autónoma de asociados, vacantes y convenios con validación estricta.")
    s_miro = create_tool_divider("miro_badge.png", "Miro CJM", "Mapeo del viaje del usuario y resolución de barreras de afiliación.", "Matriz 5x5 para auditar puntos de contacto, reducir fricción y diseñar la estrategia omnicanal.")
    
    # NUEVA HERRAMIENTA IA:
    s_rag_intro = create_tool_divider("rag_ia_badge.png", "Asistente RAG con IA", "Recuperación contextual con base jurídica oficial y cero alucinaciones.", "Pipeline en Python con TF-IDF y similitud coseno sobre el corpus de leyes, estatutos y reglamentos de la CCA.")
    s_rag_content = create_rag_content_slide()

    s_fase3 = create_section_divider("04", "Laboratorio e Implementación", "Prototipo interactivo Next.js 16 para validar la arquitectura en condiciones operativas reales.")
    s_concl = create_section_divider("05", "Conclusiones y Resultados", "Evaluación cuantitativa SUS (89.5 pts), retorno de confianza y hoja de ruta estratégica.")

    sldIdLst = prs.slides._sldIdLst
    orig_elements = list(sldIdLst[:16])
    new_elements = list(sldIdLst[16:])

    # Secuencia completa: 16 originales + 11 nuevas = 27 diapositivas
    desired_sequence = [
        ('orig', 0),            # 1. Portada
        ('new', 0),             # 2. Agenda macro (s_agenda)
        ('new', 1),             # 3. Intro: Diagnóstico (s_diag)
        ('orig', 1),            # 4. Brecha y contexto
        ('orig', 2),            # 5. Portada y navegación
        ('orig', 3),            # 6. Etiquetado
        ('orig', 4),            # 7. Módulos vacíos
        ('new', 2),             # 8. Intro: Fase 1 (s_fase1)
        ('orig', 5),            # 9. FlowMapp y Octopus
        ('orig', 6),            # 10. Optimal Workshop
        ('orig', 7),            # 11. Polijerarquía
        ('new', 3),             # 12. Intro: Fase 2 (s_fase2)
        ('new', 4),             # 13. Intro Herramienta: Algolia (s_algolia)
        ('orig', 8),            # 14. Sistema de búsqueda
        ('new', 5),             # 15. Intro Herramienta: Strapi (s_strapi)
        ('orig', 9),            # 16. Gobernanza de contenido
        ('new', 6),             # 17. Intro Herramienta: Miro (s_miro)
        ('orig', 10),           # 18. Customer Journey
        ('new', 7),             # 19. Intro Herramienta: Asistente RAG con IA (s_rag_intro)
        ('new', 8),             # 20. Contenido: Asistente RAG con IA (s_rag_content)
        ('new', 9),             # 21. Intro: Laboratorio e Implementación (s_fase3)
        ('orig', 11),           # 22. Portada prototipo
        ('orig', 12),           # 23. Directorio y Empleo
        ('orig', 13),           # 24. Proceso transaccional
        ('new', 10),            # 25. Intro: Conclusiones (s_concl)
        ('orig', 14),           # 26. Métricas SUS (89.5)
        ('orig', 15),           # 27. Cierre institucional
    ]

    final_sldId_elements = []
    for kind, idx in desired_sequence:
        if kind == 'orig':
            final_sldId_elements.append(orig_elements[idx])
        else:
            final_sldId_elements.append(new_elements[idx])

    for elem in list(sldIdLst):
        sldIdLst.remove(elem)
    for elem in final_sldId_elements:
        sldIdLst.append(elem)

    prs.save(str(PPTX_OUT))
    print(f"Presentación final armada con {len(desired_sequence)} diapositivas en {PPTX_OUT}")

if __name__ == '__main__':
    build_presentation_full()
