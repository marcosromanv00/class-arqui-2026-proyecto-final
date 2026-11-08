import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DirectoryClientView } from "@/components/directory/DirectoryClientView";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Directorio Comercial Oficial | Comercios Verificados · CCA",
  description: "Consulte comercios y empresas certificadas en los 16 cantones de Alajuela: Alajuela Centro, El Coyol, Grecia, San Ramón, Atenas, Naranjo, Poás y Sarchí.",
};

export default function DirectoryPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={[{ label: "Directorio Comercial" }]} />

        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Red Comercial Certificada · 16 Cantones</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
            Directorio oficial de asociados y convenios con descuento
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Localice proveedores locales de confianza con sello de formalidad gremial y descubra ahorros directos para su empresa o familia.
          </p>
        </div>

        <Suspense fallback={<div className="p-12 text-center text-xs text-text-muted">Cargando directorio de comercios asociados...</div>}>
          <DirectoryClientView />
        </Suspense>
      </div>
    </main>
  );
}
