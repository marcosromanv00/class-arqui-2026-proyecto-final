import Link from "next/link";
import { FileText, Download, CheckCircle2, ArrowRight } from "lucide-react";

export function TransparencySection() {
  const documents = [
    { title: "Estatutos Oficiales de la Cámara (Reforma 2024)", size: "PDF · 1.4 MB", desc: "Reglamento orgánico de asambleas, elecciones y derechos del asociado." },
    { title: "Reglamento del Centro de Arbitraje y Conciliación", size: "PDF · 890 KB", desc: "Normas de procedimiento bajo la Ley 7727 y aranceles de árbitros." },
    { title: "Código de Ética y Buenas Prácticas Comerciales", size: "PDF · 450 KB", desc: "Lineamientos de competencia leal y protección al consumidor." },
    { title: "Memoria Anual y Estados Financieros Auditados", size: "PDF · 2.1 MB", desc: "Informe de rendición de cuentas presentado a la asamblea." },
  ];

  return (
    <section id="estatutos" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand tracking-wider uppercase">
        <FileText className="w-3.5 h-3.5" />
        <span>Rendición de Cuentas</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-3">
        Estatutos, Transparencia y Marco Normativo
      </h2>
      <p className="text-sm text-ink-muted max-w-2xl mb-8">
        La legitimidad gremial de la Cámara se sostiene en la transparencia financiera y el cumplimiento estricto del ordenamiento jurídico costarricense.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {documents.map((doc) => (
          <div key={doc.title} className="bg-surface border border-border rounded-xl p-5 flex items-start justify-between gap-4 hover:border-brand/40 hover:shadow-xs transition-all">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand shrink-0" />
                <h3 className="font-semibold text-ink text-sm leading-snug">{doc.title}</h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">{doc.desc}</p>
              <span className="inline-block text-[11px] font-mono text-brand font-medium bg-brand/5 border border-brand/20 px-2 py-0.5 rounded">{doc.size}</span>
            </div>
            <button
              type="button"
              className="p-2 text-text-muted hover:text-brand hover:bg-surface-muted rounded-lg border border-border hover:border-brand/40 transition-colors shrink-0"
              title="Descargar documento oficial"
              aria-label={`Descargar ${doc.title}`}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Banner Editorial de Afiliación */}
      <div className="rounded-2xl bg-[#fafaf8] border border-border-strong p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] font-mono text-brand uppercase tracking-wider font-semibold">
            Membresía Empresarial CCA
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-ink">
            Forme parte de las más de 800 empresas que impulsan Alajuela
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            <strong className="text-ink font-semibold">Gasto 100% deducible de renta</strong> (Art. 8 Ley 7092). Afiliación digital ágil con verificación inmediata en SINPE Móvil o tarjeta.
          </p>
        </div>
        <Link
          href="/afiliarse"
          className="btn-cca-primary px-6 py-3 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shrink-0 shadow-xs"
        >
          <span>Afiliar mi Empresa</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

