import { Mail, Phone, MapPin } from "lucide-react";

export function ConnectWithUs() {
  return (
    <section className="bg-white border-b border-neutral-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4">
          
          {/* Columna Izquierda: Redes e Identidad */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09090b] tracking-tight">
              Conéctese con nosotros
            </h2>
            <div className="flex items-center gap-5 mt-4 text-neutral-600">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Cámara de Comercio de Alajuela"
                className="hover:text-[#991b1b] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Cámara de Comercio de Alajuela"
                className="hover:text-[#991b1b] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/50687030792"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Cámara de Comercio de Alajuela"
                className="hover:text-[#991b1b] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
              </a>
              <span className="text-neutral-300">|</span>
              <span className="text-xs text-neutral-500 font-medium">
                Plaza Tomás Guardia, Alajuela Centro
              </span>
            </div>
          </div>

          {/* Columna Derecha: Llamado a la Acción y Contacto */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:self-center">
            <div className="text-xs text-neutral-600 max-w-sm">
              ¿Tiene dudas sobre afiliación, resolución mercantil o trámites en la provincia?
            </div>
            <a
              href="#afiliacion"
              className="bg-[#09090b] hover:bg-neutral-800 text-white px-6 py-3 text-xs font-bold transition-colors shrink-0"
            >
              Contactar a la Sede
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

