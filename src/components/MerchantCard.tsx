import { DirectoryMerchant } from "@/lib/directorio";
import { MapPin, Phone, MessageSquare, ShieldCheck, Tag, Sparkles, Globe, ExternalLink } from "lucide-react";

interface MerchantCardProps {
  merchant: DirectoryMerchant;
}

/** Acepta solo URLs http(s) con dominio válido (el sitio oficial trae algunas rotas, ej. "http://Grupo") */
const safeUrl = (u?: string) => {
  if (!u) return undefined;
  try {
    const url = new URL(u);
    return /^https?:$/.test(url.protocol) && url.hostname.includes(".") ? url.href : undefined;
  } catch {
    return undefined;
  }
};

const telHref = (phone: string) => {
  const digits = phone.match(/\d[\d\s-]{6,}\d/)?.[0].replace(/\D/g, "");
  return digits ? `tel:${digits}` : undefined;
};

export function MerchantCard({ merchant }: MerchantCardProps) {
  const location = [merchant.district, merchant.canton !== "Fuera de la provincia" ? merchant.canton : merchant.province]
    .filter(Boolean)
    .join(", ");
  const mainPhone = merchant.phones.find((p) => !/fax/i.test(p)) ?? merchant.phones[0];
  const web = safeUrl(merchant.web);
  const facebook = safeUrl(merchant.facebook);
  const ficha = safeUrl(merchant.ficha);

  return (
    <article
      data-merchant-id={merchant.objectID}
      className="cca-card p-6 flex flex-col justify-between hover:border-brand/40 transition-all duration-200 group"
    >
      <div>
        {/* Sector y ubicación */}
        <div className="flex items-start justify-between gap-3 text-xs mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand font-medium text-[11px]">
            {merchant.sector}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1 text-text-muted text-[11px] text-right">
              <MapPin className="w-3 h-3 shrink-0" />
              {location}
            </span>
          )}
        </div>

        {/* Nombre y verificación */}
        <div className="flex items-start gap-1.5">
          <h3 className="text-base sm:text-lg font-semibold text-ink leading-snug group-hover:text-brand transition-colors [&_mark]:bg-amber-100 [&_mark]:text-inherit">
            {merchant.highlightedName ? (
              // HTML de resaltado generado por Algolia (escapa el contenido del registro)
              <span dangerouslySetInnerHTML={{ __html: merchant.highlightedName }} />
            ) : (
              merchant.name
            )}
          </h3>
          {merchant.verified && (
            <span title="Empresa certificada CCA" className="inline-flex shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-brand" />
            </span>
          )}
        </div>

        {/* Descripción */}
        <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
          {merchant.description}
        </p>

        {/* Convenio (ilustrativo: el sitio oficial no publica convenios por comercio) */}
        {merchant.convenio && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md text-xs space-y-1 text-amber-950">
            <div className="flex items-center justify-between gap-2 font-semibold text-amber-900 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-700" />
                Convenio para asociados:
              </span>
              {merchant.convenioIlustrativo && (
                <span
                  title="Ejemplo para el prototipo: el convenio real se define con la Cámara"
                  className="text-[9px] font-semibold uppercase tracking-wider text-amber-700/70"
                >
                  Ilustrativo
                </span>
              )}
            </div>
            <p className="leading-relaxed">{merchant.convenio}</p>
            {merchant.ahorroEstimado && merchant.ahorroEstimado !== "—" && (
              <div className="pt-1 flex items-center gap-1 text-[10px] font-semibold text-amber-900">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>ROI estimado: {merchant.ahorroEstimado}</span>
              </div>
            )}
          </div>
        )}

        {/* Dirección y teléfono */}
        <div className="mt-4 pt-3 border-t border-border text-xs text-text-muted space-y-1">
          {merchant.address && <p className="line-clamp-1" title={merchant.address}>{merchant.address}</p>}
          {mainPhone && (
            <p className="flex items-center gap-1.5 font-mono text-ink">
              <Phone className="w-3.5 h-3.5 text-brand shrink-0" />
              {telHref(mainPhone) ? (
                <a href={telHref(mainPhone)} className="hover:text-brand">{mainPhone}</a>
              ) : (
                mainPhone
              )}
            </p>
          )}
        </div>
      </div>

      {/* Pie: enlaces oficiales + contacto directo */}
      <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-[11px] font-medium text-text-muted">
          {ficha && (
            <a href={ficha} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-brand">
              Ficha oficial <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer" title="Sitio web" className="hover:text-brand">
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-brand normal-case tracking-normal">
              fb
            </a>
          )}
        </div>

        {merchant.whatsapp ? (
          <a
            href={`https://wa.me/${merchant.whatsapp}?text=Hola%20${encodeURIComponent(merchant.name)},%20los%20contacto%20a%20través%20del%20Directorio%20Oficial%20de%20la%20Cámara%20de%20Comercio%20de%20Alajuela.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cca-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1.5 hover:border-brand hover:text-brand"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        ) : mainPhone && telHref(mainPhone) ? (
          <a
            href={telHref(mainPhone)}
            className="btn-cca-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1.5 hover:border-brand hover:text-brand"
          >
            <Phone className="w-3.5 h-3.5 text-brand" />
            <span>Llamar</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
