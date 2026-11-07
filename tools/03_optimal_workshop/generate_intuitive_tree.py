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

categories = [
    "Institucional y Gobernanza",
    "Afiliaciones y Membresías",
    "Directorio Comercial de Alajuela",
    "Servicios al Comercio",
    "Prensa y Actualidad",
    "Contacto y Soporte"
]

by_cat = {c: {} for c in categories}
total_p = 18

for d in data:
    cat = d["category"]
    card = d["card"]
    if cat in by_cat:
        by_cat[cat][card] = by_cat[cat].get(card, 0) + 1

cat_colors = {
    "Institucional y Gobernanza": "#1e40af",
    "Afiliaciones y Membresías": "#047857",
    "Directorio Comercial de Alajuela": "#b45309",
    "Servicios al Comercio": "#6d28d9",
    "Prensa y Actualidad": "#be185d",
    "Contacto y Soporte": "#0e7490"
}

fig, ax = plt.subplots(figsize=(15, 12), dpi=300)
ax.axis('off')
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)

# Root node
root_x = 0.04
ax.text(root_x, 0.5, "Portal Web CCA\n(Home)", fontsize=11, fontweight='bold', color='white', ha='center', va='center',
        bbox=dict(boxstyle='round,pad=0.6', facecolor='#0f172a', edgecolor='black'))

cat_y_positions = np.linspace(0.92, 0.08, len(categories))

for c_idx, cat_name in enumerate(categories):
    cat_y = cat_y_positions[c_idx]
    color = cat_colors[cat_name]
    
    # Root to category branch
    ax.plot([root_x + 0.05, 0.22], [0.5, cat_y], color='#94a3b8', lw=1.5, zorder=1)
    
    cards_in_cat = sorted(by_cat[cat_name].items(), key=lambda x: x[1], reverse=True)
    avg_pct = np.mean([v/total_p*100 for k, v in cards_in_cat])
    
    # Category node
    cat_label = f"{cat_name}\n({len(cards_in_cat)} contenidos | {avg_pct:.0f}% acuerdo)"
    ax.text(0.30, cat_y, cat_label, fontsize=9.5, fontweight='bold', color=color, ha='center', va='center',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='#f8fafc', edgecolor=color, lw=2))
    
    # Sub-cards
    n_cards = len(cards_in_cat)
    if n_cards > 0:
        spread = 0.06 if n_cards >= 6 else (0.04 if n_cards >= 4 else 0.02)
        sub_y_positions = np.linspace(cat_y + spread, cat_y - spread, n_cards)
        
        for card_idx, (card_name, count) in enumerate(cards_in_cat):
            card_y = sub_y_positions[card_idx]
            pct = (count / total_p) * 100
            
            # Connector
            ax.plot([0.38, 0.48], [cat_y, card_y], color=color, lw=1, alpha=0.5, zorder=1)
            
            # Card pill
            pct_color = '#047857' if pct >= 85 else ('#b45309' if pct >= 75 else '#dc2626')
            card_display = f"{card_name}  ({pct:.0f}% consenso)"
            ax.text(0.49, card_y, card_display, fontsize=8.5, va='center', ha='left',
                    bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#cbd5e1', lw=1))

plt.title("Estructura Jerárquica Validada por los 18 Participantes (OptimalSort)\nConsenso empírico de asignación por cada contenido", 
          fontsize=13, fontweight='bold', pad=25)

tree_path = os.path.join(OUTPUT_DIR, "figura_arbol_jerarquico_validado.png")
plt.savefig(tree_path, dpi=300, bbox_inches='tight')
plt.close()
print(f"Generated clean intuitive Category Tree at: {tree_path}")
