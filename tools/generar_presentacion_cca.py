"""
Generador de Presentación Ejecutiva Minimalista (16:9 Widescreen)
Cámara de Comercio de Alajuela (CCA) - Proyecto Final EIF-511 UNA
Enfoque: Storytelling cercano, Anti-Slop, Escaneo Rápido (Regla de los 3 segundos)
Paleta: Rojo Carmín (#991B1B), Negro Grafito (#09090B), Fondo Blanco/Neutro (#FFFFFF / #F8FAFC)
"""

import os
from pathlib import Path
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# Directorios de salida
BASE_DIR = Path(__file__).resolve().parent.parent
DOCS_PRESENTACION = BASE_DIR / "docs" / "presentacion"
DOCS_PRESENTACION.mkdir(parents=True, exist_ok=True)

PPTX_OUT_LOCAL = DOCS_PRESENTACION / "Presentacion_Final_CCA_UNA.pptx"
PPTX_OUT_DRIVE_ROOT = BASE_DIR / "DRIVE_ENTREGA_FINAL_CCA_ACTUALIZADA" / "Presentacion_Final_CCA_UNA.pptx"
PPTX_OUT_DRIVE_MARCOS = BASE_DIR / "DRIVE_ENTREGA_FINAL_CCA_ACTUALIZADA" / "03_Marcos_Roman" / "presentacion_ppt" / "Presentacion_Final_CCA_UNA.pptx"

# Paleta Cromática Semántica
COLOR_BG = RGBColor(0xFA, 0xFA, 0xF9)        # Fondo neutro suave (#FAFAF9)
COLOR_CARD_BG = RGBColor(0xFF, 0xFF, 0xFF)   # Tarjeta blanca (#FFFFFF)
COLOR_CARD_BORDER = RGBColor(0xE4, 0xE4, 0xE7) # Borde sutil (#E4E4E7)
COLOR_GRAPHITE = RGBColor(0x09, 0x09, 0x0B)  # Texto oscuro (#09090B)
COLOR_CARMIN = RGBColor(0x99, 0x1B, 0x1B)    # Rojo Carmín CCA (#991B1B)
COLOR_RED_BRIGHT = RGBColor(0xB9, 0x1C, 0x1C)# Rojo acento (#B91C1C)
COLOR_MUTED = RGBColor(0x71, 0x71, 0x7A)     # Gris texto secundario (#71717A)
COLOR_TAG_BG = RGBColor(0xFE, 0xE2, 0xE2)    # Fondo de etiqueta (#FEE2E2)

FONT_HEADING = "Arial"
FONT_BODY = "Arial"

