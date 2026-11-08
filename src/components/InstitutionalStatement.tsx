import { Landmark, Scale, Network } from "lucide-react";

const STRATEGIC_AXES = [
  {
    icon: Landmark,
    title: "Voz e Incidencia Municipal",
    desc: "Representamos al comercio ante concejos cantonales y ministerios para velar por patentes justas y seguridad urbana.",
  },
  {
    icon: Scale,
    title: "Arbitraje y Mediación Mercantil",
    desc: "Centro de resolución alterna para resolver controversias entre empresas en días hábiles con plena validez de cosa juzgada.",
  },
  {
    icon: Network,
    title: "Encadenamientos Productivos",
    desc: "Conectamos al comercio minorista con los parques industriales y empresas multinacionales del corredor El Coyol.",
  },
];

export function InstitutionalStatement() {
  return (
    <section id="manifiesto" className="bg-surface-muted py-14 lg:py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Titular y Propósito */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight leading-snug">
              Cuatro décadas construyendo el clima de negocios en Alajuela.
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Constituida en 1983, la Cámara articula a comerciantes, industriales y profesionales en los 16 cantones de la provincia. Una voz gremial sólida, independiente y orientada a resultados concretos.
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono text-text-muted">
                Personería Gremial Oficial · Ley de Asociaciones N.° 218
              </span>
            </div>
          </div>

          {/* Columna Derecha: 3 Ejes Escaneables (Reglas de Nielsen) */}
          <div className="lg:col-span-7 space-y-3">
            {STRATEGIC_AXES.map((axis) => {
              const Icon = axis.icon;
              return (
                <div
                  key={axis.title}
                  className="p-5 bg-surface border border-border rounded-lg flex items-start gap-4 hover:border-brand/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-surface-muted border border-border flex items-center justify-center text-brand shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      {axis.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {axis.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
