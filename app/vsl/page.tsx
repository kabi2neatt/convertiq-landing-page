import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VSLContent } from "@/components/VSLContent";

export const metadata = {
  title: "Free Training | ConvertIQ Media",
  description:
    "Watch how we generate qualified leads for local service businesses with a tracking-first Google Ads system.",
};

export default function VSLPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <VSLContent />
      <Footer />
    </main>
  );
}
