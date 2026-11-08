import { Landmark, Scale, Network, CheckCircle } from "lucide-react";

const STRATEGIC_AXES = [
  {
    icon: Landmark,
    title: "Voz e Incidencia Municipal",
    desc: "Representamos al sector privado ante concejos municipales y ministerios para evitar cargas regulatorias desmedidas y velar por el clima de inversión.",
  },
  {
    icon: Scale,
    title: "Certeza Jurídica & Arbitraje",
    desc: "Operamos el Centro de Mediación y Arbitraje más sólido de la región, permitiendo a los comerciantes resolver controversias contractuales con rapidez y plena validez legal.",
  },
  {
    icon: Network,
    title: "Encadenamiento Territorial",
    desc: "Vinculamos al comercio minorista con los parques industriales y empresas multinacionales del corredor El Coyol–Occidente para generar negocios locales.",
  },
];

export function InstitutionalStatement() {
  return (
    <section id="manifiesto" className="bg-surface-muted py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Posicionamiento Institucional */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand font-mono">
              Nuestra Misión Institucional
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink tracking-tight leading-snug">
              Cuatro décadas construyendo el futuro comercial de Alajuela.
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Fundada en 1983, la Cámara de Comercio de Alajuela es la organización gremial
              de referencia para quienes generan empleo e inversión en nuestra provincia.
              No somos un intermediario burocrático; somos el escudo y la plataforma de
              crecimiento de nuestros asociados.
            </p>

            <div className="p-5 bg-surface border border-border rounded-lg space-y-3">
              <p className="font-serif italic text-sm text-ink-muted">
                &ldquo;El desarrollo económico de Alajuela descansa sobre la valentía de sus
                comerciantes y empresarios. Nuestro deber es asegurar que cuenten con las
                condiciones jurídicas, fiscales y logísticas para prosperar sin obstáculos.&rdquo;
              </p>
              <div className="pt-2 border-t border-border/80 flex items-center justify-between text-xs text-text-muted">
                <span className="font-semibold text-ink">Junta Directiva CCA</span>
                <span>Período Estatutario 2024–2026</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Ejes Estratégicos */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {STRATEGIC_AXES.map((axis) => {
                const Icon = axis.icon;
                return (
                  <div
                    key={axis.title}
                    className="p-6 bg-surface border border-border rounded-lg flex items-start gap-4 hover:border-brand/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink">
                        {axis.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                        {axis.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-brand/5 border border-brand/20 rounded-lg flex items-center gap-3 text-xs sm:text-sm text-ink-muted">
              <CheckCircle className="w-5 h-5 text-brand shrink-0" />
              <span>
                <strong>Acreditación formal:</strong> Padrón gremial abierto para personas físicas
                con actividad lucrativa y personas jurídicas inscritas en el Registro Nacional.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
