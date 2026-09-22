import { About } from "@/components/About";
import { Career } from "@/components/Career";
import { Contact } from "@/components/Contact";
import { CounterBand } from "@/components/CounterBand";
import { Credentials } from "@/components/Credentials";
import { PointerLight } from "@/components/PointerLight";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Approach } from "@/components/Approach";
import { Toolkit } from "@/components/Toolkit";
import { Work } from "@/components/Work";


export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <CounterBand />
        <Expertise />
        <Toolkit />
        <Career />
        <Work />
        <Approach />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <PointerLight />
    </>
  );
}
