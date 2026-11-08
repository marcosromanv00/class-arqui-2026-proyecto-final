"use client";

import { useState } from "react";
import { Calculator, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ConveniosCalculator() {
  const [numEmpleados, setNumEmpleados] = useState(5);
  const [ventasTarjeta, setVentasTarjeta] = useState(2500000); // ₡2.5M
  const [combustibleMes, setCombustibleMes] = useState(150000); // ₡150k

  // Cálculos de ahorro
  // 1. Salud privada empresarial: ahorro estimado ₡10.000 / mes por empleado
  const ahorroSalud = numEmpleados * 10000 * 12;

  // 2. Tasa reducida datáfono BAC: ahorro ~0.8% sobre ventas con tarjeta
  const ahorroTerminal = Math.round(ventasTarjeta * 0.008 * 12);

  // 3. Combustibles: ~3% de descuento en flotas
  const ahorroCombustible = Math.round(combustibleMes * 0.03 * 12);

  const totalAhorroAnual = ahorroSalud + ahorroTerminal + ahorroCombustible;

  // Costo membresía anual Pyme: ₡28.000 * 12 = ₡336.000
  const costoMembresiaAnual = 28000 * 12;
  const beneficioNeto = Math.max(0, totalAhorroAnual - costoMembresiaAnual);
  const roiMultiplicador = (totalAhorroAnual / costoMembresiaAnual).toFixed(1);

  return (
    <div className="cca-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider">
        <Calculator className="w-4 h-4" />
        <span>Calculadora de Retorno de Inversión (ROI) para Asociados</span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-ink">
          ¿Cuánto puede ahorrar su empresa con los convenios de la Cámara?
        </h3>
        <p className="text-xs text-text-muted">
          Ajuste las variables de su negocio para estimar el ahorro neto anual frente a la cuota gremial de afiliación:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Control 1: Empleados */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label htmlFor="range-empleados" className="font-medium text-ink">Número de Colaboradores:</label>
            <span className="font-mono font-bold text-brand">{numEmpleados}</span>
          </div>
          <input
            id="range-empleados"
            type="range"
            min={1}
            max={50}
            value={numEmpleados}
            onChange={(e) => setNumEmpleados(Number(e.target.value))}
            className="w-full accent-brand cursor-pointer"
          />
          <p className="text-[11px] text-text-muted">Convenios en chequeos médicos, clínicas y salud visual.</p>
        </div>

        {/* Control 2: Ventas Tarjeta */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label htmlFor="range-tarjeta" className="font-medium text-ink">Ventas Mensuales con Tarjeta:</label>
            <span className="font-mono font-bold text-brand">₡{(ventasTarjeta / 1000000).toFixed(1)}M</span>
          </div>
          <input
            id="range-tarjeta"
            type="range"
            min={500000}
            max={20000000}
            step={500000}
            value={ventasTarjeta}
            onChange={(e) => setVentasTarjeta(Number(e.target.value))}
            className="w-full accent-brand cursor-pointer"
          />
          <p className="text-[11px] text-text-muted">Tarifas preferenciales en datáfonos BAC Compra-Click.</p>
        </div>

        {/* Control 3: Combustible */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label htmlFor="range-combustible" className="font-medium text-ink">Gasto Mensual en Combustible:</label>
            <span className="font-mono font-bold text-brand">₡{(combustibleMes / 1000).toFixed(0)}k</span>
          </div>
          <input
            id="range-combustible"
            type="range"
            min={20000}
            max={1500000}
            step={20000}
            value={combustibleMes}
            onChange={(e) => setCombustibleMes(Number(e.target.value))}
            className="w-full accent-brand cursor-pointer"
          />
          <p className="text-[11px] text-text-muted">Descuento corporativo de ₡15 por litro en estaciones.</p>
        </div>
      </div>

      {/* Resultados del ROI */}
      <div className="rounded-xl bg-surface-muted border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-text-muted uppercase">Ahorro Anual Estimado</span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-brand">
            ₡{totalAhorroAnual.toLocaleString("es-CR")}
          </div>
          <p className="text-xs text-text-muted">
            Su ahorro supera la cuota gremial en <strong className="text-ink">{roiMultiplicador}x</strong> (Beneficio neto de ₡{beneficioNeto.toLocaleString("es-CR")} al año).
          </p>
        </div>

        <Link
          href="/afiliarse"
          className="btn-cca-primary px-5 py-2.5 text-xs font-semibold shrink-0 inline-flex items-center gap-1.5"
        >
          <span>Activar Beneficios Ahora</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

