import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsFootprint } from "@/components/StatsFootprint";
import { DirectorySection } from "@/components/DirectorySection";
import { EmploymentExchange } from "@/components/EmploymentExchange";
import { ServicesPillars } from "@/components/ServicesPillars";
import { NewsPublications } from "@/components/NewsPublications";
import { AffiliationWizard } from "@/components/AffiliationWizard";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsFootprint />
        <DirectorySection />
        <EmploymentExchange />
        <ServicesPillars />
        <NewsPublications />
        <AffiliationWizard />
      </main>
      <Footer />
    </>
  );
}
