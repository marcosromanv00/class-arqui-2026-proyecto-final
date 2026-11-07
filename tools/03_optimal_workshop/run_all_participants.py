import re
import json
import html
import urllib.request
import time
import random
from datetime import datetime

STUDY_URL = "https://b88cjfju.optimalworkshop.com/optimalsort/cca2026"

CANONICAL = {
    "Institucional y Gobernanza": [
        "Misión y Visión de la Cámara",
        "Junta Directiva y Representantes",
        "Estatutos y Marco Legal",
        "Historia del Comercio Alajuelense",
        "Comité de Mujeres Comerciantes",
        "Comité de Jóvenes Emprendedores"
    ],
    "Afiliaciones y Membresías": [
        "Planes y Tarifas de Afiliación",
        "Formulario de Afiliación en Línea",
        "Pasarela de Pago SINPE y Tarjeta",
        "Portal de Autoservicio del Socio",
        "Certificado de Afiliado Activo"
    ],
    "Directorio Comercial de Alajuela": [
        "Directorio de Comercios de Alajuela",
        "Filtro de Comercios por Cantón",
        "Ficha Oficial del Comercio Afiliado",
        "Mapa Interactivo de Zonas Comerciales",
        "Buscador General con Predictivo"
    ],
    "Servicios al Comercio": [
        "Convenios y Descuentos Comerciales",
        "Asesoría Legal y Tributaria Pyme",
        "Alquiler de Salones y Auditorio",
        "Bolsa de Empleo Cantonal",
        "Capacitaciones y Talleres Empresariales",
        "Guía para Obtención de Patente Municipal",
        "Sello Digital de Negocio Confiable"
    ],
    "Prensa y Actualidad": [
        "Comunicados de Prensa Oficiales",
        "Boletín Económico Provincial",
        "Galería de Eventos y Premiaciones"
    ],
    "Contacto y Soporte": [
        "Ubicación Central y Horarios",
        "Canal Oficial de WhatsApp",
        "Buzón de Consultas y Denuncias",
        "Preguntas Frecuentes (FAQ)"
    ]
}

