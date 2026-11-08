import { Merchant } from "@/lib/data";
import { MapPin, Phone, MessageSquare, ShieldCheck, Tag } from "lucide-react";

interface MerchantCardProps {
  merchant: Merchant;
}

export function MerchantCard({ merchant }: MerchantCardProps) {
  const whatsappUrl = `https://wa.me/${merchant.whatsapp}?text=${encodeURIComponent(
    `Hola ${merchant.name}, los contacto a través del Directorio Oficial de la Cámara de Comercio de Alajuela.`
  )}`;

  return (
    <article
      data-merchant-id={merchant.id}
      className="cca-card p-6 flex flex-col justify-between hover:border-brand/40 transition-all duration-200"
    >
      <div>
        {/* Cabecera con Categoría y Cantón */}
        <div className="flex items-center justify-between text-xs mb-3 gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand font-medium">
            {merchant.category}
          </span>
          <span className="flex items-center gap-1 text-text-muted">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{merchant.canton}</span>
          </span>
        </div>

        {/* Nombre y Sello de Verificación */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-ink leading-snug">
            {merchant.name}
          </h3>
          {merchant.verified && (
            <span
              title="Asociado oficial verificado por la Cámara"
              className="inline-flex items-center gap-1 text-xs text-brand shrink-0 mt-0.5"
            >
              <ShieldCheck className="w-4 h-4 text-brand" />
            </span>
          )}
        </div>

        <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
          {merchant.description}
        </p>

        {/* Convenio Exclusivo para Socios de la Cámara */}
        {merchant.convenioDescuento && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md text-xs space-y-1 text-amber-950">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>Convenio para asociados:</span>
            </div>
            <p className="leading-relaxed">
              {merchant.convenioDescuento}
            </p>
          </div>
        )}

        {/* Dirección física y teléfono */}
        <div className="mt-4 pt-3 border-t border-border text-xs text-text-muted space-y-1">
          <p className="line-clamp-1">{merchant.address}</p>
          <p className="flex items-center gap-1.5 font-mono text-ink">
            <Phone className="w-3.5 h-3.5 text-brand shrink-0" />
            <a href={`tel:${merchant.phone}`} className="hover:text-brand">
              {merchant.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Pie de tarjeta con Antigüedad y Botón de Contacto */}
      <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-text-muted">
          Socio desde {merchant.memberSince}
        </span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cca-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1.5 hover:border-brand hover:text-brand"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Contactar</span>
        </a>
      </div>
    </article>
  );
}
