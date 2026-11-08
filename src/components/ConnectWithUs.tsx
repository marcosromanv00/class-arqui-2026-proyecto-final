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
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 bg-surface border border-border rounded-lg space-y-1.5 hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-brand font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Ubicación Física</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink">
                Plaza Tomás Guardia, Alajuela Centro
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Costado Oeste del Museo Histórico Cultural Juan Santamaría.
              </p>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg space-y-1.5 hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-brand font-medium">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Central Telefónica</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink font-mono">
                <a href="tel:+50624418118" className="hover:text-brand">
                  +(506) 2441-8118
                </a>{" "}
                /{" "}
                <a href="tel:+50624412090" className="hover:text-brand">
                  2441-2090
                </a>
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Recepción institucional y departamento de asociados.
              </p>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg space-y-1.5 hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-brand font-medium">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>Correspondencia Oficial</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink font-mono">
                <a href="mailto:direccion@camaraalajuela.com" className="hover:text-brand break-all">
                  direccion@camaraalajuela.com
                </a>
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Recepción de comunicaciones formales y convenios.
              </p>
            </div>

            <div className="p-4 bg-surface border border-border rounded-lg space-y-1.5 hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-brand font-medium">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Horario y WhatsApp</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink">
                Lunes a viernes · 8:00 a. m. a 5:00 p. m.
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/50687030792?text=Hola,%20deseo%20realizar%20una%20consulta%20a%20la%20C%C3%A1mara%20de%20Comercio%20de%20Alajuela."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Escribir por WhatsApp (+506 8703-0792)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
