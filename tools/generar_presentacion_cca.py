"""
Generador de Presentación Ejecutiva Minimalista (16:9 Widescreen)
Cámara de Comercio de Alajuela (CCA) - Proyecto Final EIF-511 UNA

Storytelling en 3 preguntas guía:
  1. ¿Qué encontramos? (Auditoría del portal preexistente, fricción y daño a la confianza gremial)
  2. ¿Qué usamos y cómo nos ayudó? (Métodos, herramientas de AI, polijerarquía y gobernanza)
  3. ¿Cómo lo implementamos? (Prototipo funcional como laboratorio, evidencias, afiliación y métricas)

Estilo: Ejecutivo, directo al grano, cero AI-slop, sin absolutismos, sin pills ni notas al pie.
Evidencias visuales reales integradas en alta resolución.
"""

import shutil
from pathlib import Path
from typing import List, Tuple, Optional
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

BASE_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = BASE_DIR / "docs" / "trabajo-escrito-final" / "documento"
FIG_DIR = DOCS_DIR / "figuras"
PRES_DIR = BASE_DIR / "docs" / "presentacion"
PRES_DIR.mkdir(parents=True, exist_ok=True)

PPTX_OUT_LOCAL = PRES_DIR / "Presentacion_Final_CCA_UNA.pptx"
DRIVE_ROOT = BASE_DIR / "DRIVE_ENTREGA_FINAL_CCA_ACTUALIZADA"
PPTX_OUT_DRIVE_ROOT = DRIVE_ROOT / "Presentacion_Final_CCA_UNA.pptx"
PPTX_OUT_DRIVE_MARCOS = DRIVE_ROOT / "03_Marcos_Roman" / "presentacion_ppt" / "Presentacion_Final_CCA_UNA.pptx"
PPTX_OUT_DRIVE_EMANUEL = DRIVE_ROOT / "01_Emanuel_Soto" / "presentacion_ppt" / "Presentacion_Final_CCA_UNA.pptx"
PPTX_OUT_DRIVE_ALLAN = DRIVE_ROOT / "02_Allan_Arce" / "presentacion_ppt" / "Presentacion_Final_CCA_UNA.pptx"

# Paleta cromática ejecutiva y sobria
COLOR_BG = RGBColor(0xFA, 0xFA, 0xF9)          # Fondo neutro suave (#FAFAF9)
COLOR_CARD_BG = RGBColor(0xFF, 0xFF, 0xFF)     # Tarjeta blanca (#FFFFFF)
COLOR_CARD_BORDER = RGBColor(0xE4, 0xE4, 0xE7) # Borde sutil (#E4E4E7)
COLOR_GRAPHITE = RGBColor(0x09, 0x09, 0x0B)    # Texto principal (#09090B)
COLOR_CARMIN = RGBColor(0x99, 0x1B, 0x1B)      # Rojo Carmín institucional (#991B1B)
COLOR_MUTED = RGBColor(0x52, 0x52, 0x5B)       # Texto secundario (#52525B)
COLOR_WHITE = RGBColor(0xFF, 0xFF, 0xFF)

FONT_FAMILY = "Arial"


def apply_background(slide):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = COLOR_BG
    bg.line.fill.background()
    return bg


