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
    <section id="empleo" className="bg-surface-muted py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-border gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
              Talento y Competitividad Provincial
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink tracking-tight mt-1">
              Bolsa de empleo y vinculación laboral
            </h2>
          </div>
          <a
            href="#contacto"
            className="btn-cca-secondary text-xs sm:text-sm px-4 py-2 inline-flex items-center gap-2 self-start md:self-end"
          >
            <Building className="w-4 h-4 text-brand" />
            <span>Publicar plaza como empresa asociada</span>
          </a>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
          <span className="text-ink font-medium mr-1">Área laboral:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-brand text-surface shadow-xs"
                  : "bg-surface text-ink-muted border border-border hover:border-border-strong"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de Vacantes en Cuadrícula 2 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="p-6 sm:p-7 bg-surface border border-border rounded-xl flex flex-col justify-between hover:border-brand/40 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-muted text-ink-muted font-medium border border-border">
                    {job.category}
                  </span>
                  <span className="text-text-muted flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" /> {job.postedDate}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-ink">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-muted mt-1 flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 shrink-0 text-brand" />
                  <span>{job.company}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <span className="flex items-center gap-1 text-text-muted">
                    <MapPin className="w-3.5 h-3.5" /> {job.canton}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-ink bg-surface-muted px-2 py-0.5 rounded-sm">
                    {job.type}
                  </span>
                  <span>·</span>
                  <span className="font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                    {job.salaryRange}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-4 pt-3 border-t border-border space-y-1.5">
                  <span className="text-xs font-semibold text-ink block">
                    Requisitos principales:
                  </span>
                  <ul className="space-y-1">
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-xs text-ink-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-text-muted">
                  Contacto directo con RR. HH.
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVacancy(job)}
                  className="btn-cca-primary px-4 py-2 text-xs sm:text-sm inline-flex items-center gap-1.5"
                >
                  <span>Postularme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
