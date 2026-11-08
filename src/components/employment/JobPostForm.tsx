"use client";

import { useState } from "react";
import { Send, CheckCircle2, Building, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export function JobPostForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    codigoAfiliado: "",
    empresa: "",
    contacto: "",
    telefono: "",
    correo: "",
    titulo: "",
    categoria: "Administración",
    canton: "Alajuela",
    distrito: "Alajuela Centro",
    jornada: "Tiempo Completo",
    salario: "",
    descripcion: "",
    requisitos: "",
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
      <div className="cca-card p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-ink">
          Plaza Laboral Recibida para Validación Gremial
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted max-w-lg mx-auto">
          Su convocatoria para el puesto de <strong className="text-ink">{formData.titulo}</strong> ha sido radicada. Nuestro equipo validará el código de afiliado <span className="font-mono text-brand">{formData.codigoAfiliado || "CCA-SOCIO"}</span> y publicará la plaza en menos de 4 horas hábiles.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/empleo" className="btn-cca-primary px-5 py-2 text-xs font-semibold">
            Ir a la Bolsa de Empleo
          </Link>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                codigoAfiliado: "",
                empresa: "",
                contacto: "",
                telefono: "",
                correo: "",
                titulo: "",
                categoria: "Administración",
                canton: "Alajuela",
                distrito: "Alajuela Centro",
                jornada: "Tiempo Completo",
                salario: "",
                descripcion: "",
                requisitos: "",
              });
            }}
            className="btn-cca-secondary px-5 py-2 text-xs font-semibold"
          >
            Publicar otra plaza
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="cca-card p-6 sm:p-8 space-y-6">
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-ink">
            Formulario de Publicación de Vacante Laboral
          </h3>
          <p className="text-xs text-text-muted">
            Canal exclusivo para empresas y comercios agremiados a la Cámara de Comercio de Alajuela.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-brand font-medium bg-brand/5 border border-brand/20 px-2.5 py-1 rounded">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Servicio Gratuito para Socios</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label htmlFor="codigoAfiliado" className="block font-medium text-ink mb-1">
            Código de Afiliado CCA (o Cédula Jurídica) *
          </label>
          <input
            id="codigoAfiliado"
            type="text"
            required
            placeholder="Ej. CCA-005 o 3-101-123456"
            value={formData.codigoAfiliado}
            onChange={(e) => setFormData({ ...formData, codigoAfiliado: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none font-mono"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block font-medium text-ink mb-1">
            Nombre Comercial de la Empresa *
          </label>
          <input
            id="empresa"
            type="text"
            required
            placeholder="Ej. Bufete Valverde & Asoc."
            value={formData.empresa}
            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="contacto" className="block font-medium text-ink mb-1">
            Nombre de la Persona de Contacto / RRHH *
          </label>
          <input
            id="contacto"
            type="text"
            required
            placeholder="Ej. Lic. Fernando Rojas"
            value={formData.contacto}
            onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="correo" className="block font-medium text-ink mb-1">
            Correo Oficial para Recibir CVs *
          </label>
          <input
            id="correo"
            type="email"
            required
            placeholder="empleos@empresa.cr"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="titulo" className="block font-medium text-ink mb-1">
            Título de la Plaza Vacante *
          </label>
          <input
            id="titulo"
            type="text"
            required
            placeholder="Ej. Contador Junior / Encargado de Bodega"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block font-medium text-ink mb-1">
            Área / Categoría Ocupacional *
          </label>
          <select
            id="categoria"
            value={formData.categoria}
            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          >
            <option>Administración</option>
            <option>Logística</option>
            <option>Tecnología</option>
            <option>Ventas</option>
            <option>Gastronomía</option>
            <option>Salud</option>
            <option>Operario</option>
          </select>
        </div>

        <div>
          <label htmlFor="jornada" className="block font-medium text-ink mb-1">
            Tipo de Jornada *
          </label>
          <select
            id="jornada"
            value={formData.jornada}
            onChange={(e) => setFormData({ ...formData, jornada: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          >
            <option>Tiempo Completo</option>
            <option>Medio Tiempo</option>
            <option>Híbrido</option>
          </select>
        </div>

        <div>
          <label htmlFor="salario" className="block font-medium text-ink mb-1">
            Rango Salarial Ofrecido (Bruto mensual)
          </label>
          <input
            id="salario"
            type="text"
            placeholder="Ej. ₡450.000 - ₡550.000"
            value={formData.salario}
            onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none font-mono"
          />
        </div>
      </div>

      <div className="text-xs space-y-4">
        <div>
          <label htmlFor="descripcion" className="block font-medium text-ink mb-1">
            Descripción de las Responsabilidades Principales *
          </label>
          <textarea
            id="descripcion"
            rows={3}
            required
            placeholder="Detalle las funciones principales del puesto, horarios y lugar físico de trabajo..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="requisitos" className="block font-medium text-ink mb-1">
            Requisitos Específicos (Separados por coma o renglón) *
          </label>
          <textarea
            id="requisitos"
            rows={2}
            required
            placeholder="Ej. Técnico en contabilidad, 1 año de experiencia, residencia en Alajuela, manejo de Excel..."
            value={formData.requisitos}
            onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-ink focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-[11px] text-text-muted">
          * La publicación incluye difusión en los boletines y redes sociales de la CCA.
        </span>
        <button
          type="submit"
          disabled={loading}
          className="btn-cca-primary px-6 py-2.5 text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Publicar Plaza"}
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}