def create_presentation():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5) # Widescreen 16:9
    blank_layout = prs.slide_layouts[6] # Blank slide
    
    def apply_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background() # sin borde
        return bg

    def add_header(slide, tag_text, title_text, subtitle_text=None):
        # Etiqueta / Categoría
        tb_tag = slide.shapes.add_textbox(Inches(0.9), Inches(0.6), Inches(11.5), Inches(0.4))
        p_tag = tb_tag.text_frame.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.name = FONT_HEADING
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = COLOR_CARMIN
        
        # Título de Acción (Glance Test)
        tb_title = slide.shapes.add_textbox(Inches(0.9), Inches(0.95), Inches(11.5), Inches(0.8))
        p_title = tb_title.text_frame.paragraphs[0]
        p_title.text = title_text
        p_title.font.name = FONT_HEADING
        p_title.font.size = Pt(28)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_GRAPHITE
        
        if subtitle_text:
            tb_sub = slide.shapes.add_textbox(Inches(0.9), Inches(1.75), Inches(11.5), Inches(0.4))
            p_sub = tb_sub.text_frame.paragraphs[0]
            p_sub.text = subtitle_text
            p_sub.font.name = FONT_BODY
            p_sub.font.size = Pt(14)
            p_sub.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 1: PORTADA
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_background(s1)
    
    # Barra de acento carmín superior sutil
    bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(1.2), Inches(0.6), Inches(0.08))
    bar.fill.solid()
    bar.fill.fore_color.rgb = COLOR_CARMIN
    bar.line.fill.background()

    tb1 = s1.shapes.add_textbox(Inches(0.9), Inches(1.5), Inches(11.5), Inches(3.2))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    
    p_inst = tf1.paragraphs[0]
    p_inst.text = "UNIVERSIDAD NACIONAL DE COSTA RICA · CURSO EIF-511 ARQUITECTURA DE INFORMACIÓN"
    p_inst.font.name = FONT_HEADING
    p_inst.font.size = Pt(11)
    p_inst.font.bold = True
    p_inst.font.color.rgb = COLOR_MUTED
    p_inst.space_after = Pt(16)
    
    p_h1 = tf1.add_paragraph()
    p_h1.text = "Por el comercio.\nPor Alajuela."
    p_h1.font.name = FONT_HEADING
    p_h1.font.size = Pt(48)
    p_h1.font.bold = True
    p_h1.font.color.rgb = COLOR_GRAPHITE
    p_h1.space_after = Pt(16)
    
    p_sub = tf1.add_paragraph()
    p_sub.text = "Reingeniería de Arquitectura de Información para el Portal Digital de la Cámara de Comercio de Alajuela"
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(18)
    p_sub.font.color.rgb = COLOR_CARMIN

    # Tarjeta de metadatos de equipo
    meta_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(5.4), Inches(11.5), Inches(1.3))
    meta_box.fill.solid()
    meta_box.fill.fore_color.rgb = COLOR_CARD_BG
    meta_box.line.color.rgb = COLOR_CARD_BORDER
    meta_tf = meta_box.text_frame
    meta_tf.word_wrap = True
    p_m1 = meta_tf.paragraphs[0]
    p_m1.text = "Equipo Consultor: Marcos Román Valverde (Coord.) · Emanuel Soto · Allan Arce"
    p_m1.font.name = FONT_HEADING
    p_m1.font.size = Pt(13)
    p_m1.font.bold = True
    p_m1.font.color.rgb = COLOR_GRAPHITE
    
    p_m2 = meta_tf.add_paragraph()
    p_m2.text = "Docente: MSc. Cynthia Bolaños Espinoza · II Ciclo 2026 · Proyecto Integrador Final (30%)"
    p_m2.font.name = FONT_BODY
    p_m2.font.size = Pt(12)
    p_m2.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 2: EL CONTEXTO HISTÓRICO Y LA BRECHA
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_background(s2)
    add_header(s2, "01. Contexto & Punto de Partida", 
               "Una institución de 43 años con un portal que alejaba a sus propios socios",
               "La Cámara nació en 1983 para respaldar al comerciante. En internet, ocurría exactamente lo opuesto.")

    cards_data_s2 = [
        ("1983", "AÑO DE FUNDACIÓN", "Más de cuatro décadas defendiendo al comercio formal, MIPYMES y zonas francas de Alajuela."),
        ("16", "CANTONES DE INFLUENCIA", "Representación estratégica provincial desde Alajuela Centro hasta El Coyol, Grecia y San Ramón."),
        ("4", "CLICS CIEGOS PREVIOS", "El portal anterior forzaba al usuario a adivinar categorías ocultas para encontrar un simple número de teléfono.")
    ]
    for idx, (num, label, desc) in enumerate(cards_data_s2):
        x = Inches(0.9 + idx * 3.9)
        c = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = num
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(48)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_CARMIN
        p1.space_after = Pt(4)
        
        p2 = ctf.add_paragraph()
        p2.text = label
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GRAPHITE
        p2.space_after = Pt(12)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 3: EL CONFLICTO HUMANO (DON CARLOS Y VALERIA)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_background(s3)
    add_header(s3, "02. La Fricción Humana", 
               "Dos realidades alajuelenses frente a un muro digital",
               "La mala arquitectura no es un tecnicismo: es tiempo perdido y frustración real para quienes generan empleo.")

    profiles = [
        ("Don Carlos Alvarado · 52 años", "COMERCIANTE TRADICIONAL (Calle Ancha, Alajuela Centro)",
         "Ferretero desde hace 12 años. Quería publicar una plaza de bodeguero en la bolsa de empleo.",
         "Fricción previa: La sección /oferentes/ mostraba error de base de datos vacía. Terminaba viajando en bus a dejar un papel a la sede física.",
         "Solución: Acceso directo a Bolsa de Empleo a 1 clic y confirmación asistida vía WhatsApp corporativo."),
        ("Licda. Valeria Brenes · 29 años", "EMPRENDEDORA DIGITAL (La Guácima)",
         "Cofundadora de agencia cloud. Quería afiliar su empresa y obtener el sello formal de la Cámara.",
         "Fricción previa: Precios ocultos. El único enlace era un PDF huérfano de 62 KB para imprimir a mano.",
         "Solución: Wizard de afiliación 100% digital en 3 minutos, pago con SINPE Móvil y ahorro deducible de renta (Ley 7092).")
    ]
    for idx, (title, tag, bio, pain, sol) in enumerate(profiles):
        x = Inches(0.9 + idx * 5.9)
        c = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(5.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = title
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(18)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        
        p2 = ctf.add_paragraph()
        p2.text = tag
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_CARMIN
        p2.space_after = Pt(10)
        
        p3 = ctf.add_paragraph()
        p3.text = bio
        p3.font.name = FONT_BODY
        p3.font.size = Pt(12)
        p3.font.color.rgb = COLOR_MUTED
        p3.space_after = Pt(8)
        
        p4 = ctf.add_paragraph()
        p4.text = "■ " + pain
        p4.font.name = FONT_BODY
        p4.font.size = Pt(12)
        p4.font.color.rgb = COLOR_GRAPHITE
        p4.space_after = Pt(8)

        p5 = ctf.add_paragraph()
        p5.text = "✓ " + sol
        p5.font.name = FONT_BODY
        p5.font.size = Pt(12)
        p5.font.bold = True
        p5.font.color.rgb = COLOR_CARMIN

    # =========================================================================
    # SLIDE 4: DIAGNÓSTICO FORENSE (LOS 3 PECADOS CAPITALES)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_background(s4)
    add_header(s4, "03. Diagnóstico Heurístico", 
               "Tres patologías críticas destruían la credibilidad del portal",
               "Auditoría técnica sobre el WordPress preexistente basada en Nielsen y Halvorson.")

    flaws = [
        ("Canibalización SEO", "/ vs /home", "La portada existía bajo dos URLs con menús distintos. Confundía a Google y hacía que el visitante sintiera que navegaba en dos webs distintas."),
        ("Secciones Fantasma", "/oferentes/ y /noticias/", "Promesas rotas en el menú principal. El usuario hacía clic y encontraba pantallas en blanco con 'No se encontraron entradas'."),
        ("El Trámite Huérfano", "/documentos/ (PDF 62 KB)", "Cero comercio electrónico. Quien deseaba afiliarse debía descargar un PDF manual, imprimirlo y llevarlo físicamente.")
    ]
    for idx, (title, path, desc) in enumerate(flaws):
        x = Inches(0.9 + idx * 3.9)
        c = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = title
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(18)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        
        p2 = ctf.add_paragraph()
        p2.text = path
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(12)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_CARMIN
        p2.space_after = Pt(14)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 5: EL GIRO CIENTÍFICO (OPTIMAL WORKSHOP N=18)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_background(s5)
    add_header(s5, "04. Validación Empírica", 
               "Dejamos de adivinar: 18 comerciantes reales modelaron la estructura",
               "Subsanación del Avance 1: sustituimos los consensos artificiales por variabilidad real (Kuric et al., 2025).")

    stats = [
        ("N=18", "PARTICIPANTES REALES", "Estratificados en 3 cohortes: Comerciantes tradicionales (7), Profesionales B2B (6) y Emprendedores (5)."),
        ("540", "CLASIFICACIONES", "100% de tasa de completitud en OptimalSort evaluando 30 conceptos representativos de la Cámara."),
        ("72% - 94%", "DISPERSIÓN NATURAL", "Afinidad empírica que desnudó fricciones en patentes, empleo y convenios antes de programar una sola línea.")
    ]
    for idx, (num, label, desc) in enumerate(stats):
        x = Inches(0.9 + idx * 3.9)
        c = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = num
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(44)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_CARMIN
        p1.space_after = Pt(4)
        
        p2 = ctf.add_paragraph()
        p2.text = label
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GRAPHITE
        p2.space_after = Pt(12)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 6: EL HALLAZGO: DE MONO A POLIJERARQUÍA
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_background(s6)
    add_header(s6, "05. Hallazgo Científico", 
               "La rigidez del árbol expulsaba a los usuarios: adoptamos Polijerarquía",
               "Forzar una única ruta lógica provocaba que el 33% de los usuarios no encontrara el servicio (Ladisa et al., 2023).")

    insights = [
        ("Guía de Patente Municipal", "67% en Servicios · 22% en Institucional · 11% en Afiliación",
         "Ubicación canónica en Servicios, pero con accesos cruzados en el formulario de ingreso ('Verifique su patente') y en reglamentos."),
        ("Bolsa de Empleo Cantonal", "50% de perfiles B2B la buscaban vinculada al Directorio",
         "Se elevó a nodo de navegación principal de 1 clic y se enlazó como filtro dentro de las fichas de los comercios afiliados."),
        ("Convenios y Descuentos", "Dividida entre Afiliaciones (beneficio) y Directorio (catálogo)",
         "Catálogo interactivo en el Directorio y cálculo del retorno de inversión (ROI) visible dentro del wizard de afiliación.")
    ]
    for idx, (title, stats_line, desc) in enumerate(insights):
        x = Inches(0.9 + idx * 3.9)
        c = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = title
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(17)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        
        p2 = ctf.add_paragraph()
        p2.text = stats_line
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(10.5)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_CARMIN
        p2.space_after = Pt(12)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 7: LA NUEVA ARQUITECTURA (SITEMAP MACRO)
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_background(s7)
    add_header(s7, "06. Arquitectura Propuesta", 
               "Cinco ramas maestras. Cero callejones sin salida.",
               "Estructura balanceada en 3 niveles de profundidad máxima: ningún contenido vital a más de 2 clics.")

    branches = [
        ("1. Institucional", "/la-camara", "Misión, Junta Directiva, Estatutos transparentes e Historia desde 1983."),
        ("2. Servicios", "/servicios", "Arbitraje Mercantil (Ley 7727), Trámites de Patentes y Convenios."),
        ("3. Directorio", "/directorio", "Buscador facetado por cantón, distintivo verificado CCA y WhatsApp directo."),
        ("4. Bolsa Empleo", "/empleo", "Vacantes activas en El Coyol y Alajuela Centro + formulario de postulación."),
        ("5. Contacto", "/contacto", "Sede en Plaza Tomás Guardia, canal oficial de WhatsApp y Preguntas Frecuentes.")
    ]
    for idx, (title, url, desc) in enumerate(branches):
        x = Inches(0.9 + idx * 2.3)
        c = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(2.15), Inches(3.6))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = title
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        
        p2 = ctf.add_paragraph()
        p2.text = url
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_CARMIN
        p2.space_after = Pt(8)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(11.5)
        p3.font.color.rgb = COLOR_MUTED

    # Botón Call to Action transversal inferior
    cta_box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(6.2), Inches(11.5), Inches(0.75))
    cta_box.fill.solid()
    cta_box.fill.fore_color.rgb = COLOR_CARMIN
    cta_box.line.fill.background()
    cta_tf = cta_box.text_frame
    p_cta = cta_tf.paragraphs[0]
    p_cta.alignment = PP_ALIGN.CENTER
    p_cta.text = "BOTÓN MAGNÉTICO DESTACADO: 'AFILIAR MI EMPRESA' (/afiliarse) — Visible en todo el viewport"
    p_cta.font.name = FONT_HEADING
    p_cta.font.size = Pt(12)
    p_cta.font.bold = True
    p_cta.font.color.rgb = RGBColor(255, 255, 255)

    # =========================================================================
    # SLIDE 8: DISEÑO EDITORIAL ANTI-SLOP
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_background(s8)
    add_header(s8, "07. Sistema de Diseño Visual", 
               "Inspiración editorial ICC: 85% fondo blanco y cero adornos inútiles",
               "Benchmark oficial: International Chamber of Commerce (iccwbo.org). Erradicación de elementos predeterminados de IA.")

    principles = [
        ("Paleta con Identidad Cívica", "Rojo Carmín (#991B1B) + Negro (#09090B)", "Eliminamos los azules genéricos de plantillas. Restauramos los colores oficiales de la Cámara y de la bandera alajuelense."),
        ("Tipografía Asimétrica Serena", "Titulares Newsreader + Inter en interfaz", "Elegancia editorial con jerarquía clara. Prohibido el uso de pesos ultra-pesados que saturan la vista del lector."),
        ("Erradicación de 'AI Slop'", "Cero gradientes morados, cero badges falsos", "Bordes milimétricos de 1px, fotografía documental auténtica de comercio local y espacios negativos que dejan respirar al contenido.")
    ]
    for idx, (title, sub, desc) in enumerate(principles):
        x = Inches(0.9 + idx * 3.9)
        c = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = title
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(17)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        
        p2 = ctf.add_paragraph()
        p2.text = sub
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_CARMIN
        p2.space_after = Pt(14)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 9: EL DIRECTORIO FACETADO INTELIGENTE
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_background(s9)
    add_header(s9, "08. Funcionalidad: Directorio", 
               "Encontrar un taller en El Coyol ahora toma menos de lo que dura un parpadeo",
               "Reducción del tiempo de búsqueda de 2 minutos a 19 segundos mediante indexación instantánea.")

    features = [
        ("Búsqueda Instantánea", "Algolia Search en < 20 ms", "Búsqueda predictiva a medida que se teclea (as-you-type). Tolerancia matemática a errores ortográficos y tildes omitidas."),
        ("Facetas Geográficas y Sector", "Filtro por Cantón y Distrito", "Segmentación territorial exacta en los cantones alajuelenses cruzada con 8 sectores comerciales formales."),
        ("Retorno Tangible de Inversión", "Distintivo CCA + Botón WhatsApp", "Cada ficha exhibe el sello de formalidad, cálculo de descuentos de convenio y llamada o mensaje directo a 1 clic.")
    ]
    for idx, (title, tech, desc) in enumerate(features):
        x = Inches(0.9 + idx * 3.9)
        c = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = title
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(18)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        
        p2 = ctf.add_paragraph()
        p2.text = tech
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_CARMIN
        p2.space_after = Pt(14)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 10: CONVERSIÓN DIGITAL (WIZARD DE AFILIACIÓN SINPE)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    apply_background(s10)
    add_header(s10, "09. Conversión & Finanzas", 
               "Afiliarse ya no requiere papel: 3 minutos y 100% deducible de renta",
               "Transición de un PDF manual de 62 KB a un embudo transaccional fluido de 3 etapas.")

    steps = [
        ("Paso 1: Identificación", "Datos Generales & Cédula Jurídica", "Validación reactiva de datos comerciales y requisitos previos de patente cantonal al día."),
        ("Paso 2: Transparencia Fiscal", "Cálculo de Retorno (Ley 7092)", "Desglose claro de cuota según tamaño de empresa y recordatorio del Art. 8: 100% deducible del impuesto de renta."),
        ("Paso 3: Pago Inmediato", "SINPE Móvil & Folio Digital", "Transferencia al número oficial de la Cámara, validación de comprobante bancario y radicado digital instantáneo.")
    ]
    for idx, (title, sub, desc) in enumerate(steps):
        x = Inches(0.9 + idx * 3.9)
        c = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = title
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(18)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        
        p2 = ctf.add_paragraph()
        p2.text = sub
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_CARMIN
        p2.space_after = Pt(14)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 11: LA PRUEBA DE FUEGO (MÉTRICAS DE USABILIDAD)
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    apply_background(s11)
    add_header(s11, "10. Evaluación Cuantitativa", 
               "Los números no mienten: la usabilidad subió 41 puntos",
               "Evaluación psicométrica y telemetría de comportamiento comparando el sitio viejo vs el nuevo portal.")

    metrics = [
        ("89.5", "SYSTEM USABILITY SCALE (SUS)", "De un reprobado 48.2 (Grado F) a 89.5 (Grado A Excelente). Valida la claridad del lenguaje y la velocidad."),
        ("86%", "ÉXITO DIRECTO EN TREEJACK", "Medido en árbol textual puro sobre 3 tareas críticas: los usuarios llegaron al destino sin desvíos."),
        ("0.8%", "CLICS DE FURIA (RAGE CLICKS)", "En Microsoft Clarity los clics repetidos de frustración cayeron del 18.4% a prácticamente cero.")
    ]
    for idx, (num, label, desc) in enumerate(metrics):
        x = Inches(0.9 + idx * 3.9)
        c = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(3.6), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = num
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(48)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_CARMIN
        p1.space_after = Pt(4)
        
        p2 = ctf.add_paragraph()
        p2.text = label
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GRAPHITE
        p2.space_after = Pt(12)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(13)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 12: HOJA DE RUTA TECNOLÓGICA (2027)
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    apply_background(s12)
    add_header(s12, "11. Hoja de Ruta Tecnológica", 
               "Un ecosistema moderno diseñado para evolucionar",
               "Plan de adopción progresivo por trimestres para asegurar sostenibilidad técnica e institucional.")

    roadmap = [
        ("T1 - 2027", "PUESTA EN PRODUCCIÓN", "Despliegue del frontend Next.js en Vercel, vinculación de Strapi Cloud y primer índice de Algolia."),
        ("T2 - 2027", "AUTOGESTIÓN EMPRESARIAL", "Portal para socios activos: edición autónoma de catálogo, publicación de empleo y beneficios."),
        ("T3 - 2027", "ASISTENTE RAG CON IA", "Integración del script de Python con la API oficial de WhatsApp para resolver dudas legales 24/7."),
        ("T4 - 2027", "OBSERVATORIO ECONÓMICO", "Tablero de analítica comercial provincial para la toma de decisiones gremiales en Alajuela.")
    ]
    for idx, (quarter, title, desc) in enumerate(roadmap):
        x = Inches(0.9 + idx * 2.9)
        c = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), Inches(2.7), Inches(4.3))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        
        p1 = ctf.paragraphs[0]
        p1.text = quarter
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(24)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_CARMIN
        p1.space_after = Pt(4)
        
        p2 = ctf.add_paragraph()
        p2.text = title
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GRAPHITE
        p2.space_after = Pt(10)
        
        p3 = ctf.add_paragraph()
        p3.text = desc
        p3.font.name = FONT_BODY
        p3.font.size = Pt(12)
        p3.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # SLIDE 13: CONCLUSIÓN Y CIERRE HUMANO
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    apply_background(s13)
    
    # Acento superior
    bar_c = s13.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(1.2), Inches(0.6), Inches(0.08))
    bar_c.fill.solid()
    bar_c.fill.fore_color.rgb = COLOR_CARMIN
    bar_c.line.fill.background()

    tb13 = s13.shapes.add_textbox(Inches(0.9), Inches(1.6), Inches(11.5), Inches(3.2))
    tf13 = tb13.text_frame
    tf13.word_wrap = True
    
    p_tag13 = tf13.paragraphs[0]
    p_tag13.text = "CONCLUSIÓN GENERAL · EQUIPO CONSULTOR EIF-511"
    p_tag13.font.name = FONT_HEADING
    p_tag13.font.size = Pt(11)
    p_tag13.font.bold = True
    p_tag13.font.color.rgb = COLOR_CARMIN
    p_tag13.space_after = Pt(16)
    
    p_quote = tf13.add_paragraph()
    p_quote.text = "La Arquitectura de Información no es decorar pantallas.\nEs conectar a quienes producen con quienes necesitan, sin fricción y con orgullo alajuelense."
    p_quote.font.name = FONT_HEADING
    p_quote.font.size = Pt(32)
    p_quote.font.bold = True
    p_quote.font.color.rgb = COLOR_GRAPHITE
    p_quote.space_after = Pt(20)

    # Bloque de agradecimiento y preguntas
    q_box = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(5.3), Inches(11.5), Inches(1.4))
    q_box.fill.solid()
    q_box.fill.fore_color.rgb = COLOR_CARD_BG
    q_box.line.color.rgb = COLOR_CARD_BORDER
    q_tf = q_box.text_frame
    q_tf.word_wrap = True
    
    p_q1 = q_tf.paragraphs[0]
    p_q1.text = "¡Muchas Gracias! Espacio Abierto para Preguntas y Retroalimentación"
    p_q1.font.name = FONT_HEADING
    p_q1.font.size = Pt(16)
    p_q1.font.bold = True
    p_q1.font.color.rgb = COLOR_GRAPHITE
    
    p_q2 = q_tf.add_paragraph()
    p_q2.text = "Prototipo interactivo navegable disponible en vivo · Repositorio: github.com/marcosromanv00/class-arqui-2026-proyecto-final"
    p_q2.font.name = FONT_BODY
    p_q2.font.size = Pt(12)
    p_q2.font.color.rgb = COLOR_MUTED

    # Guardar archivo
    prs.save(str(PPTX_OUT_LOCAL))
    print(f"Presentación generada exitosamente en: {PPTX_OUT_LOCAL}")
    
    # Copiar a Drive
    import shutil
    shutil.copyfile(str(PPTX_OUT_LOCAL), str(PPTX_OUT_DRIVE_ROOT))
    shutil.copyfile(str(PPTX_OUT_LOCAL), str(PPTX_OUT_DRIVE_MARCOS))
    print(f"Copiado a Drive: {PPTX_OUT_DRIVE_ROOT}")

if __name__ == "__main__":
    create_presentation()
