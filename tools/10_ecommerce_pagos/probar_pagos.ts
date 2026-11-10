// Pruebas de la pasarela simulada (src/lib/pagos.ts)
// Uso: node --experimental-strip-types tools/10_ecommerce_pagos/probar_pagos.ts file:///<ruta>/src/lib/pagos.ts
export {};
const mem: Record<string, string> = {};
(globalThis as unknown as { localStorage: { getItem: (k: string) => string | null; setItem: (k: string, v: string) => void } }).localStorage = {
  getItem: (k: string) => mem[k] ?? null,
  setItem: (k: string, v: string) => { mem[k] = v; },
};

const p = await import(process.argv[2]);
const casos: [string, unknown][] = [];
const t = (n: string, v: unknown) => casos.push([n, v]);

t("SINPE válido", p.validarSinpe("8812-3456", "20261108123"));
t("SINPE teléfono fijo (2xxx)", p.validarSinpe("2440-1234", "20261108123"));
t("SINPE comprobante con letras", p.validarSinpe("8812-3456", "SINPE-123"));
t("Tarjeta Visa de prueba 4111…", p.validarTarjeta("4111 1111 1111 1111", "Ana Mora", "12/28", "123"));
t("Tarjeta con un dígito mal", p.validarTarjeta("4111 1111 1111 1112", "Ana Mora", "12/28", "123"));
t("Tarjeta vencida", p.validarTarjeta("4111 1111 1111 1111", "Ana Mora", "01/24", "123"));
t("CVV de 2 dígitos", p.validarTarjeta("4111 1111 1111 1111", "Ana Mora", "12/28", "12"));
t("Tarjeta de rechazo pasa formato", p.validarTarjeta("4000 0000 0000 0002", "Ana Mora", "12/28", "123"));
t("Pago tarjeta aprobada", await p.procesarPago("tarjeta", { numero: "4111111111111111" }));
t("Pago tarjeta de rechazo", await p.procesarPago("tarjeta", { numero: "4000000000000002" }));
t("SINPE primer uso", await p.procesarPago("sinpe", { comprobante: "20261108123" }));
t("SINPE comprobante repetido (anti-replay)", await p.procesarPago("sinpe", { comprobante: "20261108123" }));

for (const [n, v] of casos) console.log(`- ${n}: ${JSON.stringify(v)}`);
