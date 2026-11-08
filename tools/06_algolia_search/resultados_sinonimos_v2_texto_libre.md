# Ampliación del vocabulario controlado (v2) y búsqueda en texto libre

**Fecha de medición:** 2026-11-08 · **Índice:** `cca_directorio_comercial` (171 registros reales) · **Consulta:** API REST de Algolia con la Search-Only key.

## Cambios aplicados
- Sinónimos: **28 → 52 grupos** (29 bidireccionales, 23 unidireccionales), en `sinonimos_cca.json`. Cada grupo nuevo apunta a una categoría o nombre que existe en los 171 registros y documenta su `_motivo`. Task de Algolia: 88329908130.
- Configuración: `removeWordsIfNoResults: "allOptional"` en `index_algolia.js`, para frases en lenguaje natural. Task de Algolia: 88329897791.

## Antes / después (nbHits y primeros resultados)

| Consulta | Antes | Después | Primeros resultados (después) |
|---|---|---|---|
| carro | 3 (irrelevantes por typos: Los Manantiales, Corporación Arrocera, Lubricentro El Arroyo) | 23 | Grúas Rago, Taller Hermanos Arguedas, Lubricentro El Arroyo, Diresa Repuestos |
| vehiculo | 0 | 21 | Grúas Rago, Taller Hermanos Arguedas, Lubricentro El Arroyo |
| busco un taller para mi carro | 0 | 24 | Taller Hermanos Arguedas, Grúas Rago, Lubricentro El Arroyo |
| llanta | 0 | 21 | Taller Hermanos Arguedas, Diresa Repuestos, Pretecma |
| cambio de aceite | 0 | 21 | Lubricentro El Arroyo, Taller Hermanos Arguedas, Pretecma |
| medicamentos | 0 | 2 | Farmacias Santa Lucía, Farmacias Chavarría |
| fiesta | 1 | 2 | Fiesta Casino Alajuela, Eventos La Complacencia |
| cemento | 0 | 11 | Grupo Diasa, Distribuidora Fama, La Casa del Zinc |
| taxi | 0 | 21 | Cootaxa R.L, Natural Car rental, ... |
| pan | 4 | 6 | Panadería Alberto Leandro, Pastelería Inglesa, Trigo Miel |
| pagina web | 0 | 1 | SER DIGITAL |
| peluqueria | 0 | 2 | Arguedas Sánchez Centro Odontológico, Gaby Salón & Spa |

**Consultas sin resultados en esta muestra de 12:** 8 → 0.

## Limitaciones observadas
- `taxi → transporte` también coincide con el sector "Automotriz y Transporte", así que trae 21 resultados. Cootaxa aparece primero, pero el resto es ruido.
- `peluqueria → estetica` incluye un centro odontológico clasificado en "Estética" en el sitio oficial. Es un problema de los datos de origen, no del sinónimo.
- `busco un taller para mi carro` incluye "Hamburguesas Los Talleres #3" porque el nombre contiene "Talleres".
- **Los sinónimos no toleran errores de tipeo.** La palabra tiene que llegar bien escrita para que se aplique el sinónimo: `carrro` = 0, `vehicullo` = 0, `medicamentoz` = 0. En cambio, la tolerancia a typos sí funciona sobre los datos del comercio: `farmasia` = 2 farmacias.
- Simulación de tráfico repetida con la configuración nueva: **sin resultados 2/35 (6%)**, contra 23% al inicio y 9% después de los primeros 28 sinónimos. Siguen sin resultados `leche` y `veterinaria`, porque no hay ningún comercio de ese tipo entre los afiliados. `soda el parqe` pasó de 0 a 3 por `allOptional`: devuelve otras sodas (no existe "Soda el Parque"), así que parte de la mejora es una **coincidencia parcial**, no exacta. Tabla completa en `resultados_simulacion_v3_texto_libre.md`.
- Esta muestra es de 12 consultas elegidas para validar los sinónimos nuevos. **No reemplaza** la simulación de tráfico del Cap. 9 (23% → 9%); para actualizar esa tasa hay que volver a correr `simular_busquedas.mjs`.
