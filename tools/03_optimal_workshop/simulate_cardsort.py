import asyncio
import random
import time
from playwright.async_api import async_playwright

CARDS = [
    "Misión y Visión de la Cámara",
    "Junta Directiva y Representantes",
    "Estatutos y Marco Legal",
    "Historia del Comercio Alajuelense",
    "Planes y Tarifas de Afiliación",
    "Formulario de Afiliación en Línea",
    "Pasarela de Pago SINPE y Tarjeta",
    "Portal de Autoservicio del Socio",
    "Directorio de Comercios de Alajuela",
    "Filtro de Comercios por Cantón",
    "Ficha Oficial del Comercio Afiliado",
    "Convenios y Descuentos Comerciales",
    "Asesoría Legal y Tributaria Pyme",
    "Alquiler de Salones y Auditorio",
    "Bolsa de Empleo Cantonal",
    "Capacitaciones y Talleres Empresariales",
    "Comunicados de Prensa Oficiales",
    "Boletín Económico Provincial",
    "Galería de Eventos y Premiaciones",
    "Ubicación Central y Horarios",
    "Canal Oficial de WhatsApp",
    "Buzón de Consultas y Denuncias",
    "Preguntas Frecuentes (FAQ)",
    "Guía para Obtención de Patente Municipal",
    "Certificado de Afiliado Activo",
    "Sello Digital de Negocio Confiable",
    "Buscador General con Predictivo",
    "Mapa Interactivo de Zonas Comerciales",
    "Comité de Mujeres Comerciantes",
    "Comité de Jóvenes Emprendedores"
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

# Real-world profile times in seconds:
# Traditional: 420s to 600s (7 - 10 min)
# Professional: 300s to 450s (5 - 7.5 min)
# Digital: 220s to 350s (3.5 - 5.8 min)

USER_PROFILES = [
    {"name": "P01_Don_Alvaro", "archetype": "Tradicional", "target_time": 490},
    {"name": "P02_Carlos_Mora_Ferretero", "archetype": "Tradicional", "target_time": 530},
    {"name": "P03_Dona_Elena_Bazar", "archetype": "Tradicional", "target_time": 580},
    {"name": "P04_Jorge_Valverde_Taller", "archetype": "Tradicional", "target_time": 460},
    {"name": "P05_Ramiro_Castro_Panaderia", "archetype": "Tradicional", "target_time": 510},
    {"name": "P06_Carmen_Soto_Libreria", "archetype": "Tradicional", "target_time": 475},
    {"name": "P07_Guillermo_Blanco_Agro", "archetype": "Tradicional", "target_time": 550},
    
    {"name": "P08_Licda_Sofia_Bufete", "archetype": "Profesional", "target_time": 360},
    {"name": "P09_Lic_Bernardo_Contable", "archetype": "Profesional", "target_time": 390},
    {"name": "P10_Dra_Mariana_Clinica", "archetype": "Profesional", "target_time": 330},
    {"name": "P11_Ing_Mauricio_Consultor", "archetype": "Profesional", "target_time": 410},
    {"name": "P12_Licda_Valeria_Arquitectura", "archetype": "Profesional", "target_time": 345},
    {"name": "P13_Lic_Esteban_Aduanas", "archetype": "Profesional", "target_time": 380},
    
    {"name": "P14_Kevin_Chaves_Ecommerce", "archetype": "Digital", "target_time": 260},
    {"name": "P15_Fabiola_Rojas_Marketing", "archetype": "Digital", "target_time": 290},
    {"name": "P16_Andres_Vargas_AppDev", "archetype": "Digital", "target_time": 240},
    {"name": "P17_Daniela_Quesada_BoutiqueOnline", "archetype": "Digital", "target_time": 275},
    {"name": "P18_Sebastian_Mendez_Tech", "archetype": "Digital", "target_time": 255}
]

def get_mapping_for_profile(p_idx):
    mapping = dict(CANONICAL)
    p = USER_PROFILES[p_idx]
    arch = p["archetype"]
    
    if arch == "Tradicional":
        mapping["Convenios y Descuentos Comerciales"] = "Afiliaciones y Membresías"
        if p_idx % 2 == 0:
            mapping["Pasarela de Pago SINPE y Tarjeta"] = "Contacto y Soporte"
        if p_idx % 3 == 0:
            mapping["Guía para Obtención de Patente Municipal"] = "Institucional y Gobernanza"
            mapping["Buscador General con Predictivo"] = "Contacto y Soporte"
            
    elif arch == "Profesional":
        if p_idx in [7, 9, 11]:
            mapping["Bolsa de Empleo Cantonal"] = "Directorio Comercial de Alajuela"
        if p_idx in [8, 10, 12]:
            mapping["Sello Digital de Negocio Confiable"] = "Servicios al Comercio"
        if p_idx in [9, 12]:
            mapping["Boletín Económico Provincial"] = "Servicios al Comercio"
            
    elif arch == "Digital":
        mapping["Comité de Jóvenes Emprendedores"] = "Servicios al Comercio"
        if p_idx in [13, 15, 17]:
            mapping["Buscador General con Predictivo"] = "Contacto y Soporte"
            mapping["Guía para Obtención de Patente Municipal"] = "Afiliaciones y Membresías"
        if p_idx in [14, 16]:
            mapping["Portal de Autoservicio del Socio"] = "Servicios al Comercio"
            
    return mapping

STUDY_URL = "https://b88cjfju.optimalworkshop.com/optimalsort/cca2026"

print(f"Loaded {len(USER_PROFILES)} realistic profiles.")
