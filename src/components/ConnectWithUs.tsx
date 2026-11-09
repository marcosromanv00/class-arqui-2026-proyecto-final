import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowUpRight } from "lucide-react";

export function ConnectWithUs() {
  return (
    <section id="contacto" className="bg-surface-muted py-14 lg:py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Información de la Sede */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Sede central y atención gremial
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Atención presencial para afiliaciones, certificaciones, consultas de patentes y audiencias del Centro de Arbitraje Mercantil.
            </p>
            <div className="pt-2 text-xs text-text-muted">
              <span>Alajuela Centro · Plaza Tomás Guardia</span>
            </div>
          </div>

          {/* Columna Derecha: Canales Directos */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 hover:border-brand/40 hover:shadow-xs transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Ubicación Física</span>
              </div>
              <p className="text-sm font-semibold text-ink">
                Plaza Tomás Guardia, Alajuela Centro
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Costado Oeste del Museo Histórico Cultural Juan Santamaría.
              </p>
            </div>

            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 hover:border-brand/40 hover:shadow-xs transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand font-semibold uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Central Telefónica</span>
              </div>
              <p className="text-sm font-semibold text-ink font-mono">
                <a href="tel:+50624418118" className="hover:text-brand transition-colors">
                  +(506) 2441-8118
                </a>{" "}
                /{" "}
                <a href="tel:+50624412090" className="hover:text-brand transition-colors">
                  2441-2090
                </a>
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Recepción institucional y departamento de asociados.
              </p>
            </div>

            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 hover:border-brand/40 hover:shadow-xs transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand font-semibold uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>Correspondencia Oficial</span>
              </div>
              <p className="text-sm font-semibold text-ink font-mono">
                <a href="mailto:direccion@camaraalajuela.com" className="hover:text-brand transition-colors break-all">
                  direccion@camaraalajuela.com
                </a>
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Recepción de comunicaciones formales y convenios.
              </p>
            </div>

            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 hover:border-brand/40 hover:shadow-xs transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Horario y WhatsApp</span>
              </div>
              <p className="text-sm font-semibold text-ink">
                Lunes a viernes · 8:00 a. m. a 5:00 p. m.
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/50687030792?text=Hola,%20deseo%20realizar%20una%20consulta%20a%20la%20C%C3%A1mara%20de%20Comercio%20de%20Alajuela."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1.5 rounded-md transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp (+506 8703-0792)</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
