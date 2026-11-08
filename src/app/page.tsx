import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InstitutionalStatement } from "@/components/InstitutionalStatement";
import { StatsFootprint } from "@/components/StatsFootprint";
import { NewsPublications } from "@/components/NewsPublications";
import { ServicesPillars } from "@/components/ServicesPillars";
import { DirectorySection } from "@/components/DirectorySection";
import { EmploymentExchange } from "@/components/EmploymentExchange";
import { AffiliationWizard } from "@/components/AffiliationWizard";
import { ConnectWithUs } from "@/components/ConnectWithUs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <InstitutionalStatement />
        <StatsFootprint />
        <NewsPublications />
        <ServicesPillars />
        <DirectorySection />
        <EmploymentExchange />
        <AffiliationWizard />
        <ConnectWithUs />
      </main>
      <Footer />
    </>
  );
}
