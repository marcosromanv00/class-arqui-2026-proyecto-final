# Resultados reales · Prueba de usabilidad del Portal CCA (8/11/2026)

**Fuente:** `respuestas_prueba.csv` (Google Forms, N = 5) procesado con `calcular_resultados.py` + Microsoft Clarity (proyecto `zaksg7xnz7`), ventana 8/11/2026 17:00–23:59.

## Participantes
| Código | Edad | Dispositivo | Compras/trámites en línea |
|---|---|---|---|
| P1 | 18–25 | Computadora | A veces |
| P2 | 51 o más | Computadora | Nunca |
| P3 | 26–35 | Computadora | Frecuentemente |
| P4 | 36–50 | Celular | A veces |
| P5 | 18–25 | Computadora | A veces |

## SUS (Brooke, 1996)
| P1 | P2 | P3 | P4 | P5 | **Promedio** |
|---|---|---|---|---|---|
| 85.0 | 85.0 | 97.5 | 97.5 | 100.0 | **93.0** (DE 7.4) |

Referencia: 68 = promedio de la industria (Sauro, 2011). Con N = 5 el intervalo de confianza es amplio; el valor es indicativo.

## Misiones
| Misión | Éxito autodeclarado | Verificación | SEQ (1–7) |
|---|---|---|---|
| M1 · Comercio gastronómico | 5/5 | Los 5 comercios anotados existen en el directorio y son del sector *Alimentos y Gastronomía*. 3 son restaurantes (Sabor de la Montaña, Pollos del Este, Pizza a la leña Cacao); P4 anotó una cafetería (Café Casa Atelier) y P5 una panadería (Sabor & Pan). Criterio estricto "restaurante o soda": 3/5. | 6.2 |
| M2 · Afiliación + pago | 5/5 | Los 5 anotaron un radicado válido (CCA-2026-######). | 6.4 |

**Recuperación del error de pago (M2):** 4 de 5 cambiaron a la tarjeta válida tras el rechazo ("cambié de tarjeta", "cambiar", "cambiar el número por uno válido", "cambiar, estaba preparado"). P3 usó directamente la tarjeta válida y no vio el rechazo.

## Comentarios
- Lo más difícil: "que no se separara el número de comprobante en el formato que se pide" (P1); "el formulario" (P3).
- Lo que más gustó: "detalles al buscar" (P2), "buscador" (P3), "facilidad con pocos pasos" (P4).

## Clarity (8/11/2026 17:00–23:59)
| Métrica | Valor |
|---|---|
| Sesiones | 6 (2 de bot excluidas) |
| Páginas por sesión | 3.33 |
| Profundidad de scroll | 46.90 % |
| Tiempo activo promedio | 7.3 min |
| Rage clicks (clics continuos) | 0 % |
| Dead clicks (clics fallidos) | 50 % (3 sesiones) |
| Quick backs (retrocesos rápidos) | 33.33 % (2 sesiones) |
| Visitas de página (día) | Inicio 16 · /afiliarse 15 · /directorio 5 |

### Heatmap de clics · Inicio (`evidencias/clarity-Heatmaps1.png`, 13 clics)
| # | Elemento | Clics |
|---|---|---|
| 1 | Caja del buscador (`#hero-search-input`) | 4 (30.77 %) |
| 2 | Botón "Buscar" | 4 (30.77 %) |
| 3 | Título "El gremio que defiende…" (texto, no clicable) | 2 (15.38 %) |
| 4 | "Asociar mi empresa" | 1 (7.69 %) |
| 5 | Fila "Red Cantonal" (texto, no clicable) | 1 (7.69 %) |
| 6 | "Asociar mi Empresa" (encabezado) | 1 |

Lectura: el 61.5 % de los clics de la portada fue al buscador → la Misión 1 se resolvió buscando, no navegando el menú. Los clics sobre el título y la fila "Red Cantonal" son clics en elementos no interactivos (candidatos a los *dead clicks*).

### Heatmap de clics · /afiliarse (`evidencias/clarity-Heatmaps2-afiliacion.png`, 145 clics, 36 elementos)
| # | Elemento | Clics |
|---|---|---|
| 1 | Campo nombre del comercio (`#wizard-input-name`) | 19 (13.10 %) |
| 2 | Campo enmascarado por Clarity (dato del formulario) | 12 (8.28 %) |
| 3 | Campo teléfono (`#wizard-input-phone`) | 10 (6.90 %) |
| 4 | Campo comprobante SINPE (`#wizard-input-comprobante`) | 10 (6.90 %) |
| 5 | Botón primario (continuar/pagar) | 9 (6.21 %) |
| 6 | Campo tarjeta (`#wizard-input-tarjeta`) | 9 (6.21 %) |

Lectura: aunque la Misión 2 pedía pagar con tarjeta, el campo de comprobante SINPE recibió tantos clics como el de tarjeta (10 vs 9): SINPE es la pestaña por defecto y varios participantes interactuaron con ella antes de cambiar a Tarjeta. Coincide con el comentario de P1 sobre el formato del comprobante.

Nota: 6 sesiones para 5 participantes (una puede ser del facilitador o un participante que recargó en otro navegador).