def add_slide_header(slide, tag_text: str, title_text: str, oneliner_text: str):
    tb = slide.shapes.add_textbox(Inches(0.9), Inches(0.45), Inches(11.533), Inches(1.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

    p_tag = tf.paragraphs[0]
    p_tag.text = tag_text.upper()
    p_tag.font.name = FONT_FAMILY
    p_tag.font.size = Pt(10)
    p_tag.font.bold = True
    p_tag.font.color.rgb = COLOR_CARMIN
    p_tag.space_after = Pt(4)

    p_title = tf.add_paragraph()
    p_title.text = title_text
    p_title.font.name = FONT_FAMILY
    p_title.font.size = Pt(23)
    p_title.font.bold = True
    p_title.font.color.rgb = COLOR_GRAPHITE
    p_title.space_after = Pt(4)

    p_one = tf.add_paragraph()
    p_one.text = oneliner_text
    p_one.font.name = FONT_FAMILY
    p_one.font.size = Pt(13)
    p_one.font.color.rgb = COLOR_MUTED


def add_split_slide(
    slide,
    tag: str,
    title: str,
    oneliner: str,
    bullets: List[Tuple[str, str]],
    image_name: str,
    caption: str = "",
):
    apply_background(slide)
    add_slide_header(slide, tag, title, oneliner)

    # Columna izquierda: tarjeta con puntos concisos
    card = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.9),
        Inches(2.05),
        Inches(5.6),
        Inches(4.9),
    )
    card.fill.solid()
    card.fill.fore_color.rgb = COLOR_CARD_BG
    card.line.color.rgb = COLOR_CARD_BORDER
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.35)
    tf.margin_top = tf.margin_bottom = Inches(0.35)

    for idx, (lead, desc) in enumerate(bullets):
        p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
        p.space_after = Pt(14)
        r1 = p.add_run()
        r1.text = lead + "  "
        r1.font.name = FONT_FAMILY
        r1.font.size = Pt(13)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_GRAPHITE

        r2 = p.add_run()
        r2.text = desc
        r2.font.name = FONT_FAMILY
        r2.font.size = Pt(12)
        r2.font.color.rgb = COLOR_MUTED

    # Columna derecha: imagen de evidencia
    img_path = FIG_DIR / image_name
    if img_path.exists():
        slide.shapes.add_picture(
            str(img_path),
            left=Inches(6.8),
            top=Inches(2.05),
            width=Inches(5.633),
        )
        if caption:
            tb_cap = slide.shapes.add_textbox(
                Inches(6.8), Inches(6.55), Inches(5.633), Inches(0.4)
            )
            tf_cap = tb_cap.text_frame
            tf_cap.word_wrap = True
            p_cap = tf_cap.paragraphs[0]
            p_cap.text = caption
            p_cap.font.name = FONT_FAMILY
            p_cap.font.size = Pt(10)
            p_cap.font.italic = True
            p_cap.font.color.rgb = COLOR_MUTED


def add_cards_slide(
    slide,
    tag: str,
    title: str,
    oneliner: str,
    cards_data: List[Tuple[str, str, str]],
):
    apply_background(slide)
    add_slide_header(slide, tag, title, oneliner)

    card_w = Inches(3.64)
    gap = Inches(0.3)
    start_x = Inches(0.9)

    for idx, (badge, heading, body) in enumerate(cards_data):
        x = start_x + idx * (card_w + gap)
        c = slide.shapes.add_shape(
            MSO_SHAPE.ROUNDED_RECTANGLE,
            x,
            Inches(2.05),
            card_w,
            Inches(4.9),
        )
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_CARD_BG
        c.line.color.rgb = COLOR_CARD_BORDER
        ctf = c.text_frame
        ctf.word_wrap = True
        ctf.margin_left = ctf.margin_right = Inches(0.3)
        ctf.margin_top = ctf.margin_bottom = Inches(0.35)

        p0 = ctf.paragraphs[0]
        p0.text = badge
        p0.font.name = FONT_FAMILY
        if any(char.isdigit() for char in badge) or len(badge) <= 7:
            p0.font.size = Pt(26)
        else:
            p0.font.size = Pt(16)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_CARMIN
        p0.space_after = Pt(6)

        p1 = ctf.add_paragraph()
        p1.text = heading
        p1.font.name = FONT_FAMILY
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_GRAPHITE
        p1.space_after = Pt(12)

        p2 = ctf.add_paragraph()
        p2.text = body
        p2.font.name = FONT_FAMILY
        p2.font.size = Pt(12)
        p2.font.color.rgb = COLOR_MUTED


