"use client";

import { useState } from "react";
import { JOB_VACANCIES_DATA, JobVacancy } from "@/lib/data";
import { JobApplicationModal } from "@/components/JobApplicationModal";
import { MapPin, Clock, CheckCircle2, Building, ArrowRight } from "lucide-react";

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
    <section id="empleo" className="border-b border-neutral-200 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial Estilo ICC */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-8 mb-10 gap-6">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-[#991b1b] mb-2">
              Intermediación Laboral Provincial · Reactivación /oferentes/
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090b] tracking-tight">
              Bolsa de Empleo Cantonal & Pasantías
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl leading-relaxed">
              Conectamos la demanda de talento de parques industriales de El Coyol y comercios de Alajuela con profesionales locales. Vacantes con rangos salariales transparentes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#afiliacion"
              className="border border-neutral-300 hover:border-[#09090b] text-xs px-4 py-2.5 font-bold text-[#09090b] transition-colors flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-[#991b1b]" />
              <span>Publicar vacante comercial</span>
            </a>
          </div>
        </div>

        {/* Filtros por Categoría */}
        <div className="flex flex-wrap items-center gap-1 mb-8">
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider mr-2 text-[11px]">
            Filtrar por área:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#991b1b] text-white"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Vacantes Activas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-neutral-200 hover:border-neutral-400 p-6 flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="font-bold text-[#991b1b] uppercase tracking-wider text-[10px]">
                    {job.category}
                  </span>
                  <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.postedDate}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#09090b] leading-snug group-hover:text-[#991b1b] transition-colors">
                  {job.title}
                </h3>
                
                <p className="text-xs font-semibold text-neutral-700 mt-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-neutral-400" />
                  {job.company}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400" /> {job.district}, {job.canton}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-neutral-800 bg-neutral-100 px-2 py-0.5 text-[11px]">
                    {job.type}
                  </span>
                  <span>·</span>
                  <span className="font-mono font-bold text-neutral-900">
                    {job.salaryRange}
                  </span>
                </div>

                <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                  {job.description}
                </p>

                {/* Requisitos clave */}
                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Requisitos:</span>
                  {job.requirements.map((req, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-1.5 text-xs text-neutral-600">
                      <CheckCircle2 className="w-3 h-3 text-[#991b1b] shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-mono">
                  Ref: {job.id.toUpperCase()}
                </span>
                <button
                  onClick={() => setActiveVacancy(job)}
                  className="bg-[#09090b] hover:bg-[#991b1b] text-white px-4 py-2 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>Postularme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Descompuesto */}
        {activeVacancy && (
          <JobApplicationModal
            vacancy={activeVacancy}
            onClose={() => setActiveVacancy(null)}
            onSubmit={handleApply}
            applicantName={applicantName}
            setApplicantName={setApplicantName}
            applicantEmail={applicantEmail}
            setApplicantEmail={setApplicantEmail}
            applicantPhone={applicantPhone}
            setApplicantPhone={setApplicantPhone}
            submitted={submitted}
          />
        )}

      </div>
    </section>
  );
}
