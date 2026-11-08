import { ShieldCheck, Award, Users } from "lucide-react";

export function CamaraHero() {
  return (
    <div className="space-y-6 pb-12 border-b border-border">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
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

      {/* 3 Pilares Filosóficos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="cca-card p-6 border-l-4 border-l-brand">
          <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-ink text-base">Misión Institucional</h3>
          <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
            Representar con firmeza y certeza técnica al comercio formal, impulsando la simplificación de trámites, la libre empresa y la resolución pacífica de controversias mercantiles.
          </p>
        </div>

        <div className="cca-card p-6 border-l-4 border-l-amber-600">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-ink text-base">Visión de Futuro</h3>
          <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
            Ser la cámara regional modelo en Centroamérica por su liderazgo digital, su red de encadenamiento entre multinacionales y pymes, y su impacto en el empleo digno.
          </p>
        </div>

        <div className="cca-card p-6 border-l-4 border-l-stone-700">
          <div className="w-9 h-9 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-ink text-base">Valores Rectores</h3>
          <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
            Independencia gremial, transparencia en la gobernanza, solidaridad intercantonal, rigor ético comercial y compromiso con el bienestar de Alajuela.
          </p>
        </div>
      </div>
    </div>
  );
}

