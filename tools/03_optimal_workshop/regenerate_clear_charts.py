import openpyxl
import numpy as np
import matplotlib.pyplot as plt
import os

EXCEL_FILE = r'C:\Users\marco\OneDrive\Desktop\arqui-2026-proyecto-final\tools\03_optimal_workshop\Validacion_Taxonomia_CCA_2026_18_Participantes_Oficial.xlsx'
OUTPUT_DIR = r'C:\Users\marco\OneDrive\Desktop\arqui-2026-proyecto-final\docs\trabajo-escrito-final\documento\figuras'

wb = openpyxl.load_workbook(EXCEL_FILE)
ws = wb['Raw Data']

data = []
for r in range(2, ws.max_row + 1):
    p = ws.cell(row=r, column=1).value
    card = ws.cell(row=r, column=4).value
    cat = ws.cell(row=r, column=5).value
    data.append({"participant": p, "card": card, "category": cat})

# Order cards logically by category so the clusters appear as clean squares on the diagonal
CARD_GROUPS = [
    # Institucional
    "Misión y Visión de la Cámara",
    "Junta Directiva y Representantes",
    "Estatutos y Marco Legal",
    "Historia del Comercio Alajuelense",
    "Comité de Mujeres Comerciantes",
    "Comité de Jóvenes Emprendedores",
    # Afiliaciones
    "Planes y Tarifas de Afiliación",
    "Formulario de Afiliación en Línea",
    "Portal de Autoservicio del Socio",
    "Certificado de Afiliado Activo",
    "Pasarela de Pago SINPE y Tarjeta",
    # Directorio
    "Directorio de Comercios de Alajuela",
    "Filtro de Comercios por Cantón",
    "Ficha Oficial del Comercio Afiliado",
    "Mapa Interactivo de Zonas Comerciales",
    "Buscador General con Predictivo",
    # Servicios
    "Asesoría Legal y Tributaria Pyme",
    "Alquiler de Salones y Auditorio",
    "Capacitaciones y Talleres Empresariales",
    "Guía para Obtención de Patente Municipal",
    "Sello Digital de Negocio Confiable",
    "Bolsa de Empleo Cantonal",
    "Convenios y Descuentos Comerciales",
    # Prensa
    "Comunicados de Prensa Oficiales",
    "Boletín Económico Provincial",
    "Galería de Eventos y Premiaciones",
    # Contacto
    "Ubicación Central y Horarios",
    "Canal Oficial de WhatsApp",
    "Buzón de Consultas y Denuncias",
    "Preguntas Frecuentes (FAQ)"
]

cards = CARD_GROUPS
n_cards = len(cards)

matrix = np.zeros((n_cards, n_cards))
by_p = {}
for d in data:
    by_p.setdefault(d["participant"], {})[d["card"]] = d["category"]

n_p = len(by_p)
for p, card_cats in by_p.items():
    for i in range(n_cards):
        for j in range(n_cards):
            if card_cats.get(cards[i]) == card_cats.get(cards[j]):
                matrix[i, j] += 1

sim_matrix = (matrix / n_p) * 100

# Plot Clean Clustered Similarity Matrix
plt.figure(figsize=(14, 12), dpi=300)
plt.imshow(sim_matrix, cmap='Blues', interpolation='nearest', vmin=0, vmax=100)

cbar = plt.colorbar(shrink=0.8)
cbar.set_label('% de Acuerdo entre Participantes', fontsize=11, fontweight='bold')

plt.xticks(range(n_cards), cards, rotation=90, fontsize=8)
plt.yticks(range(n_cards), cards, fontsize=8)

# Add category borders / rectangles to clearly show the 6 blocks
cluster_bounds = [0, 6, 11, 16, 23, 26, 30]
cluster_names = [
    "Institucional",
    "Afiliaciones",
    "Directorio",
    "Servicios",
    "Prensa",
    "Contacto"
]

for idx in range(len(cluster_bounds) - 1):
    start = cluster_bounds[idx] - 0.5
    end = cluster_bounds[idx+1] - 0.5
    width = end - start
    rect = plt.Rectangle((start, start), width, width, fill=False, edgecolor='#dc2626', linewidth=2)
    plt.gca().add_patch(rect)
    # Label cluster
    mid = (start + end) / 2
    plt.text(mid, start - 0.7, cluster_names[idx], ha='center', va='bottom', fontsize=9, fontweight='bold', color='#991b1b')

plt.title("Matriz de Similitud Agrupada por Bloques (N=18)\nLos recuadros rojos muestran los 6 pilares de la Cámara", fontsize=13, fontweight='bold', pad=25)
plt.tight_layout()

sim_path = os.path.join(OUTPUT_DIR, "figura_matriz_similitud_optimalsort.png")
plt.savefig(sim_path, dpi=300)
plt.close()
print("Regenerated clean, clear Similarity Matrix with cluster bounding boxes!")

