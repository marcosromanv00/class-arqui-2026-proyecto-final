import { Merchant } from "@/lib/data";
import { MapPin, Phone, MessageSquare, CheckCircle, Tag, Sparkles } from "lucide-react";

interface MerchantCardProps {
  merchant: Merchant;
}

export function MerchantCard({ merchant }: MerchantCardProps) {
  return (
    <div
      data-merchant-id={merchant.id}
      className="bg-white border border-neutral-200 hover:border-neutral-400 p-6 flex flex-col justify-between transition-colors group"
    >
      <div>
        {/* Categoría y Cantón */}
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-bold text-[#991b1b] uppercase tracking-wider text-[10px]">
            {merchant.category}
          </span>
          <span className="inline-flex items-center gap-1 text-neutral-500 font-medium text-[11px]">
            <MapPin className="w-3 h-3 text-neutral-400" />
            {merchant.district}, {merchant.canton}
          </span>
        </div>

        {/* Nombre y Verificación */}
        <div className="flex items-start gap-1.5">
          <h3 className="text-base font-bold text-[#09090b] leading-snug group-hover:text-[#991b1b] transition-colors">
            {merchant.name}
          </h3>
          {merchant.verified && (
            <span title="Afiliado Verificado CCA" className="inline-flex shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4 text-[#991b1b]" />
            </span>
          )}
        </div>

        {/* Descripción */}
        <p className="mt-2 text-xs text-neutral-600 leading-relaxed line-clamp-2">
          {merchant.description}
        </p>

        {/* Convenio de Descuento (Anti-slop: fondo neutral limpio, sin amarillo) */}
        {merchant.convenioDescuento && (
          <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-800 font-semibold text-[11px]">
              <Tag className="w-3.5 h-3.5 text-[#991b1b]" />
              <span>Convenio CCA:</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-snug">
              {merchant.convenioDescuento}
            </p>
            <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-[#09090b]">
              <Sparkles className="w-3 h-3 text-[#991b1b]" />
              <span>ROI estimado: {merchant.ahorroEstimado}</span>
            </div>
          </div>
        )}

        {/* Dirección y teléfono */}
        <div className="mt-4 text-[11px] text-neutral-500 space-y-1">
          <p className="line-clamp-1">{merchant.address}</p>
          <p className="flex items-center gap-1 font-mono text-neutral-700">
            <Phone className="w-3 h-3 text-neutral-400" />
            {merchant.phone}
          </p>
        </div>
      </div>

      {/* Botón WhatsApp Directo */}
      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
          Socio desde {merchant.memberSince}
        </span>
        
        <a
          href={`https://wa.me/${merchant.whatsapp}?text=Hola%20${encodeURIComponent(merchant.name)},%20los%20contacto%20a%20través%20del%20Directorio%20Oficial%20de%20la%20Cámara%20de%20Comercio%20de%20Alajuela.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#09090b] hover:text-[#991b1b] border border-neutral-300 hover:border-[#991b1b] transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#991b1b]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