def build_deck():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank = prs.slide_layouts[6]

    # =========================================================================
    # SLIDE 1: PORTADA
    # =========================================================================
    s1 = prs.slides.add_slide(blank)
    apply_background(s1)

    logo_cca = FIG_DIR / "Logo-camara-hi.png"
    if logo_cca.exists():
        s1.shapes.add_picture(str(logo_cca), Inches(0.9), Inches(0.9), width=Inches(3.2))

    bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(2.2), Inches(0.7), Inches(0.06))
    bar.fill.solid()
    bar.fill.fore_color.rgb = COLOR_CARMIN
    bar.line.fill.background()

    tb_title = s1.shapes.add_textbox(Inches(0.9), Inches(2.4), Inches(11.5), Inches(2.6))
    tf1 = tb_title.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "EIF-511 ARQUITECTURA DE INFORMACIÓN · PROYECTO INTEGRADOR FINAL"
    p0.font.name = FONT_FAMILY
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_CARMIN
    p0.space_after = Pt(10)

    p1 = tf1.add_paragraph()
    p1.text = "Por el comercio. Por Alajuela."
    p1.font.name = FONT_FAMILY
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_GRAPHITE
    p1.space_after = Pt(8)

    p2 = tf1.add_paragraph()
    p2.text = "Reorganización de la Arquitectura de Información para la Cámara de Comercio de Alajuela"
    p2.font.name = FONT_FAMILY
    p2.font.size = Pt(17)
    p2.font.color.rgb = COLOR_MUTED

    meta_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(5.3), Inches(11.533), Inches(1.4))
    meta_card.fill.solid()
    meta_card.fill.fore_color.rgb = COLOR_CARD_BG
    meta_card.line.color.rgb = COLOR_CARD_BORDER
    mtf = meta_card.text_frame
    mtf.word_wrap = True
    mtf.margin_left = mtf.margin_right = Inches(0.4)
    mtf.margin_top = mtf.margin_bottom = Inches(0.25)

    pm1 = mtf.paragraphs[0]
    pm1.text = "Equipo Consultor: Marcos Román Valverde (Coord.) · Emanuel Soto · Allan Arce"
    pm1.font.name = FONT_FAMILY
    pm1.font.size = Pt(13)
    pm1.font.bold = True
    pm1.font.color.rgb = COLOR_GRAPHITE

    pm2 = mtf.add_paragraph()
    pm2.text = "Universidad Nacional de Costa Rica · Escuela de Informática · Docente: MSc. Cynthia Bolaños Espinoza · II Ciclo 2026"
    pm2.font.name = FONT_FAMILY
    pm2.font.size = Pt(11.5)
    pm2.font.color.rgb = COLOR_MUTED

    # =========================================================================
    # ACTO I: ¿QUÉ ENCONTRAMOS?
    # =========================================================================

    # Slide 2: Contexto y credibilidad institucional
    s2 = prs.slides.add_slide(blank)
    add_cards_slide(
        s2,
        tag="¿Qué encontramos? · Contexto y Credibilidad",
        title="La brecha entre el peso gremial de la Cámara y su portal digital",
        oneliner="Un hub empresarial que transmitía descuido, dañando la confianza y frenando la afiliación de nuevas empresas.",
        cards_data=[
            (
                "43 años",
                "Brecha Institucional",
                "Representa al 2.° polo económico del país, pero su portal digital proyectaba desorganización y alejaba al empresariado moderno.",
            ),
            (
                "Invisibilidad",
                "Pérdida de Confianza",
                "Un catálogo inusable con faltas ortográficas le quitaba seriedad a los socios y transmitía falta de rigor técnico.",
            ),
            (
                "Embudo roto",
                "Fuga de Afiliaciones",
                "Descargar un Word manual rompía la captación: las Pymes no se afiliaban y la Cámara perdía representatividad gremial.",
            ),
        ],
    )

    # Slide 3: Portada y navegación inicial
    s3 = prs.slides.add_slide(blank)
    add_split_slide(
        s3,
        tag="¿Qué encontramos? · Portada y Navegación",
        title="Doble inicio y servicios de valor invisibles en el menú",
        oneliner="Dos portadas compitiendo entre sí y los motores de captación gremial ocultos de la barra principal.",
        bullets=[
            (
                "Doble página de inicio:",
                "La ruta raíz (/) y la subruta (/home) confundían la ubicación espacial y dividían el tráfico institucional en buscadores.",
            ),
            (
                "Afiliación y empleo ocultos:",
                "Los dos servicios con mayor impacto económico estaban fuera del menú superior, relegados a páginas auxiliares huérfanas.",
            ),
            (
                "Cifras en conflicto:",
                "La portada anunciaba 185 asociados frente a conteos internos opuestos, minando la transparencia gremial.",
            ),
        ],
        image_name="auditoria_original_home.png",
        caption="Evidencia: Portada de camaraalajuela.com sin enlace a Empleo ni Afiliación en el menú superior.",
    )

    # Slide 4: Directorio y taxonomía
    s4 = prs.slides.add_slide(blank)
    add_split_slide(
        s4,
        tag="¿Qué encontramos? · Sistema de Etiquetado",
        title="64 categorías caóticas que devaluaban a los comercios socios",
        oneliner="Un catálogo desordenado que frustraba al cliente y restaba seriedad a las empresas que pagan su membresía.",
        bullets=[
            (
                "Descontrol taxonómico:",
                "Categorías duplicadas, espanglish y erratas visibles ('Constuctora') que perjudicaban la imagen institucional.",
            ),
            (
                "Conteo contradictorio en pantalla:",
                "En una misma vista coexistían 173 empresas certificadas y 171 resultados, sembrando dudas sobre el padrón.",
            ),
            (
                "Cero filtrado territorial:",
                "Imposible filtrar por cantón o distrito en una provincia de 16 cantones con realidades productivas diversas.",
            ),
        ],
        image_name="auditoria_original_directorio.png",
        caption="Evidencia: Directorio original con 64 categorías sin normalizar y sin barra de búsqueda predictiva.",
    )

    # Slide 5: Servicios y trámites
    s5 = prs.slides.add_slide(blank)
    add_split_slide(
        s5,
        tag="¿Qué encontramos? · Sistema de Organización",
        title="Módulos vacíos que transmitían inoperancia institucional",
        oneliner="Secciones anunciadas como servicios de valor que no entregaban ninguna información al usuario.",
        bullets=[
            (
                "Bolsa de Empleo inactiva:",
                "La sección /oferentes/ devolvía de forma permanente 'No hay ofertas', proyectando estancamiento ante el talento local.",
            ),
            (
                "Afiliación enteramente en papel:",
                "Un formulario manual en Word (62 KB) como único canal de ingreso, incompatible con la agilidad empresarial actual.",
            ),
            (
                "Noticias en blanco:",
                "Mensajes de error de base de datos vacía en la sección informativa, transmitiendo una entidad desatendida.",
            ),
        ],
        image_name="auditoria_original_oferentes.png",
        caption="Evidencia: Sección de empleo original vacía y repositorio limitado a un formulario manual descargable.",
    )

    # =========================================================================
    # ACTO II: ¿QUÉ USAMOS Y CÓMO NOS AYUDÓ?
    # =========================================================================

    # Slide 6: FlowMapp y microarquitectura
    s6 = prs.slides.add_slide(blank)
    add_split_slide(
        s6,
        tag="¿Qué usamos? · Mapeo Estructural",
        title="De 42 enlaces dispersos a 26 nodos en 3 niveles",
        oneliner="Modelamos la jerarquía global en FlowMapp y la microarquitectura de cada pantalla en Octopus.do antes de diseñar.",
        bullets=[
            (
                "Ley de Hick aplicada:",
                "Redujimos la barra superior a 5 secciones temáticas principales más un botón magnético de llamada a la acción para Afiliarse.",
            ),
            (
                "Microarquitectura de bloques:",
                "Con Octopus.do definimos la intención y el contenido de cada bloque funcional, depurando módulos redundantes.",
            ),
            (
                "Regla de los 3 clics:",
                "Garantizamos que cualquier comercio, trámite de patente o vacante laboral esté a un máximo de 3 pasos desde el inicio.",
            ),
        ],
        image_name="figura_02_sitemap_macro.png",
        caption="Evidencia: Sitemap macro balanceado en FlowMapp con 26 nodos y máxima profundidad de 3 niveles.",
    )

    # Slide 7: Optimal Workshop
    s7 = prs.slides.add_slide(blank)
    add_split_slide(
        s7,
        tag="¿Qué usamos? · Validación Empírica",
        title="El modelo mental de los usuarios cuestionó la jerarquía rígida",
        oneliner="Una muestra de 18 participantes evaluó la agrupación lógica mediante Card Sorting y Treejack.",
        bullets=[
            (
                "540 clasificaciones analizadas:",
                "Participantes con perfiles de comerciantes tradicionales, empresas B2B y emprendedores evaluaron 30 conceptos clave.",
            ),
            (
                "Dispersión natural de categorías:",
                "La matriz de similitud reveló que trámites como patentes y convenios no pertenecen a un único contenedor estático.",
            ),
            (
                "Fundamento empírico:",
                "Confirmó que obligar al usuario a seguir una sola ruta jerárquica provocaba desorientación y abandono.",
            ),
        ],
        image_name="figura_matriz_similitud_optimalsort.png",
        caption="Evidencia: Matriz de similitud de OptimalSort con dispersión natural en trámites, convenios y empleo.",
    )

    # Slide 8: Polijerarquía
    s8 = prs.slides.add_slide(blank)
    add_cards_slide(
        s8,
        tag="¿Cómo nos ayudó? · Arquitectura de Información",
        title="Polijerarquía: Múltiples caminos para respaldar la conversión",
        oneliner="Conectamos los servicios clave en múltiples puntos del portal para que ningún usuario se quede sin respuesta.",
        cards_data=[
            (
                "Trámites",
                "Servicios + Afiliación",
                "Ubicados de forma canónica en Servicios al Comercio y vinculados como requisito previo dentro del registro empresarial.",
            ),
            (
                "Empleo",
                "Menú Principal + Directorio",
                "Elevada a sección de navegación primaria a 1 clic, y vinculada directamente en las fichas de los comercios contratantes.",
            ),
            (
                "Beneficios",
                "Directorio + Retorno Fiscal",
                "Catálogo de descuentos visible en el Directorio y cálculo de la cuota deducible (Ley 7092) integrado en el registro.",
            ),
        ],
    )

    # Slide 9: Algolia Search
    s9 = prs.slides.add_slide(blank)
    add_split_slide(
        s9,
        tag="¿Qué usamos? · Sistema de Búsqueda",
        title="Búsqueda predictiva para devolverle valor al Directorio",
        oneliner="Respuestas en milisegundos y comprensión del lenguaje coloquial de los comerciantes alajuelenses.",
        bullets=[
            (
                "171 comercios indexados:",
                "Índice estructurado con datos normalizados de cantón, distrito, sector formal y convenios gremiales verificados.",
            ),
            (
                "52 grupos de sinónimos locales:",
                "Equivalencias prácticas ('taller' ↔ 'mecánica', 'tornillos' ↔ 'ferretería') que redujeron búsquedas vacías del 23% al 6%.",
            ),
            (
                "Tolerancia tipográfica real:",
                "Recuperación instantánea ante errores comunes de digitación como 'fereteria', 'biyares', 'farmasia' o 'dos pinoz'.",
            ),
        ],
        image_name="figura_9_5_algolia_analytics_queries.png",
        caption="Evidencia: Analítica real de Algolia con consultas ortográficas procesadas y recuperadas con éxito.",
    )

    # Slide 10: Strapi CMS
    s10 = prs.slides.add_slide(blank)
    add_split_slide(
        s10,
        tag="¿Qué usamos? · Gobernanza de Contenido",
        title="Vocabularios controlados para garantizar profesionalismo",
        oneliner="Esquemas cerrados en Strapi que blindan la calidad del dato y evitan que el portal vuelva a desordenarse.",
        bullets=[
            (
                "Validación estricta por esquema:",
                "Campos estructurados en Strapi para los 16 cantones oficiales y 5 macro-sectores, bloqueando erratas manuales.",
            ),
            (
                "Gestión editorial autónoma:",
                "El personal de la Cámara actualiza comercios, convenios y vacantes desde un panel intuitivo sin depender de terceros.",
            ),
            (
                "Soberanía de datos:",
                "Arquitectura desacoplada que reemplaza la fragilidad de plugins de WordPress por una API estructurada y segura.",
            ),
        ],
        image_name="captura_strapi_content_manager_comercios.png",
        caption="Evidencia: Content Manager de Strapi con validación de cantones y atributos comerciales obligatorios.",
    )

    # Slide 11: Miro, RAG y SINPE
    s11 = prs.slides.add_slide(blank)
    add_split_slide(
        s11,
        tag="¿Qué usamos? · Experiencia y Conversión",
        title="Digitalización del viaje: De la consulta a la afiliación activa",
        oneliner="Mapeamos la fricción en Miro, resolvimos dudas con IA y transformamos la afiliación en un trámite digital.",
        bullets=[
            (
                "Customer Journey Map en Miro:",
                "Reveló que el mayor abandono histórico ocurría por falta de claridad en las cuotas y por el trámite físico de pago.",
            ),
            (
                "Asistente RAG con base jurídica:",
                "Explica al instante requisitos, arbitraje comercial (Ley 7727) y la deducibilidad de la cuota (Art. 8, Ley 7092).",
            ),
            (
                "Validación transaccional SINPE:",
                "Verificación inmediata de teléfonos de 8 dígitos y emisión de comprobante con radicado formal para seguimiento.",
            ),
        ],
        image_name="figura_05_flujo_checkout_afiliacion.png",
        caption="Evidencia: Flujo de checkout digital en 3 pasos con validación de comprobante SINPE y radicado formal.",
    )

    # =========================================================================
    # ACTO III: ¿CÓMO LO IMPLEMENTAMOS?
    # =========================================================================

    # Slide 12: Prototipo como laboratorio de AI
    s12 = prs.slides.add_slide(blank)
    add_split_slide(
        s12,
        tag="¿Cómo lo implementamos? · Laboratorio de AI",
        title="Un entorno funcional para restaurar la confianza",
        oneliner="El prototipo web valida en condiciones reales la claridad, sobriedad y accesibilidad de la nueva arquitectura.",
        bullets=[
            (
                "Identidad institucional sólida:",
                "Portada canónica unificada con el escudo oficial de la Cámara, buscador central y acceso a los 5 ejes gremiales.",
            ),
            (
                "Diseño sobrio y accesible:",
                "Contraste certificado, tipografía legible y jerarquía espacial limpia para transmitir rigor profesional.",
            ),
            (
                "Entorno de pruebas operativas:",
                "Permitió auditar con usuarios tareas reales de búsqueda por cantón, contacto comercial y solicitud de servicios.",
            ),
        ],
        image_name="figura_web_resultado_home.png",
        caption="Evidencia: Portada canónica del prototipo con el emblema oficial y accesos directos estructurados.",
    )

    # Slide 13: Directorio y Bolsa de Empleo
    s13 = prs.slides.add_slide(blank)
    add_split_slide(
        s13,
        tag="¿Cómo lo implementamos? · Sistemas Funcionales",
        title="Directorio útil y Bolsa de Empleo activa para la provincia",
        oneliner="Herramientas que devuelven a los comercios el valor de su membresía y generan impacto social tangible.",
        bullets=[
            (
                "171 comercios localizables en 18 ms:",
                "Filtrado simultáneo por cantón y sector comercial, proyectando orden y modernidad empresarial.",
            ),
            (
                "Conexión comercial directa:",
                "Acceso inmediato a WhatsApp y ruta en Waze sin intermediarios ni datos desactualizados.",
            ),
            (
                "Bolsa de empleo funcional:",
                "Ofertas vigentes en Alajuela Centro y El Coyol, transformando una sección vacía en un servicio de alto impacto.",
            ),
        ],
        image_name="figura_web_resultado_directorio.png",
        caption="Evidencia: Directorio oficial con facetas por cantón, sectores normalizados y tiempos de respuesta de 18 ms.",
    )

    # Slide 14: Wizard de Afiliación Digital
    s14 = prs.slides.add_slide(blank)
    add_split_slide(
        s14,
        tag="¿Cómo lo implementamos? · Proceso Transaccional",
        title="Afiliación digital: El motor para captar nuevas empresas",
        oneliner="Sustituimos el formulario manual por un flujo asistido en 3 pasos que demuestra profesionalismo y genera ingresos.",
        bullets=[
            (
                "Paso 1: Transparencia y modalidades:",
                "Tarifas claras para Pymes (₡15.000/mes) y Empresas (₡35.000/mes) destacando el beneficio de deducibilidad fiscal.",
            ),
            (
                "Paso 2: Pago digital asistido:",
                "Instrucciones directas de transferencia SINPE Móvil al número oficial de la Cámara con validación de comprobante.",
            ),
            (
                "Paso 3: Certeza jurídica y radicado:",
                "Generación de comprobante digital numerado para que la empresa tenga constancia inmediata de su registro gremial.",
            ),
        ],
        image_name="figura_web_resultado_afiliacion.png",
        caption="Evidencia: Wizard de afiliación con desglose de beneficios fiscales (Ley 7092) y selección de membresía.",
    )

    # Slide 15: Evaluación Cuantitativa
    s15 = prs.slides.add_slide(blank)
    add_cards_slide(
        s15,
        tag="¿Qué logramos? · Evaluación Cuantitativa",
        title="Métricas que respaldan el retorno de la confianza",
        oneliner="La evaluación con usuarios y la analítica confirmaron la eliminación de barreras críticas de usabilidad.",
        cards_data=[
            (
                "89.5 SUS",
                "Escala de Usabilidad",
                "De un puntaje inicial reprobatorio de 48.2 a 89.5 puntos (grado A+), alcanzando el rango de excelencia percibida.",
            ),
            (
                "86%",
                "Éxito directo Treejack",
                "Los usuarios navegaron la estructura sin titubear ni extraviarse en tareas prioritarias de localización.",
            ),
            (
                "0.8%",
                "Clics de frustración",
                "Descenso drástico en Microsoft Clarity frente al 18.4% del portal anterior, validando una interacción sin fricciones.",
            ),
        ],
    )

    # Slide 16: Conclusiones y cierre
    s16 = prs.slides.add_slide(blank)
    apply_background(s16)

    bar16 = s16.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(0.9), Inches(0.7), Inches(0.06))
    bar16.fill.solid()
    bar16.fill.fore_color.rgb = COLOR_CARMIN
    bar16.line.fill.background()

    tb16 = s16.shapes.add_textbox(Inches(0.9), Inches(1.15), Inches(11.533), Inches(3.8))
    tf16 = tb16.text_frame
    tf16.word_wrap = True

    p0 = tf16.paragraphs[0]
    p0.text = "CONCLUSIONES · EQUIPO CONSULTOR DE ARQUITECTURA DE INFORMACIÓN"
    p0.font.name = FONT_FAMILY
    p0.font.size = Pt(10)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_CARMIN
    p0.space_after = Pt(10)

    p1 = tf16.add_paragraph()
    p1.text = "La Arquitectura de Información como activo estratégico institucional"
    p1.font.name = FONT_FAMILY
    p1.font.size = Pt(28)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_GRAPHITE
    p1.space_after = Pt(16)

    insights = [
        "1. La credibilidad digital impacta la representatividad gremial: Si un hub empresarial proyecta desorden, las empresas no se afilian y la institución pierde relevancia e ingresos.",
        "2. Polijerarquía y vocabularios controlados garantizan el orden: Diseñar según los modelos mentales del usuario y blindar los esquemas de datos evita el colapso futuro de la plataforma.",
        "3. La tecnología adquiere sentido cuando la información está ordenada: Algolia, Strapi y los asistentes RAG solo entregan valor real sobre una base estructural sólida y rigurosa.",
    ]
    for ins in insights:
        p_ins = tf16.add_paragraph()
        p_ins.text = ins
        p_ins.font.name = FONT_FAMILY
        p_ins.font.size = Pt(13)
        p_ins.font.color.rgb = COLOR_MUTED
        p_ins.space_after = Pt(8)

    q_box = s16.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(5.4), Inches(11.533), Inches(1.3))
    q_box.fill.solid()
    q_box.fill.fore_color.rgb = COLOR_CARD_BG
    q_box.line.color.rgb = COLOR_CARD_BORDER
    q_tf = q_box.text_frame
    q_tf.word_wrap = True
    q_tf.margin_left = q_tf.margin_right = Inches(0.4)
    q_tf.margin_top = q_tf.margin_bottom = Inches(0.2)

    pq1 = q_tf.paragraphs[0]
    pq1.text = "¡Muchas gracias! Espacio abierto para preguntas y comentarios."
    pq1.font.name = FONT_FAMILY
    pq1.font.size = Pt(15)
    pq1.font.bold = True
    pq1.font.color.rgb = COLOR_GRAPHITE

    pq2 = q_tf.add_paragraph()
    pq2.text = "Proyecto Integrador EIF-511 · Prototipo funcional desplegado y código reproducible en el repositorio del curso."
    pq2.font.name = FONT_FAMILY
    pq2.font.size = Pt(11.5)
    pq2.font.color.rgb = COLOR_MUTED

    # Guardar local y copias
    prs.save(str(PPTX_OUT_LOCAL))
    print(f"Presentación generada exitosamente en: {PPTX_OUT_LOCAL}")

    for target in [
        PPTX_OUT_DRIVE_ROOT,
        PPTX_OUT_DRIVE_MARCOS,
        PPTX_OUT_DRIVE_EMANUEL,
        PPTX_OUT_DRIVE_ALLAN,
    ]:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(str(PPTX_OUT_LOCAL), str(target))
        print(f"Copiado a: {target}")


if __name__ == "__main__":
    build_deck()
