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
      className="bg-surface border border-border rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-brand/40 hover:shadow-sm transition-all duration-200 group"
    >
      <div>
        {/* Sector y ubicación */}
        <div className="flex items-start justify-between gap-3 text-xs mb-3">
          <span className="text-[10px] font-mono font-semibold text-brand uppercase tracking-wider bg-brand/5 border border-brand/20 px-2 py-0.5 rounded">
            {merchant.sector}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1 text-text-muted text-[11px] text-right font-medium">
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
            <span title="Empresa certificada CCA" className="inline-flex shrink-0 mt-0.5 text-brand">
              <ShieldCheck className="w-4 h-4" />
            </span>
          )}
        </div>

        {/* Descripción concisa y legible */}
        <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
          {merchant.description}
        </p>

        {/* Convenio Editorial (Beneficio sin ruido visual) */}
        {merchant.convenio && (
          <div className="mt-3.5 p-3 rounded-lg bg-surface-muted/80 border border-border/80 border-l-2 border-l-brand text-xs space-y-1">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="font-semibold text-ink flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-brand" />
                <span>Convenio Gremial</span>
              </span>
              {merchant.ahorroEstimado && merchant.ahorroEstimado !== "—" && (
                <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded">
                  ROI: {merchant.ahorroEstimado}
                </span>
              )}
            </div>
            <p className="text-xs text-ink-muted leading-relaxed font-medium">
              {merchant.convenio}
            </p>
          </div>
        )}

        {/* Dirección y teléfono */}
        <div className="mt-3.5 pt-3 border-t border-border/80 text-xs text-text-muted space-y-1">
          {merchant.address && <p className="line-clamp-1 text-[11px]" title={merchant.address}>{merchant.address}</p>}
          {mainPhone && (
            <p className="flex items-center gap-1.5 font-mono text-xs text-ink font-medium">
              <Phone className="w-3 h-3 text-brand shrink-0" />
              {telHref(mainPhone) ? (
                <a href={telHref(mainPhone)} className="hover:text-brand transition-colors">{mainPhone}</a>
              ) : (
                mainPhone
              )}
            </p>
          )}
        </div>
      </div>

      {/* Pie: enlaces oficiales + contacto directo */}
      <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-[11px] font-medium text-text-muted">
          {ficha && (
            <a href={ficha} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-brand transition-colors">
              Ficha <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer" title="Sitio web" className="hover:text-brand transition-colors">
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-brand transition-colors font-bold">
              fb
            </a>
          )}
        </div>

        {merchant.whatsapp ? (
          <a
            href={`https://wa.me/${merchant.whatsapp}?text=Hola%20${encodeURIComponent(merchant.name)},%20los%20contacto%20a%20través%20del%20Directorio%20Oficial%20de%20la%20Cámara%20de%20Comercio%20de%20Alajuela.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium rounded-md border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        ) : mainPhone && telHref(mainPhone) ? (
          <a
            href={telHref(mainPhone)}
            className="btn-cca-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1.5 hover:border-brand hover:text-brand"
          >
            <Phone className="w-3 h-3 text-brand" />
            <span>Llamar</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
