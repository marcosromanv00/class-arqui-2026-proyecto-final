"use client";

import { useState, useMemo } from "react";
import { JOB_VACANCIES_DATA, JobVacancy } from "@/lib/data";
import { JobApplicationModal } from "@/components/JobApplicationModal";
import { Search, MapPin, Briefcase, DollarSign, Calendar, Building2, Send, PlusCircle } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["Todas", "Administración", "Logística", "Tecnología", "Ventas", "Salud", "Operario"];
const CANTONS = ["Todos", "Alajuela Centro", "El Coyol", "San Rafael", "San Ramón"];

export function EmploymentClientView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCanton, setSelectedCanton] = useState("Todos");
  const [activeVacancy, setActiveVacancy] = useState<JobVacancy | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    }, 2500);
  };

  const handleCloseModal = () => {
    setActiveVacancy(null);
    setSubmitted(false);
  };

  const filteredVacancies = useMemo(() => {
    return JOB_VACANCIES_DATA.filter((v) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        v.title.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q);

      const matchesCat = selectedCategory === "Todas" || v.category === selectedCategory;
      const matchesCanton =
        selectedCanton === "Todos" ||
        v.district.toLowerCase().includes(selectedCanton.toLowerCase()) ||
        v.canton.toLowerCase().includes(selectedCanton.toLowerCase());

      return matchesSearch && matchesCat && matchesCanton;
    });
  }, [searchQuery, selectedCategory, selectedCanton]);

  return (
    <div className="space-y-8">
      {/* Controles de Búsqueda y Filtro */}
      <div className="cca-card p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plaza por título, empresa o requisitos (ej. contable, logística, soporte)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-surface text-xs sm:text-sm text-ink placeholder:text-text-muted focus:border-brand focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-xs sm:text-sm text-ink focus:border-brand focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "Todas" ? "Todas las áreas" : `Área: ${cat}`}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCanton}
              onChange={(e) => setSelectedCanton(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-xs sm:text-sm text-ink focus:border-brand focus:outline-none"
            >
              {CANTONS.map((c) => (
                <option key={c} value={c}>
                  {c === "Todos" ? "Todas las zonas" : `Zona: ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-border text-xs gap-3">
          <span className="text-text-muted">
            Mostrando <strong className="text-ink">{filteredVacancies.length}</strong> puestos vacantes activos
          </span>

          <Link
            href="/empleo/publicar"
            className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>¿Es una empresa asociada? Publique su plaza aquí</span>
          </Link>
        </div>
      </div>

      {/* Grid de Vacantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVacancies.map((vacancy) => (
          <div
            key={vacancy.id}
            className="bg-surface border border-border rounded-xl p-6 flex flex-col justify-between hover:border-brand/40 hover:shadow-xs transition-all duration-200"
          >
            <div>
              <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-brand/5 text-brand text-[10px] font-mono font-semibold border border-brand/20 uppercase tracking-wider">
                      {vacancy.category}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      {vacancy.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink text-base sm:text-lg mt-1.5 leading-snug">
                    {vacancy.title}
                  </h3>
                  <p className="text-xs font-medium text-ink-muted flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-text-muted" />
                    <span>{vacancy.company}</span>
                  </p>
                </div>
                <span className="text-[11px] text-text-muted shrink-0 font-mono">
                  {vacancy.postedDate}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-4">
                {vacancy.description}
              </p>

              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-ink block text-[11px] uppercase tracking-wider">
                  Requisitos Principales:
                </span>
                <ul className="space-y-1 text-ink-muted">
                  {vacancy.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-brand shrink-0">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-4">
              <div className="text-xs">
                <span className="text-text-muted block text-[10px] uppercase font-mono">Rango Salarial</span>
                <span className="font-mono font-semibold text-ink text-xs sm:text-sm">
                  {vacancy.salaryRange}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveVacancy(vacancy)}
                className="btn-cca-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Postularme Ahora</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Postulación Rápida de CV */}
      {activeVacancy && (
        <JobApplicationModal
          vacancy={activeVacancy}
          onClose={handleCloseModal}
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
  );
}
