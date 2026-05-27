import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LiveChat } from "@/components/LiveChat";
import { AnimatedDivider } from "@/components/AnimatedDivider";
import { TallyScript } from "@/components/TallyScript";
import { CursorGlow } from "@/components/CursorGlow";
import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { StickyProcess } from "@/components/StickyProcess";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { CaseStudyShowcase } from "@/components/CaseStudyShowcase";
import { WhyConvertIQ } from "@/components/WhyConvertIQ";
import ProjectsSection from "@/components/ProjectsSection";
import { FAQSection } from "@/components/FAQSection";.
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-black text-white">
      <TallyScript />
      <Navbar />
      <ScrollProgress />
      <CursorGlow />
      <HeroScrollDemo />
      <AnimatedDivider />
      <WhoWeHelp />
      <AnimatedDivider />
      <StickyProcess />
      <AnimatedDivider />
      <ServicesShowcase />
      <AnimatedDivider />
      <CaseStudyShowcase />
      <AnimatedDivider />
      <WhyConvertIQ />
      <ProjectsSection />
      <FAQSection />
      <ContactForm />
      <Footer />
      <LiveChat />
    </main>
  );
}
