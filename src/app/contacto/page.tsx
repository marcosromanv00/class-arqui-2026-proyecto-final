import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto & Sede Central | Cámara de Comercio de Alajuela",
  description: "Ubicación física, teléfonos, WhatsApp y canales oficiales de atención al público de la CCA en Plaza Tomás Guardia, Alajuela Centro.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumb items={[{ label: "Contacto & Sede" }]} />

        {/* Hero de Contacto */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Sede Central Gremial · Alajuela Centro</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Contacto directo, atención personalizada y ubicación de la sede
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Estamos a su disposición para resolver dudas, brindar acompañamiento en trámites y coordinar citas con nuestra Junta Directiva o asesores legales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Información de Sede */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface border border-border rounded-xl p-6 sm:p-7 space-y-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <h3 className="font-serif text-lg font-semibold text-ink pb-3 border-b border-border">
                Sede Central Histórica
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Dirección Física:</span>
                    <p className="text-text-muted mt-0.5 leading-relaxed">
                      Plaza Tomás Guardia, Costado Oeste del Museo Histórico Cultural Juan Santamaría, Alajuela Centro, Costa Rica.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Horario de Atención:</span>
                    <p className="text-text-muted mt-0.5">
                      Lunes a viernes de 8:00 a. m. a 5:00 p. m. (Jornada continua).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Central Telefónica:</span>
                    <p className="text-text-muted mt-0.5 font-mono">
                      +(506) 2441-8118 / 2441-2090
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">WhatsApp Institucional:</span>
                    <a
                      href="https://wa.me/50687030792"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline font-mono"
                    >
                      +506 8703-0792 / 8492-3925
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Correo de Dirección:</span>
                    <a
                      href="mailto:direccion@camaraalajuela.com"
                      className="text-brand hover:underline break-all"
                    >
                      direccion@camaraalajuela.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Botones de Navegación GPS */}
              <div className="pt-3 border-t border-border flex flex-col sm:flex-row gap-2">
                <a
                  href="https://waze.com/ul?q=Museo%20Juan%20Santamaria%20Alajuela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cca-primary py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 flex-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir en Waze</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Plaza+Tomas+Guardia+Alajuela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cca-secondary py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 flex-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            {/* Servicio de Sala de Conferencias */}
            <div className="p-5 rounded-xl bg-surface-muted border border-border text-xs space-y-2">
              <span className="font-semibold text-ink uppercase tracking-wider text-[11px] block">
                Salas de Reuniones para Asociados
              </span>
              <p className="text-text-muted leading-relaxed">
                Nuestras empresas agremiadas pueden reservar sin costo el salón directivo de la CCA para asambleas de socios, firmas contractuales o conferencias privadas de hasta 30 personas.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-center text-xs text-text-muted">Cargando formulario...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
