import { Mail, Phone, MapPin, Clock, MessageSquare, Compass, ArrowUpRight } from "lucide-react";

export function ConnectWithUs() {
  return (
    <section id="contacto" className="bg-surface-muted py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Presentación Institucional de la Sede */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-brand font-semibold">
              Atención Presencial y Digital
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink tracking-tight">
              Sede Central de la Cámara de Comercio en Alajuela
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Nuestras oficinas albergan la secretaría ejecutiva, la dirección de asociados y las salas privadas del Centro de Conciliación y Arbitraje Mercantil.
            </p>

            <div className="p-5 bg-surface border border-border rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                <Compass className="w-4 h-4 text-brand" />
                <span>Logística de visita y estacionamiento</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Ubicada en el casco histórico de Alajuela. Convenios de estacionamiento público a 50 metros sobre Calle 2 y fácil acceso desde la autopista General Cañas.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Canales Oficiales en 4 Fichas */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 shadow-xs hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand font-medium">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Ubicación Física</span>
              </div>
              <p className="text-sm font-semibold text-ink">
                Plaza Tomás Guardia, Alajuela Centro
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Costado Oeste del Museo Histórico Cultural Juan Santamaría, Alajuela.
              </p>
            </div>

            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 shadow-xs hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand font-medium">
                <Phone className="w-4 h-4 shrink-0" />
                <span>Central Telefónica</span>
              </div>
              <p className="text-sm font-semibold text-ink font-mono">
                <a href="tel:+50624418118" className="hover:text-brand">
                  +(506) 2441-8118
                </a>{" "}
                /{" "}
                <a href="tel:+50624412090" className="hover:text-brand">
                  2441-2090
                </a>
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Atención directa con secretaría ejecutiva y departamento de agremiados.
              </p>
            </div>

            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 shadow-xs hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand font-medium">
                <Mail className="w-4 h-4 shrink-0" />
                <span>Correspondencia Oficial</span>
              </div>
              <p className="text-sm font-semibold text-ink font-mono">
                <a href="mailto:direccion@camaraalajuela.com" className="hover:text-brand break-all">
                  direccion@camaraalajuela.com
                </a>
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Recepción de comunicaciones formales, trámites y solicitudes de convenios.
              </p>
            </div>

            <div className="p-5 bg-surface border border-border rounded-xl space-y-2 shadow-xs hover:border-brand/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand font-medium">
                <Clock className="w-4 h-4 shrink-0" />
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Mensajería instantánea (+506 8703-0792)</span>
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
