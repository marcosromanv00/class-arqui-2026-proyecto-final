"""
Calcula los resultados de la prueba de usabilidad a partir del CSV exportado de Google Forms.

Uso:  python calcular_resultados.py respuestas_prueba.csv

Detecta las columnas por su texto:
  - SUS: las 10 columnas cuyo encabezado empieza con "P1".."P10" (orden de cuestionario_sus_10_preguntas.md).
  - Éxito: columnas que contienen "pudo completar" (una por tarea, en orden).
  - SEQ: columnas que contienen "qué tan fácil" (una por tarea, en orden).
SUS (Brooke, 1996): ítems impares = respuesta - 1; pares = 5 - respuesta; suma x 2,5.
"""
import csv
import re
import statistics
import sys


def numero(v):
    m = re.search(r"\d+", v or "")
    return int(m.group()) if m else None


def main(ruta):
    with open(ruta, encoding="utf-8-sig", newline="") as f:
        filas = list(csv.DictReader(f))
    if not filas:
        sys.exit("El CSV no tiene respuestas.")
    cols = list(filas[0].keys())

    sus_cols = []
    for i in range(1, 11):
        c = next((c for c in cols if re.match(rf"\s*\**P{i}\b", c)), None)
        if not c:
            sys.exit(f"No encontré la columna de la pregunta P{i} del SUS. Encabezados: {cols}")
        sus_cols.append(c)
    exito_cols = [c for c in cols if "pudo completar" in c.lower()]
    seq_cols = [c for c in cols if "qué tan fácil" in c.lower() or "que tan facil" in c.lower()]
    cod_col = next((c for c in cols if "código" in c.lower() or "codigo" in c.lower()), None)

    print(f"Participantes: N = {len(filas)}\n")
    print("SUS por participante:")
    puntajes = []
    for n, fila in enumerate(filas, 1):
        r = [numero(fila[c]) for c in sus_cols]
        if None in r:
            print(f"  fila {n}: respuestas SUS incompletas, se omite")
            continue
        s = sum((v - 1) if i % 2 == 0 else (5 - v) for i, v in enumerate(r)) * 2.5
        puntajes.append(s)
        print(f"  {fila.get(cod_col, f'fila {n}') if cod_col else f'fila {n}'}: {s:.1f}")
    if puntajes:
        print(f"\nSUS promedio: {statistics.mean(puntajes):.1f}"
              + (f" (DE {statistics.stdev(puntajes):.1f}, mín {min(puntajes):.1f}, máx {max(puntajes):.1f})" if len(puntajes) > 1 else ""))
        print("Referencia: 68 = promedio de la industria (Sauro, 2011).")

    for t, c in enumerate(exito_cols, 1):
        si = sum(1 for f in filas if (f[c] or "").strip().lower().startswith("s"))
        print(f"\nTarea {t}: éxito autodeclarado {si}/{len(filas)} ({100 * si / len(filas):.0f}%)")
        if t <= len(seq_cols):
            v = [numero(f[seq_cols[t - 1]]) for f in filas if numero(f[seq_cols[t - 1]])]
            if v:
                print(f"         SEQ promedio {statistics.mean(v):.1f} / 7")
    print("\nOjo: el éxito autodeclarado se debe verificar contra la respuesta escrita y las grabaciones de Clarity.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
