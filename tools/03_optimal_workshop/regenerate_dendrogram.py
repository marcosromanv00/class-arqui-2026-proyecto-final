import openpyxl
import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import linkage, dendrogram
from scipy.spatial.distance import squareform
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

# Cards list
cards = sorted(list(set(d["card"] for d in data)))
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

dist_matrix = 1.0 - (sim_matrix / 100.0)
np.fill_diagonal(dist_matrix, 0)
condensed_dist = squareform(dist_matrix, checks=False)
Z = linkage(condensed_dist, method='average')

# Create clean readable dendrogram
fig, ax = plt.subplots(figsize=(14, 10), dpi=300)
dendro = dendrogram(
    Z,
    labels=cards,
    orientation='right',
    leaf_font_size=9,
    color_threshold=0.38, # Clearly isolates the 6 color branches
    ax=ax
)

# Add explanatory annotations
ax.axvline(x=0.38, color='#dc2626', linestyle='--', linewidth=1.5)
ax.text(0.385, 290, "Umbral de Agrupación (Punto de corte: 6 Categorías Finales)", color='#dc2626', fontweight='bold', fontsize=9.5)

ax.set_title(
    "Dendrograma de Conglomerados Jerárquicos (Best Merge Method - N=18)\nCada color representa una de las 6 categorías validadas empíricamente",
    fontsize=13,
    fontweight='bold',
    pad=15
)
ax.set_xlabel("Distancia de Desacuerdo (0.0 = 100% de acuerdo unánime | 1.0 = Cero coincidencia)", fontsize=10, labelpad=10)
plt.tight_layout()

dendro_path = os.path.join(OUTPUT_DIR, "figura_dendrograma_optimalsort.png")
plt.savefig(dendro_path, dpi=300)
plt.close()
print("Regenerated clean, clear Dendrogram with labeled threshold line and color-coded branches!")

