import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InstitutionalStatement } from "@/components/InstitutionalStatement";
import { StatsFootprint } from "@/components/StatsFootprint";
import { NewsPublications } from "@/components/NewsPublications";
import { ServicesPillars } from "@/components/ServicesPillars";
import { ConnectWithUs } from "@/components/ConnectWithUs";
import { HumanBanner } from "@/components/HumanBanner";
import { DirectorySection } from "@/components/DirectorySection";
import { EmploymentExchange } from "@/components/EmploymentExchange";
import { AffiliationWizard } from "@/components/AffiliationWizard";
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
        <ConnectWithUs />
        <HumanBanner />
        <DirectorySection />
        <EmploymentExchange />
        <AffiliationWizard />
      </main>
      <Footer />
    </>
  );
}
