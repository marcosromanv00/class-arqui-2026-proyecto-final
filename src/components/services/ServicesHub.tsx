import Link from "next/link";
import { Scale, FileCheck, Award, GraduationCap, ShieldCheck, ArrowRight, Check } from "lucide-react";

export function ServicesHub() {
  const pillars = [
    {
      id: "arbitraje",
      title: "Centro de Conciliación y Arbitraje Mercantil",
      badge: "Ley N.º 7727 (RAC)",
      description: "Mecanismo extrajudicial para dirimir controversias comerciales entre socios, clientes o proveedores en un promedio de 15 a 30 días, con validez de sentencia judicial firme.",
      icon: Scale,
      href: "/servicios/arbitraje",
      actionText: "Ver procedimiento y tarifas",
    },
    {
      id: "patentes",
      title: "Guía de Patente Municipal y Uso de Suelo",
      badge: "Ventanilla Técnica Cantonal",
      description: "Acompañamiento integral para apertura formal de comercios en Alajuela. Revisión de uso de suelo, permisos del Ministerio de Salud y enlace directo municipal.",
      icon: FileCheck,
      href: "/servicios/tramites",
      actionText: "Consultar requisitos paso a paso",
    },
    {
      id: "convenios",
      title: "Catálogo de Convenios y Descuentos Comerciales",
      badge: "+40 Alianzas Activas",
      description: "Beneficios exclusivos en salud privada, datáfonos BAC Compra-Click con tarifas preferenciales, combustible empresarial y pólizas colectivas del INS.",
      icon: Award,
      href: "/servicios/convenios",
      actionText: "Explorar catálogo de convenios",
    },
    {
      id: "tributario",
      title: "Asesoría Legal y Escudo Tributario (Ley 7092)",
      badge: "Defensa Gremial",
      description: "Orientación en cumplimiento de renta e IVA (D-101 y D-104), facturación electrónica ante Hacienda y aprovechamiento de la deducción fiscal del 100% de la cuota.",
      icon: ShieldCheck,
      href: "/contacto?asunto=asesoria-tributaria",
      actionText: "Solicitar asesoría fiscal",
    },
    {
      id: "capacitacion",
      title: "Capacitaciones y Formación Empresarial",
      badge: "Talleres Mensuales",
      description: "Seminarios prácticos en reformas laborales, ciberseguridad para pymes, inteligencia artificial aplicada al comercio y marketing digital de conversión.",
      icon: GraduationCap,
      href: "/contacto?asunto=capacitaciones",
      actionText: "Consultar calendario de talleres",
    },
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold text-brand tracking-wider uppercase">
          Propuesta de Servicios Integrales
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
          Servicios diseñados para blindar y acelerar al comercio formal
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Nuestra misión es reducir el costo de hacer negocios en Alajuela: menos burocracia en patentes, resolución expedita de controversias y alianzas comerciales con ahorro comprobable.
        </p>
      </div>

      {/* Grid de Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="cca-card p-6 flex flex-col justify-between hover:border-brand/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/5 border border-brand/20 text-brand flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-text-muted bg-surface-muted px-2 py-0.5 rounded border border-border">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover hover:underline"
                >
                  <span>{p.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparativa de Valor para el Asociado */}
      <div className="rounded-2xl border border-border bg-surface-muted/50 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight mb-4">
          ¿Por qué afiliar su negocio a la Cámara de Comercio de Alajuela?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <Check className="w-4 h-4 text-brand shrink-0" />
              <span>Ahorro Comprobable</span>
            </div>
            <p className="text-text-muted leading-relaxed">
              El ahorro anual promedio en convenios médicos, financieros y combustibles supera en 4.5 veces el costo de la membresía anual.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <Check className="w-4 h-4 text-brand shrink-0" />
              <span>Certeza Jurídica</span>
            </div>
            <p className="text-text-muted leading-relaxed">
              Acceso prioritario a árbitros acreditados para resolver incumplimientos de contratos sin perder años en juzgados.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <Check className="w-4 h-4 text-brand shrink-0" />
              <span>Incidencia Cantonal</span>
            </div>
            <p className="text-text-muted leading-relaxed">
              Voz unificada ante el Concejo Municipal y la Alcaldía de Alajuela en discusiones tributarias y de ordenamiento territorial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

