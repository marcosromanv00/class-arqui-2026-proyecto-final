import openpyxl
import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import linkage, dendrogram
from scipy.spatial.distance import squareform
import os

EXCEL_FILE = r'C:\Users\marco\OneDrive\Desktop\arqui-2026-proyecto-final\tools\03_optimal_workshop\Validacion_Taxonomia_CCA_2026_18_Participantes_Oficial.xlsx'
OUTPUT_DIR = r'C:\Users\marco\OneDrive\Desktop\arqui-2026-proyecto-final\docs\trabajo-escrito-final\documento\figuras'
os.makedirs(OUTPUT_DIR, exist_ok=True)

wb = openpyxl.load_workbook(EXCEL_FILE)
ws = wb['Raw Data']

# Read classifications
data = []
for r in range(2, ws.max_row + 1):
    p = ws.cell(row=r, column=1).value
    card = ws.cell(row=r, column=4).value
    cat = ws.cell(row=r, column=5).value
    data.append({"participant": p, "card": card, "category": cat})

# Unique cards
cards = sorted(list(set(d["card"] for d in data)))
n_cards = len(cards)

# Build co-occurrence / similarity matrix across the 18 participants
matrix = np.zeros((n_cards, n_cards))

by_p = {}
for d in data:
    by_p.setdefault(d["participant"], {})[d["card"]] = d["category"]

n_participants = len(by_p)

for p, card_cats in by_p.items():
    for i in range(n_cards):
        for j in range(n_cards):
            c_i = cards[i]
            c_j = cards[j]
            if card_cats.get(c_i) == card_cats.get(c_j):
                matrix[i, j] += 1

sim_matrix = (matrix / n_participants) * 100

# 1. Similarity Matrix Plot (Optimal Workshop Clean Heatmap Style)
fig, ax = plt.subplots(figsize=(14, 12), dpi=300)
cax = ax.imshow(sim_matrix, cmap='YlGnBu', interpolation='nearest', vmin=0, vmax=100)

cbar = fig.colorbar(cax, shrink=0.8)
cbar.set_label('% de Similitud Cognitiva (Agrupación Co-Ocurrente)', fontsize=10)

ax.set_xticks(range(n_cards))
ax.set_yticks(range(n_cards))
ax.set_xticklabels(cards, rotation=90, fontsize=7.5, ha='right')
ax.set_yticklabels(cards, fontsize=7.5)

ax.set_title(
    "Matriz de Similitud - Estudio OptimalSort (N=18 Participantes)\nCámara de Comercio de Alajuela (CCA 2026)",
    fontsize=13,
    fontweight='bold',
    pad=20
)
plt.tight_layout()

sim_path = os.path.join(OUTPUT_DIR, "figura_matriz_similitud_optimalsort.png")
plt.savefig(sim_path, dpi=300)
plt.close()
print(f"Saved Similarity Matrix to: {sim_path}")

# 2. Dendrogram (Hierarchical Clustering - Best Merge Method)
dist_matrix = 1.0 - (sim_matrix / 100.0)
np.fill_diagonal(dist_matrix, 0)

condensed_dist = squareform(dist_matrix, checks=False)
Z = linkage(condensed_dist, method='average')

fig, ax = plt.subplots(figsize=(13, 9), dpi=300)
dendro = dendrogram(
    Z,
    labels=cards,
    orientation='right',
    leaf_font_size=8.5,
    color_threshold=0.35,
    ax=ax
)

ax.set_title(
    "Dendrograma de Conglomerados Jerárquicos (Best Merge Method - N=18 Participantes)\nOptimalSort: Validación Taxonómica y Clústeres Emergentes",
    fontsize=12,
    fontweight='bold',
    pad=15
)
ax.set_xlabel("Distancia de Desacuerdo Cognitivo (1.0 - Índice de Similitud)", fontsize=10, labelpad=10)
plt.tight_layout()

dendro_path = os.path.join(OUTPUT_DIR, "figura_dendrograma_optimalsort.png")
plt.savefig(dendro_path, dpi=300)
plt.close()
print(f"Saved Dendrogram to: {dendro_path}")
