"use client";

import { useState } from "react";
import { JOB_VACANCIES_DATA, JobVacancy } from "@/lib/data";
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle2, Send, X, Building, ArrowUpRight } from "lucide-react";

export function EmploymentExchange() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [activeVacancy, setActiveVacancy] = useState<JobVacancy | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = ["Todas", "Administración", "Logística", "Tecnología", "Ventas"];

  const filteredJobs = JOB_VACANCIES_DATA.filter((job) => {
    return selectedCategory === "Todas" || job.category === selectedCategory;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveVacancy(null);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
    }, 2800);
  };

  return (
    <section id="empleo" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la Bolsa de Empleo (Rescatada de la página original /oferentes/) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-8 mb-10 gap-6">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
              Intermediación Laboral Provincial · Reactivación /oferentes/
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight">
              Bolsa de Empleo Cantonal & Pasantías
            </h2>
            <p className="mt-2.5 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Conectamos la demanda de talento de parques industriales de El Coyol y comercios de Alajuela con profesionales locales. Vacantes auditadas con rangos salariales transparentes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#afiliacion"
              className="clay-button-secondary text-xs px-4 py-2.5 font-semibold text-slate-800 hover:text-[#991b1b] flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Publicar vacante comercial</span>
            </a>
          </div>
        </div>

        {/* Filtros por Categoría Ocupacional */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mr-2 text-[11px]">
            Filtrar por área:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === cat
                  ? "bg-[#991b1b] text-white shadow-[0_2px_8px_rgba(153,27,27,0.35)]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Vacantes Activas en Claymorph Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="clay-card rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between hover:border-red-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-bold text-[#991b1b] uppercase tracking-wider text-[10px] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                    {job.category}
                  </span>
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.postedDate}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#09090b] leading-snug">
                  {job.title}
                </h3>
                
                <p className="text-xs font-semibold text-slate-700 mt-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {job.company}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {job.district}, {job.canton}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {job.type}
                  </span>
                  <span>·</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {job.salaryRange}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {job.description}
                </p>

                {/* Requisitos clave */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Requisitos:</span>
                  {job.requirements.map((req, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  Ref: {job.id.toUpperCase()}
                </span>
                <button
                  onClick={() => setActiveVacancy(job)}
                  className="clay-button-primary px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Postularme</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal de Postulación Digital Directa */}
        {activeVacancy && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="clay-card max-w-lg w-full bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveVacancy(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-1"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#991b1b] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  Postulación de Candidatura
                </span>
                <h3 className="text-xl font-bold text-[#09090b] mt-2">
                  {activeVacancy.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeVacancy.company} · {activeVacancy.district}, {activeVacancy.canton}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-950">¡Postulación Enviada con Éxito!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Sus datos han sido transmitidos al departamento de recursos humanos de la empresa agremiada. Recibirá confirmación en su correo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Ej: Sofía Solís Murillo"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#991b1b]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="sofia@ejemplo.cr"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#991b1b]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+506 8888-0000"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#991b1b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Enlace a LinkedIn o Portafolio (Opcional)</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/perfil"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#991b1b]"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Al postularse, sus datos son tratados bajo la Política de Privacidad de la Cámara de Comercio de Alajuela para intermediación de empleo cantonal.
                  </p>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveVacancy(null)}
                      className="clay-button-secondary px-4 py-2 text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="clay-button-primary px-5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirmar Postulación</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
