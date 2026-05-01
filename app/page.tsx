import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { StickyProcess } from "@/components/StickyProcess";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { CaseStudyShowcase } from "@/components/CaseStudyShowcase";
import { WhyConvertIQ } from "@/components/WhyConvertIQ";
import { LandingSections } from "@/components/LandingSections";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <ScrollProgress />
      <Navbar />
      <HeroScrollDemo />
      <WhoWeHelp />
      <StickyProcess />
      <ServicesShowcase />
      <CaseStudyShowcase />
      <WhyConvertIQ />
      <LandingSections />
    </main>
  );
}