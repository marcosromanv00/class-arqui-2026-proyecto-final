"use client";

import { JobVacancy } from "@/lib/data";
import { CheckCircle2, Send, X, ShieldCheck } from "lucide-react";

interface JobApplicationModalProps {
  vacancy: JobVacancy;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  applicantName: string;
  setApplicantName: (val: string) => void;
  applicantEmail: string;
  setApplicantEmail: (val: string) => void;
  applicantPhone: string;
  setApplicantPhone: (val: string) => void;
  submitted: boolean;
}

export function JobApplicationModal({
  vacancy,
  onClose,
  onSubmit,
  applicantName,
  setApplicantName,
  applicantEmail,
  setApplicantEmail,
  applicantPhone,
  setApplicantPhone,
  submitted
}: JobApplicationModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-job-title"
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="max-w-md w-full bg-surface p-6 sm:p-8 rounded-xl border border-border shadow-xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-text-muted hover:text-ink p-1 rounded-md hover:bg-surface-muted transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
            Postulación Laboral Directa
          </span>
          <h3 id="modal-job-title" className="font-serif text-xl font-semibold text-ink mt-1">
            {vacancy.title}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            {vacancy.company} · {vacancy.canton}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-base font-semibold text-emerald-950">
              Postulación enviada con éxito
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Sus datos fueron remitidos de forma confidencial a la gerencia de contratación de {vacancy.company}.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label htmlFor="job-applicant-name" className="block font-medium text-ink mb-1">
                Nombre y apellidos *
              </label>
              <input
                id="job-applicant-name"
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Ej. Sofía Solís Murillo"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden"
              />
            </div>
            <div>
              <label htmlFor="job-applicant-email" className="block font-medium text-ink mb-1">
                Correo electrónico *
              </label>
              <input
                id="job-applicant-email"
                type="email"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="sofia@ejemplo.com"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden"
              />
            </div>
            <div>
              <label htmlFor="job-applicant-phone" className="block font-medium text-ink mb-1">
                Número de teléfono o WhatsApp *
              </label>
              <input
                id="job-applicant-phone"
                type="tel"
                required
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
                placeholder="8888-8888"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-ink focus:border-brand focus:outline-hidden font-mono"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="btn-cca-primary w-full py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar postulación a la empresa</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted justify-center pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
              <span>Canal oficial verificado por la Cámara de Comercio</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
