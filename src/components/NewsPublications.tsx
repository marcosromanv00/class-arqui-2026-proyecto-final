import { ArrowRight, FileText, Calendar, Download } from "lucide-react";

const SECONDARY_ITEMS = [
  {
    type: "Guía Tributaria Oficial",
    format: "PDF · 1.2 MB",
    date: "Octubre 2026",
    title: "Deducibilidad de la cuota asociativa en la declaración de renta D-101 (Art. 8 Ley N.° 7092)",
    summary: "Manual técnico para contadores sobre el registro de la membresía gremial como gasto operativo deducible.",
    href: "#afiliacion",
  },
  {
    type: "Reglamento Gremial",
    format: "Circular Jurídica",
    date: "Septiembre 2026",
    title: "Protocolo abreviado de conciliación comercial para disputas entre asociados de Alajuela",
    summary: "Mecanismo expedito para la resolución de desacuerdos contractuales y de arrendamiento en sede arbitral.",
    href: "#tramites",
  },
  {
    type: "Encadenamientos Productivos",
    format: "Informe Ejecutivo",
    date: "Agosto 2026",
    title: "Oportunidades de proveeduría local para parques de ciencias de la vida y logística en El Coyol",
    summary: "Requisitos de homologación y estándares de calidad para que pymes alajuelenses sean suplidoras de zonas francas.",
    href: "#directorio",
  },
  {
    type: "Compendio Normativo",
    format: "PDF · 940 KB",
    date: "Julio 2026",
    title: "Guía de trámites para patentes comerciales, licencias y uso de suelo en los 16 cantones",
    summary: "Recopilación comparativa de requisitos municipales para la apertura formal de establecimientos.",
    href: "#tramites",
  },
];

export function NewsPublications() {
  return (
    <section id="publicaciones" className="bg-surface py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-border gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
              Observatorio Económico y Legal
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink tracking-tight mt-1">
              Publicaciones oficiales, informes y circulares
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-muted max-w-md">
            Información técnica, estudios económicos y circulares normativas
            elaboradas por la asesoría legal y económica de la Cámara.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Publicación Principal Destacada */}
          <article className="lg:col-span-5 bg-surface-muted border border-border rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80"
                alt="Reunión de análisis económico y competitividad en la Cámara de Comercio de Alajuela"
                className="w-full h-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-brand text-surface text-[11px] font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wide">
                Informe Especial 2026
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Noviembre 2026
                </span>
                <span>·</span>
                <span>PDF (2.4 MB)</span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-ink leading-snug">
                Balance Económico de Alajuela: Inversión, comercio tradicional y parques industriales
              </h3>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Análisis exhaustivo del comportamiento del sector retail en los cantones centrales y el impacto multiplicador de la industria médica en El Coyol.
              </p>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <a
                  href="#contacto"
                  className="btn-cca-primary px-4 py-2 text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar informe completo</span>
                </a>
              </div>
            </div>
          </article>

          {/* Lista de Publicaciones Secundarias */}
          <div className="lg:col-span-7 divide-y divide-border border-t lg:border-t-0 border-border">
            {SECONDARY_ITEMS.map((item) => (
              <article key={item.title} className="py-5 first:pt-0 last:pb-0 space-y-2 group">
                <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                  <span className="font-medium text-brand">{item.type}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                  <span>·</span>
                  <span>{item.format}</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-semibold text-ink group-hover:text-brand transition-colors">
                  <a href={item.href}>
                    {item.title}
                  </a>
                </h3>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {item.summary}
                </p>

                <div className="pt-1">
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
                  >
                    <span>Ver documento</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
