import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServicesHub } from "@/components/services/ServicesHub";

export const metadata: Metadata = {
  title: "Servicios al Comercio | Arbitraje, Patentes y Convenios · Cámara de Comercio de Alajuela",
  description: "Portafolio de servicios gremiales de la CCA: Centro de Arbitraje Mercantil (Ley 7727), Guía de Patentes Municipales, Convenios y Asesoría Tributaria.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Servicios al Comercio" }]} />
        <ServicesHub />
      </div>
    </main>
  );
}

