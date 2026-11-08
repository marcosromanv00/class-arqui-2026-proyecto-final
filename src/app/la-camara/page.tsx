import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CamaraHero } from "@/components/camara/CamaraHero";
import { HistoryTimeline } from "@/components/camara/HistoryTimeline";
import { BoardGrid } from "@/components/camara/BoardGrid";
import { CantonsGrid } from "@/components/camara/CantonsGrid";
import { TransparencySection } from "@/components/camara/TransparencySection";

export const metadata: Metadata = {
  title: "La Cámara | Misión, Historia y Junta Directiva · Cámara de Comercio de Alajuela",
  description: "Conozca la trayectoria gremial de la CCA desde 1983: Junta Directiva 2025-2027, presencia en los 16 cantones de Alajuela y estatutos oficiales.",
};

export default function CamaraPage() {
  return (
    <main className="flex-1 py-8 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "La Cámara" }]} />
        <CamaraHero />
        <HistoryTimeline />
        <BoardGrid />
        <CantonsGrid />
        <TransparencySection />
      </div>
    </main>
  );
}

