"use client";

import { JobVacancy } from "@/lib/data";
import { CheckCircle2, Send, X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white p-6 sm:p-8 border border-neutral-300 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 p-1"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#991b1b]">
            Postulación de Candidatura
          </span>
          <h3 className="text-xl font-bold text-[#09090b] mt-1">
            {vacancy.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {vacancy.company} · {vacancy.district}, {vacancy.canton}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-neutral-50 border border-neutral-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#991b1b] mx-auto" />
            <h4 className="text-sm font-bold text-[#09090b]">¡Postulación Enviada con Éxito!</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Sus datos han sido transmitidos al departamento de recursos humanos de la empresa agremiada. Recibirá confirmación en su correo.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Nombre Completo *</label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Ej: Sofía Solís Murillo"
                className="w-full px-3 py-2 border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Correo Electrónico *</label>
              <input
                type="email"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="sofia@ejemplo.com"
                className="w-full px-3 py-2 border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Teléfono Móvil (WhatsApp) *</label>
              <input
                type="tel"
                required
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
                placeholder="8888-8888"
                className="w-full px-3 py-2 border border-neutral-300 focus:border-[#991b1b] focus:outline-hidden"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#991b1b] hover:bg-[#7f1d1d] text-white py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirmar Postulación Inmediata</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

