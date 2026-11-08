"use client";

import { useState } from "react";
import { CheckSquare, Square, FileText, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

type BusinessSector = "comercio" | "gastronomia" | "salud" | "servicios";

interface RequirementItem {
  id: string;
  name: string;
  entity: string;
  required: boolean;
  notes: string;
}

const SECTOR_REQUIREMENTS: Record<BusinessSector, { title: string; time: string; items: RequirementItem[] }> = {
  comercio: {
    title: "Comercio Detallista y Almacenes (Abarrotes, Ropa, Ferretería, Librerías)",
    time: "5 a 8 días hábiles con acompañamiento CCA",
    items: [
      { id: "1", name: "Certificación de Uso de Suelo Compatible", entity: "Desarrollo Urbano Municipalidad de Alajuela", required: true, notes: "Verifica que el plan regulador permita actividad comercial en el inmueble." },
      { id: "2", name: "Permiso Sanitario de Funcionamiento (Grupo C - Bajo Riesgo)", entity: "Ministerio de Salud (Área Rectora Alajuela)", required: true, notes: "Trámite simplificado mediante declaración jurada en ventanilla." },
      { id: "3", name: "Póliza de Riesgos del Trabajo RT-Comercial", entity: "Instituto Nacional de Seguros (INS)", required: true, notes: "Obligatoria para empleados o constancia de no patrono emitida por INS." },
      { id: "4", name: "Constancia de estar al día con CCSS y FODESAF", entity: "Caja Costarricense de Seguro Social", required: true, notes: "Verificación digital automática si se tramita con la CCA." },
      { id: "5", name: "Contrato de Arrendamiento o Certificación de Propiedad", entity: "Registro Nacional / Arrendador", required: true, notes: "Debe incluir visto bueno del dueño del local con firma legalizada." },
    ],
  },
  gastronomia: {
    title: "Gastronomía y Alimentos (Restaurantes, Sodas, Cafeterías, Bares)",
    time: "8 a 12 días hábiles con acompañamiento CCA",
    items: [
      { id: "1", name: "Certificación de Uso de Suelo Comercial", entity: "Municipalidad de Alajuela", required: true, notes: "Verifica compatibilidad con normas de ruidos y zonas de parqueo." },
      { id: "2", name: "Permiso Sanitario de Funcionamiento (Grupo B - Riesgo Moderado)", entity: "Ministerio de Salud", required: true, notes: "Requiere inspección sanitaria del área de cocina y trampas de grasa." },
      { id: "3", name: "Certificados de Manipulación de Alimentos del Personal", entity: "INA o entidad autorizada", required: true, notes: "Todos los colaboradores de cocina y servicio deben portar carné vigente." },
      { id: "4", name: "Visto Bueno de Seguridad Humana de Bomberos", entity: "Cuerpo de Bomberos de Costa Rica", required: true, notes: "Revisión de extintores, lámparas de emergencia y rutas de evacuación." },
      { id: "5", name: "Póliza de Riesgos del Trabajo INS y CCSS", entity: "INS / CCSS", required: true, notes: "Estar al día con las cargas sociales patronales." },
    ],
  },
  salud: {
    title: "Salud, Estética y Bienestar (Clínicas, Ópticas, Laboratorios, Spas)",
    time: "10 a 15 días hábiles con acompañamiento CCA",
    items: [
      { id: "1", name: "Certificación de Uso de Suelo Institucional/Comercial", entity: "Municipalidad de Alajuela", required: true, notes: "Revisión de accesibilidad Ley 7600 y parqueos reservados." },
      { id: "2", name: "Permiso Sanitario Tipo A o B según complejidad", entity: "Ministerio de Salud", required: true, notes: "Inspección técnica de equipamiento biomédico y autoclave de esterilización." },
      { id: "3", name: "Autorización de Regencia Profesional Colegiada", entity: "Colegio de Médicos / Odontólogos / Microbiólogos", required: true, notes: "Acreditación del director médico o regente técnico colegiado activo." },
      { id: "4", name: "Plan de Gestión de Residuos Bioinfecciosos", entity: "Gestor ambiental autorizado", required: true, notes: "Contrato de recolección de punzocortantes y material biológico." },
      { id: "5", name: "Póliza INS y Registro Tributario Hacienda", entity: "INS / Ministerio de Hacienda", required: true, notes: "Inscripción en el Registro Único Tributario (RUT)." },
    ],
  },
  servicios: {
    title: "Servicios Profesionales, Oficinas y Talleres Técnicos",
    time: "4 a 6 días hábiles con acompañamiento CCA",
    items: [
      { id: "1", name: "Uso de Suelo para Oficinas / Servicios", entity: "Municipalidad de Alajuela", required: true, notes: "Generalmente compatible en cuadrantes urbanos y centros comerciales." },
      { id: "2", name: "Permiso Sanitario Grupo C (Bajo Riesgo)", entity: "Ministerio de Salud", required: true, notes: "Aprobación exprés en plataforma digital." },
      { id: "3", name: "Póliza de Riesgos del Trabajo INS", entity: "INS", required: true, notes: "Aplica tarifa base de oficina." },
      { id: "4", name: "Inscripción en ATV Hacienda (D-140)", entity: "Dirección General de Tributación", required: true, notes: "Comprobante de actividad lucrativa activa." },
    ],
  },
};

export function ProcedureChecklist() {
  const [selectedSector, setSelectedSector] = useState<BusinessSector>("comercio");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const sectorData = SECTOR_REQUIREMENTS[selectedSector];

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const total = sectorData.items.length;
  const completed = sectorData.items.filter((item) => checkedItems[item.id]).length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="space-y-6">
      {/* Selector de Giro Comercial */}
      <div className="flex flex-wrap gap-2 pb-2">
        {(
          [
            ["comercio", "Comercio Detallista"],
            ["gastronomia", "Gastronomía & Sodas"],
            ["salud", "Salud & Clínicas"],
            ["servicios", "Servicios & Oficinas"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setSelectedSector(key);
              setCheckedItems({});
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedSector === key
                ? "bg-brand text-white shadow-xs"
                : "bg-surface border border-border text-ink hover:bg-surface-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tarjeta del Giro Seleccionado */}
      <div className="cca-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2">
          <div>
            <h3 className="text-lg font-semibold text-ink">{sectorData.title}</h3>
            <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand" />
              <span>Tiempo de tramitación: <strong className="text-ink">{sectorData.time}</strong></span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-text-muted">Progreso de requisitos:</span>
            <div className="text-sm font-mono font-bold text-brand">
              {completed} de {total} ({percentage}%)
            </div>
          </div>
        </div>

        {/* Lista de Requisitos con Checkbox Interactivo */}
        <div className="space-y-3">
          {sectorData.items.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? "bg-brand/5 border-brand/30"
                    : "bg-surface border-border hover:border-border-strong"
                }`}
              >
                <div className="pt-0.5 text-brand shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5 text-text-muted" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-semibold ${isChecked ? "text-brand line-through" : "text-ink"}`}>
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-surface-muted rounded text-text-muted border border-border">
                      {item.entity}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.notes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action de Asistencia Técnica Municipal */}
        <div className="p-4 rounded-xl bg-surface-muted border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-ink">
              ¿Desea que la CCA revise sus documentos antes de presentarlos a la Municipalidad?
            </p>
            <p className="text-[11px] text-text-muted">
              Evite prevenciones y rechazos de licencias. Nuestro equipo revisa su expediente sin costo para asociados.
            </p>
          </div>
          <Link
            href="/contacto?asunto=tramite-patente"
            className="btn-cca-primary px-4 py-2 text-xs font-semibold shrink-0 inline-flex items-center gap-1.5"
          >
            <span>Agendar Revisión Gratuita</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

