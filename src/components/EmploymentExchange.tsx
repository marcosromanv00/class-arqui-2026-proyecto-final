"use client";

import { useState } from "react";
import { JOB_VACANCIES_DATA, JobVacancy } from "@/lib/data";
import { JobApplicationModal } from "@/components/JobApplicationModal";
import { MapPin, Clock, Building, ArrowRight, CheckCircle2 } from "lucide-react";

const CATEGORIES = ["Todas", "Administración", "Logística", "Tecnología", "Ventas"];

export function EmploymentExchange() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [activeVacancy, setActiveVacancy] = useState<JobVacancy | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    <section id="empleo" className="bg-surface-muted py-14 lg:py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-border gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Bolsa de empleo provincial
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Vacantes activas en comercios y empresas asociadas de Alajuela.
            </p>
          </div>
          <a
            href="#contacto"
            className="btn-cca-secondary text-xs px-3.5 py-2 inline-flex items-center gap-1.5 self-start md:self-auto"
          >
            <Building className="w-3.5 h-3.5 text-brand" />
            <span>Publicar vacante como asociado</span>
          </a>
        </div>

        {/* Filtros de Área */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 text-xs">
          <span className="text-ink font-semibold mr-1">Área:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-brand text-surface font-medium"
                  : "bg-surface text-ink-muted border border-border hover:border-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de Vacantes en 2 Columnas Escaneables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="p-5 sm:p-6 bg-surface border border-border rounded-lg flex flex-col justify-between hover:border-brand/40 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-xs font-semibold text-brand">
                    {job.category}
                  </span>
                  <span className="text-text-muted flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3" /> {job.postedDate}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-ink">
                  {job.title}
                </h3>

                <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1 font-medium">
                  <Building className="w-3.5 h-3.5 shrink-0 text-text-muted" />
                  <span>{job.company}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs">
                  <span className="flex items-center gap-1 text-text-muted">
                    <MapPin className="w-3 h-3" /> {job.canton}
                  </span>
                  <span>·</span>
                  <span className="text-ink bg-surface-muted px-1.5 py-0.5 rounded text-[11px]">
                    {job.type}
                  </span>
                  <span>·</span>
                  <span className="font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
                    {job.salaryRange}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-border space-y-1">
                  <span className="text-xs font-semibold text-ink block">
                    Requisitos:
                  </span>
                  <ul className="space-y-0.5">
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5 text-xs text-ink-muted">
                        <CheckCircle2 className="w-3 h-3 text-brand shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-text-muted">
                  Contacto directo con RR. HH.
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVacancy(job)}
                  className="btn-cca-primary px-3.5 py-1.5 text-xs inline-flex items-center gap-1.5"
                >
                  <span>Postularme</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>

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
