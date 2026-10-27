import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import {
  Audience,
  NonGoals,
  Pricing,
  Trust,
} from "@/components/landing/info-sections";
import { Navbar } from "@/components/landing/navbar";
import { Problem } from "@/components/landing/problem";
import { ValueChainDemo } from "@/components/landing/value-chain-demo";

export default function Home() {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Lewati ke konten
      </a>
      <Navbar />
      <main id="konten" className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <ValueChainDemo />
        <Features />
        <Audience />
        <Trust />
        <NonGoals />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
