"use client";

import { useState } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";

export function ArbitrajeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    solicitante: "",
    cedula: "",
    empresa: "",
    contraparte: "",
    telefono: "",
    correo: "",
    tipoControversia: "Incumplimiento de Contrato Mercantil",
    montoEstimado: "",
    descripcion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de radicado procesal
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/5 p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-ink">
          Solicitud de Mediación Radicada Exitosamente
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted max-w-lg mx-auto">
          Expediente preliminar <strong className="font-mono text-brand">CAM-2026-089</strong> registrado ante el Centro de Conciliación y Arbitraje de la Cámara de Comercio de Alajuela.
        </p>
        <p className="text-xs text-text-muted max-w-md mx-auto">
          Un abogado mediador colegiado se comunicará al teléfono <strong className="text-ink">{formData.telefono}</strong> en un plazo máximo de 24 horas hábiles para coordinar la audiencia preliminar.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              solicitante: "",
              cedula: "",
              empresa: "",
              contraparte: "",
              telefono: "",
              correo: "",
              tipoControversia: "Incumplimiento de Contrato Mercantil",
              montoEstimado: "",
              descripcion: "",
            });
          }}
          className="btn-cca-secondary px-5 py-2 text-xs font-medium inline-block mt-2"
        >
          Radicar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="cca-card p-6 sm:p-8 space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-semibold text-ink">
          Radicar Solicitud de Audiencia de Mediación Mercantil
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Formulario oficial bajo la Ley RAC N.º 7727. Todos los datos ingresados gozan de estricta confidencialidad procesal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label htmlFor="solicitante" className="block font-medium text-ink mb-1">
            Nombre del Solicitante / Representante Legal *
          </label>
          <input
            id="solicitante"
            type="text"
            required
            placeholder="Ej. Licda. Karla Montero Solís"
            value={formData.solicitante}
            onChange={(e) => setFormData({ ...formData, solicitante: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="cedula" className="block font-medium text-ink mb-1">
            Cédula Física o Jurídica *
          </label>
          <input
            id="cedula"
            type="text"
            required
            placeholder="Ej. 3-101-123456"
            value={formData.cedula}
            onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block font-medium text-ink mb-1">
            Empresa o Razón Social *
          </label>
          <input
            id="empresa"
            type="text"
            required
            placeholder="Ej. Distribuidora del Valle S.A."
            value={formData.empresa}
            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="contraparte" className="block font-medium text-ink mb-1">
            Nombre o Empresa de la Contraparte *
          </label>
          <input
            id="contraparte"
            type="text"
            required
            placeholder="Ej. Proveedora Central S.R.L."
            value={formData.contraparte}
            onChange={(e) => setFormData({ ...formData, contraparte: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block font-medium text-ink mb-1">
            Teléfono de Contacto (Costa Rica +506) *
          </label>
          <input
            id="telefono"
            type="tel"
            required
            placeholder="Ej. 2441-2090 o 8888-1234"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="correo" className="block font-medium text-ink mb-1">
            Correo Electrónico Oficial *
          </label>
          <input
            id="correo"
            type="email"
            required
            placeholder="gerencia@empresa.cr"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="tipoControversia" className="block font-medium text-ink mb-1">
            Materia de la Discrepancia *
          </label>
          <select
            id="tipoControversia"
            value={formData.tipoControversia}
            onChange={(e) => setFormData({ ...formData, tipoControversia: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          >
            <option>Incumplimiento de Contrato Mercantil</option>
            <option>Cobro Judicial / Facturas Pendientes</option>
            <option>Disputa de Arrendamiento Comercial</option>
            <option>Conflicto entre Socios o Accionistas</option>
            <option>Garantía de Suministros o Servicios</option>
          </select>
        </div>

        <div>
          <label htmlFor="montoEstimado" className="block font-medium text-ink mb-1">
            Cuantía Estimada de la Disputa (Colones o USD)
          </label>
          <input
            id="montoEstimado"
            type="text"
            placeholder="Ej. ₡4.500.000 o $8.000 USD"
            value={formData.montoEstimado}
            onChange={(e) => setFormData({ ...formData, montoEstimado: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      <div className="text-xs">
        <label htmlFor="descripcion" className="block font-medium text-ink mb-1">
          Resumen Conciso de los Hechos Disputados *
        </label>
        <textarea
          id="descripcion"
          rows={3}
          required
          placeholder="Describa brevemente las fechas, compromisos adquiridos y el motivo que originó el desacuerdo entre las partes..."
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-[11px] text-text-muted">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Arancel preferencial del 50% de descuento para afiliados activos de la CCA.</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-cca-primary px-6 py-2.5 text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? "Radicando..." : "Enviar Solicitud"}
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}

