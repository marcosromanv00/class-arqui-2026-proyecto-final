import { Award } from "lucide-react";

export function CamaraHero() {
  return (
    <div className="space-y-6 pb-12 border-b border-border">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase font-mono">
        <Award className="w-3.5 h-3.5" />
        <span>Organización Gremial Oficial · Fundada en 1983</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
        El escudo gremial y motor de competitividad para los{" "}
        <span className="text-brand">16 cantones de Alajuela</span>.
      </h1>

      <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-3xl">
        La Cámara de Comercio de Alajuela (CCA) es la entidad privada sin fines de lucro
        que representa y defiende los intereses del sector productivo, comercial,
        industrial y de servicios frente a las municipalidades y el gobierno central.
      </p>

      {/* Triptych Editorial: Misión, Visión y Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-surface border border-border rounded-xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-brand/40 transition-all flex flex-col justify-between group">
          <div>
            <span className="text-[11px] font-mono font-semibold text-brand tracking-wider uppercase">
              I · Propósito Institucional
            </span>
            <h3 className="font-serif font-semibold text-ink text-xl mt-1.5 mb-2.5">
              Misión
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              <strong className="text-ink font-semibold">Certeza jurídica y defensa gremial:</strong> Representar con firmeza y rigor técnico al comercio formal, impulsando la simplificación de trámites, la libre empresa y la resolución pacífica de controversias mercantiles.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-border/80 text-[11px] font-mono text-text-muted">
            Defensa y representatividad
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-brand/40 transition-all flex flex-col justify-between group">
          <div>
            <span className="text-[11px] font-mono font-semibold text-brand tracking-wider uppercase">
              II · Horizonte Estratégico
            </span>
            <h3 className="font-serif font-semibold text-ink text-xl mt-1.5 mb-2.5">
              Visión
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              <strong className="text-ink font-semibold">Liderazgo regional y encadenamiento:</strong> Consolidarnos como la cámara regional modelo en Centroamérica por su vanguardia digital, su red de integración entre multinacionales y pymes, y su impacto directo en el empleo formal.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-border/80 text-[11px] font-mono text-text-muted">
            Competitividad 2026 – 2030
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-brand/40 transition-all flex flex-col justify-between group">
          <div>
            <span className="text-[11px] font-mono font-semibold text-brand tracking-wider uppercase">
              III · Principios Rectores
            </span>
            <h3 className="font-serif font-semibold text-ink text-xl mt-1.5 mb-2.5">
              Valores
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              <strong className="text-ink font-semibold">Independencia y transparencia:</strong> Rigor ético comercial, gobernanza auditada, solidaridad intercantonal y compromiso incondicional con el bienestar y progreso económico de Alajuela.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-border/80 text-[11px] font-mono text-text-muted">
            Ética y legitimidad gremial
          </div>
        </div>
      </div>
    </div>
  );
}

