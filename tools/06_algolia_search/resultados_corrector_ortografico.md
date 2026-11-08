# Corrección ortográfica antes de Algolia (corrector local)

**Fecha:** 2026-11-08 09:41 · El corrector solo se activa si Algolia devuelve 0 resultados. Ruta: `src/app/api/corregir/route.ts` → `src/lib/corrector.ts` (Damerau-Levenshtein sobre el vocabulario controlado: nombres, categorías, sectores, ubicaciones y los 52 grupos de sinónimos; máximo 1 error desde 4 letras y 2 desde 8).

| Consulta | Algolia directo | Corregida a | Algolia tras corrección | Primeros resultados |
|---|---|---|---|---|
| carrro | 0 | carro | 23 | Grúas Rago, S.A.; Taller Hermanos Arguedas; Lubricentro El Arroyo |
| vehicullo | 0 | vehiculo | 21 | Grúas Rago, S.A.; Taller Hermanos Arguedas; Lubricentro El Arroyo |
| medicamentoz | 0 | medicamentos | 2 | Farmacias Santa Lucía; Farmacias Chavarría |
| busco un carrro | 0 | busco un carro | 23 | Grúas Rago, S.A.; Taller Hermanos Arguedas; Lubricentro El Arroyo |
| lavadoo | 0 | lavado | 1 | Industrias Quicke |
| yanta | 3 | — | — | Farmacias Santa Lucía; Clínica Santa Fe – Alajuela; Zapatería Santa Cecilia |
| cementto | 0 | cemento | 11 | Grupo Diasa; Distribuidora Fama de Alajuela; La Casa del Zinc |
| herramientaz | 0 | herramientas | 11 | Grupo Diasa; Distribuidora Fama de Alajuela; La Casa del Zinc |
| peluqeria | 0 | peluqueria | 2 | Arguedas Sánchez Centro Odontológico; Gaby Salón & Spa |
| leche | 0 | — | — |  |
| veterinaria | 0 | — | — |  |

Siguen sin resultados `leche` y `veterinaria` porque no hay ningún afiliado de ese tipo: el corrector no los puede inventar.

**Limitación observada:** `yanta` (por 'llanta', con yeísmo) NO activa el corrector. Algolia sí devuelve 3 resultados, pero son irrelevantes: la tolerancia a typos la acerca a 'Santa' (Farmacias Santa Lucía, Clínica Santa Fe). Como el corrector solo entra cuando hay 0 resultados, no puede detectar resultados malos. Este es un caso donde un modelo de lenguaje (Azure OpenAI) sí podría aportar algo.

## Comparación: corrector local vs. Azure OpenAI (gpt-5-mini, Foundry)

**Fecha:** 2026-11-08 · Endpoint `/api/corregir` con `AZURE_OPENAI_*` configurado en `.env.local` · `reasoning_effort: minimal`.

| Consulta | Local | Azure OpenAI | Tiempo Azure |
|---|---|---|---|
| carrro | carro | carro | 2614 ms (primera llamada) |
| vehicullo | vehiculo | vehiculo | 1486 ms |
| medicamentoz | medicamentos | medicamentos | 1383 ms |
| busco un carrro | busco un carro | busco un carro | 1494 ms |
| lavadoo | lavado | lavado | 1646 ms |
| yanta | sin cambio | sin cambio | 1401 ms |
| cementto | cemento | cemento | 1600 ms |
| herramientaz | herramientas | herramienta (con ignorePlurals, Algolia da los mismos 11 resultados) | 1590 ms |
| peluqeria | peluqueria | peluqueria | 1652 ms |
| leche / veterinaria / ferreteria | sin cambio | sin cambio | 1261–1500 ms |

**Resultado:** en esta muestra de 12 consultas, los dos correctores dieron la misma corrección efectiva. Ninguno corrigió `yanta`. Azure tardó en promedio unos 1,5 s por consulta; el local es instantáneo (en el navegador o el servidor, sin llamada externa). Azure solo se llama cuando Algolia devuelve 0 resultados; si falla o no está configurado, el sistema usa el corrector local.
