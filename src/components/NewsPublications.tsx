import { ArrowRight, Calendar, Download } from "lucide-react";

const SECONDARY_ITEMS = [
  {
    type: "Guía Tributaria",
    date: "Octubre 2026",
    title: "Deducibilidad de la cuota asociativa en el Impuesto sobre la Renta (Art. 8 Ley 7092)",
    summary: "Tratamiento contable de la membresía gremial como gasto operativo deducible.",
    href: "#afiliacion",
  },
  {
    type: "Circular Jurídica",
    date: "Septiembre 2026",
    title: "Reglamento abreviado de conciliación comercial para asociados de la Cámara",
    summary: "Procedimiento ágil para resolver controversias mercantiles con valor de cosa juzgada.",
    href: "#tramites",
  },
  {
    type: "Informe Sectorial",
    date: "Agosto 2026",
    title: "Encadenamientos locales con zonas francas y empresas médicas en El Coyol",
    summary: "Oportunidades de proveeduría para pymes alajuelenses en parques industriales.",
    href: "#directorio",
  },
  {
    type: "Normativa Cantonal",
    date: "Julio 2026",
    title: "Guía de patentes comerciales, licencias y uso de suelo en Alajuela",
    summary: "Requisitos actualizados de formalización y trámites ante el gobierno local.",
    href: "#tramites",
  },
];

export function NewsPublications() {
  return (
    <section id="publicaciones" className="bg-surface py-14 lg:py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-border gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Actualidad e informes económicos
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Documentos de análisis, circulares gremiales y guías técnicas para el comercio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Publicación Principal Destacada */}
          <article className="lg:col-span-5 bg-surface-muted border border-border rounded-lg overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80"
                alt="Informe Económico Provincial Alajuela 2026"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-brand text-surface text-[11px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                Informe 2026
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Noviembre 2026
                </span>
                <span>·</span>
                <span>PDF (2.4 MB)</span>
              </div>

              <h3 className="text-lg font-semibold text-ink leading-snug">
                Balance Económico de Alajuela: Comercio tradicional, inversión y zonas francas
              </h3>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Diagnóstico del sector retail en los cantones centrales y el impacto de los parques industriales en el empleo provincial.
              </p>

              <div className="pt-2 border-t border-border flex items-center justify-between">
                <a
                  href="#contacto"
                  className="btn-cca-primary px-3.5 py-1.5 text-xs inline-flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  <span>Descargar informe</span>
                </a>
              </div>
            </div>
          </article>

          {/* Lista de Circulares Secundarias */}
          <div className="lg:col-span-7 divide-y divide-border border-t lg:border-t-0 border-border">
            {SECONDARY_ITEMS.map((item) => (
              <article key={item.title} className="py-4 first:pt-0 last:pb-0 space-y-1.5 group">
                <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                  <span className="font-semibold text-brand">{item.type}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-ink group-hover:text-brand transition-colors">
                  <a href={item.href}>
                    {item.title}
                  </a>
                </h3>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {item.summary}
                </p>

                <div>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
                  >
                    <span>Ver documento</span>
                    <ArrowRight className="w-3 h-3" />
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
