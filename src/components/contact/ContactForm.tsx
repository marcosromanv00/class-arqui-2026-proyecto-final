"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialAsunto = searchParams.get("asunto") || "Consulta General";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    correo: "",
    asunto: initialAsunto,
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-ink">
          Mensaje Recibido por la Administración
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
          Gracias por contactarnos, <strong className="text-ink">{formData.nombre}</strong>. Su consulta sobre &ldquo;{formData.asunto}&rdquo; ha sido canalizada al departamento correspondiente.
        </p>
        <p className="text-xs text-text-muted">
          Le responderemos al correo <strong className="text-ink">{formData.correo}</strong> o al teléfono <strong className="text-ink">{formData.telefono}</strong> en un plazo máximo de 24 horas hábiles.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              nombre: "",
              empresa: "",
              telefono: "",
              correo: "",
              asunto: "Consulta General",
              mensaje: "",
            });
          }}
          className="btn-cca-secondary px-5 py-2 text-xs font-semibold inline-block mt-2"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 sm:p-8 space-y-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="border-b border-border pb-4">
        <h3 className="font-serif text-xl font-semibold text-ink">
          Enviar Mensaje a la Administración CCA
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Complete los campos y un asesor técnico le responderá a la brevedad.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label htmlFor="nombre" className="block font-medium text-ink mb-1">
            Nombre y Apellidos *
          </label>
          <input
            id="nombre"
            type="text"
            required
            placeholder="Ej. Don Carlos Alvarado"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block font-medium text-ink mb-1">
            Empresa o Negocio (Opcional)
          </label>
          <input
            id="empresa"
            type="text"
            placeholder="Ej. Ferretería del Poás"
            value={formData.empresa}
            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block font-medium text-ink mb-1">
            Teléfono (Costa Rica +506) *
          </label>
          <input
            id="telefono"
            type="tel"
            required
            placeholder="Ej. 2441-8118 o 8492-3925"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none font-mono"
          />
        </div>

        <div>
          <label htmlFor="correo" className="block font-medium text-ink mb-1">
            Correo Electrónico *
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
      </div>

      <div className="text-xs">
        <label htmlFor="asunto" className="block font-medium text-ink mb-1">
          Departamento o Motivo de Consulta *
        </label>
        <select
          id="asunto"
          value={formData.asunto}
          onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
          className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
        >
          <option value="Consulta General">Consulta General / Información Institucional</option>
          <option value="tramite-patente">Asesoría Técnica en Patente Municipal y Uso de Suelo</option>
          <option value="arbitraje">Centro de Arbitraje y Mediación Mercantil (Ley 7727)</option>
          <option value="asesoria-tributaria">Asesoría Legal y Escudo Tributario (Ley 7092)</option>
          <option value="proponer-convenio">Proponer Convenio o Alianza Comercial</option>
          <option value="sala-reuniones">Reserva de Sala de Conferencias para Afiliados</option>
        </select>
      </div>

      <div className="text-xs">
        <label htmlFor="mensaje" className="block font-medium text-ink mb-1">
          Detalle de su Consulta o Solicitud *
        </label>
        <textarea
          id="mensaje"
          rows={4}
          required
          placeholder="Escriba aquí los detalles de su consulta, trámite o requerimiento..."
          value={formData.mensaje}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
          className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-[11px] text-text-muted">
          Horario de atención: Lunes a viernes 8:00 AM - 5:00 PM.
        </span>
        <button
          type="submit"
          disabled={loading}
          className="btn-cca-primary px-6 py-2.5 text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar Consulta"}
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}