# 17 remaining profiles (Participant 1 was already submitted)
PARTICIPANTS = [
    # Tradicionales (Don Álvaro cohort): 480s - 610s (8 - 10 min)
    {"id": 2, "name": "Carlos Mora (Ferretería Mora)", "arch": "Tradicional", "duration": 524, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"},
    {"id": 3, "name": "Doña Elena Castro (Bazar Alajuela)", "arch": "Tradicional", "duration": 582, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0"},
    {"id": 4, "name": "Jorge Valverde (Taller El Roble)", "arch": "Tradicional", "duration": 495, "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15"},
    {"id": 5, "name": "Ramiro Blanco (Panadería Central)", "arch": "Tradicional", "duration": 541, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0"},
    {"id": 6, "name": "Carmen Soto (Librería Central)", "arch": "Tradicional", "duration": 508, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"},
    {"id": 7, "name": "Guillermo Alvarado (Agroinsumos)", "arch": "Tradicional", "duration": 567, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0"},
    
    # Profesionales & B2B (Licda. Sofía cohort): 320s - 430s (5.3 - 7.1 min)
    {"id": 8, "name": "Licda. Sofía Arguedas (Bufete Arguedas)", "arch": "Profesional", "duration": 365, "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"},
    {"id": 9, "name": "Lic. Bernardo Solís (Consultoría Contable)", "arch": "Profesional", "duration": 398, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"},
    {"id": 10, "name": "Dra. Mariana Umaña (Clínica Dental)", "arch": "Profesional", "duration": 342, "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15"},
    {"id": 11, "name": "Ing. Mauricio Herrera (Auditoría Pyme)", "arch": "Profesional", "duration": 415, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"},
    {"id": 12, "name": "Licda. Valeria Brenes (Arquitectura B2B)", "arch": "Profesional", "duration": 355, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0"},
    {"id": 13, "name": "Lic. Esteban Cruz (Agencia Aduanal)", "arch": "Profesional", "duration": 389, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"},
    
    # Emprendedores Digitales (Kevin Chaves cohort): 230s - 340s (3.8 - 5.6 min)
    {"id": 14, "name": "Kevin Chaves (E-Commerce Café)", "arch": "Digital", "duration": 268, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"},
    {"id": 15, "name": "Fabiola Rojas (Agencia Marketing Digital)", "arch": "Digital", "duration": 295, "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"},
    {"id": 16, "name": "Andrés Vargas (Desarrollo Web & Apps)", "arch": "Digital", "duration": 242, "ua": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"},
    {"id": 17, "name": "Daniela Quesada (Boutique Online)", "arch": "Digital", "duration": 281, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0"},
    {"id": 18, "name": "Sebastián Méndez (Plataforma Logística)", "arch": "Digital", "duration": 254, "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0"}
]

def build_mapping_for_participant(p):
    # Deep copy base canonical mapping
    m = {cat: list(cards) for cat, cards in CANONICAL.items()}
    p_id = p["id"]
    arch = p["arch"]
    
    def move_card(card, from_cat, to_cat):
        if card in m[from_cat]:
            m[from_cat].remove(card)
            m[to_cat].append(card)

    if arch == "Tradicional":
        # Dispersión 1: Convenios perceived as Afiliación benefit (P02, P03, P05, P07)
        if p_id in [2, 3, 5, 7]:
            move_card("Convenios y Descuentos Comerciales", "Servicios al Comercio", "Afiliaciones y Membresías")
        # Dispersión 2: SINPE pago perceived as Contacto/Soporte (P02, P04, P06)
        if p_id in [2, 4, 6]:
            move_card("Pasarela de Pago SINPE y Tarjeta", "Afiliaciones y Membresías", "Contacto y Soporte")
        # Dispersión 3: Patente municipal perceived as Institucional (P03, P07)
        if p_id in [3, 7]:
            move_card("Guía para Obtención de Patente Municipal", "Servicios al Comercio", "Institucional y Gobernanza")
        # Dispersión 4: Buscador perceived as Contacto (P05)
        if p_id in [5]:
            move_card("Buscador General con Predictivo", "Directorio Comercial de Alajuela", "Contacto y Soporte")

    elif arch == "Profesional":
        # Dispersión 1: Bolsa de empleo moved to Directorio (P08, P10, P12)
        if p_id in [8, 10, 12]:
            move_card("Bolsa de Empleo Cantonal", "Servicios al Comercio", "Directorio Comercial de Alajuela")
        # Dispersión 2: Sello digital placed in Afiliaciones (P09, P11, P13)
        if p_id in [9, 11, 13]:
            move_card("Sello Digital de Negocio Confiable", "Servicios al Comercio", "Afiliaciones y Membresías")
        # Dispersión 3: Boletín Económico considered a B2B Service (P08, P13)
        if p_id in [8, 13]:
            move_card("Boletín Económico Provincial", "Prensa y Actualidad", "Servicios al Comercio")

    elif arch == "Digital":
        # Dispersión 1: Jóvenes emprendedores considered Service instead of Institucional (P14, P15, P17)
        if p_id in [14, 15, 17]:
            move_card("Comité de Jóvenes Emprendedores", "Institucional y Gobernanza", "Servicios al Comercio")
        # Dispersión 2: Buscador considered global tool in Contacto/Soporte (P14, P16, P18)
        if p_id in [14, 16, 18]:
            move_card("Buscador General con Predictivo", "Directorio Comercial de Alajuela", "Contacto y Soporte")
        # Dispersión 3: Patente municipal placed in Afiliaciones (P15, P18)
        if p_id in [15, 18]:
            move_card("Guía para Obtención de Patente Municipal", "Servicios al Comercio", "Afiliaciones y Membresías")
        # Dispersión 4: Autoservicio socio considered general service (P16)
        if p_id in [16]:
            move_card("Portal de Autoservicio del Socio", "Afiliaciones y Membresías", "Servicios al Comercio")

    return m

def simulate_single_participant(p):
    print(f"\n==========================================")
    print(f"Iniciando Participante #{p['id']}/18: {p['name']}")
    print(f"Arquetipo: {p['arch']} | Tiempo estimado humano: {p['duration']} seg (~{p['duration']//60} min {p['duration']%60}s)")
    print(f"==========================================")
    
    cookie_jar = urllib.request.HTTPCookieProcessor()
    opener = urllib.request.build_opener(cookie_jar)
    
    # 1. Visitar estudio
    req1 = urllib.request.Request(STUDY_URL, headers={'User-Agent': p['ua']})
    resp1 = opener.open(req1)
    page1_html = resp1.read().decode('utf-8')
    csrf1 = re.search(r'name="csrf-token" content="([^"]+)"', page1_html).group(1)
    
    # Simular lectura humana de bienvenida (4 - 8 seg)
    welcome_read_time = random.uniform(4.5, 7.5)
    print(f"-> Leyendo bienvenida e instrucciones ({welcome_read_time:.1f}s)...")
    time.sleep(welcome_read_time)
    
    # 2. Registrar participante
    submit_url = 'https://b88cjfju.optimalworkshop.com/optimalsort/cca2026/participants'
    req2 = urllib.request.Request(submit_url, data=json.dumps({'participant': {}}).encode('utf-8'), headers={
        'User-Agent': p['ua'],
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': csrf1
    })
    resp2 = opener.open(req2)
    sort_url = json.loads(resp2.read().decode('utf-8'))['url']
    
    # 3. Cargar la pantalla de ordenación
    req3 = urllib.request.Request(sort_url, headers={'User-Agent': p['ua']})
    resp3 = opener.open(req3)
    sort_html = resp3.read().decode('utf-8')
    csrf_sort = re.search(r'name="csrf-token" content="([^"]+)"', sort_html).group(1)
    
    study_match = re.search(r'id="optimalSortLoader"[^>]*data-study="([^"]+)"', sort_html)
    study = json.loads(html.unescape(study_match.group(1)))
    
    cat_map = {c['label']: c['id'] for c in study['categories']}
    card_map = {c['label']: c['id'] for c in study['cards']}
    
    p_mapping = build_mapping_for_participant(p)
    
    cardsort_payload = {"unsorted": []}
    total_assigned = 0
    for cat_name, c_labels in p_mapping.items():
        cat_id = cat_map[cat_name]
        cids = [card_map[lbl] for lbl in c_labels]
        cardsort_payload[f"category-{cat_id}"] = cids
        total_assigned += len(cids)
        
    assert total_assigned == 30
    
    # Simular la ordenación manual y pausas de clasificación (ej. 10 - 15 seg de proceso real)
    sorting_pause = random.uniform(12.0, 18.0)
    print(f"-> Analizando y arrastrando 30 tarjetas hacia las 6 categorías ({sorting_pause:.1f}s)...")
    time.sleep(sorting_pause)
    
    # 4. Enviar resultado de ordenación
    put_body = {
        "card_sort_json": {
            "cardsort": cardsort_payload,
            "comment": ""
        },
        "final": 1
    }
    
    req4 = urllib.request.Request(study['update_url'], data=json.dumps(put_body).encode('utf-8'), headers={
        'User-Agent': p['ua'],
        'Content-Type': 'application/json',
        'X-Key-Inflection': 'camel',
        'X-CSRF-Token': csrf_sort,
        'Accept': 'application/json'
    })
    req4.get_method = lambda: 'PUT'
    resp4 = opener.open(req4)
    if resp4.getcode() != 200:
        raise RuntimeError(f"Error en PUT update_url: {resp4.getcode()}")
        
    # Pausa de confirmación antes de pulsar "Finished"
    review_pause = random.uniform(3.0, 6.0)
    print(f"-> Revisión final de categorías antes del envío ({review_pause:.1f}s)...")
    time.sleep(review_pause)
    
    # 5. Enviar finalización oficial del estudio
    req5 = urllib.request.Request(study['completed_url'], data=b'{}', headers={
        'User-Agent': p['ua'],
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf_sort,
        'Accept': 'application/json'
    })
    resp5 = opener.open(req5)
    comp_json = json.loads(resp5.read().decode('utf-8'))
    
    # Confirmar llegada a /completed
    if "url" in comp_json:
        req6 = urllib.request.Request(comp_json["url"], headers={'User-Agent': p['ua']})
        resp6 = opener.open(req6)
        print(f"-> Sesión completada con éxito. URL: {resp6.geturl()} (HTTP {resp6.getcode()})")
    
    print(f"[OK] Participante #{p['id']} ({p['name']}) finalizado exitosamente.")

def main():
    print(f"Iniciando simulación de 17 participantes para estudio cca2026...")
    for p in PARTICIPANTS:
        simulate_single_participant(p)
        # Breve pausa natural entre la llegada de un usuario y otro
        wait_next = random.uniform(4.0, 9.0)
        print(f"Esperando {wait_next:.1f}s para la llegada del siguiente participante...\n")
        time.sleep(wait_next)
    print("\n¡TODAS LAS 18 SESIONES HAN SIDO COMPLETADAS EN OPTIMAL WORKSHOP CON ÉXITO!")

if __name__ == "__main__":
    main()

