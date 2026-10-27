import { Section } from "@/components/landing/section";
import { WaitlistForm } from "@/components/landing/waitlist-form";
import { finalCta } from "@/lib/landing-content";

export function FinalCta() {
  return (
    <Section
      id="daftar-akhir"
      title={finalCta.title}
      description={finalCta.description}
      tone="accent"
    >
      <WaitlistForm className="w-full max-w-md" />
    </Section>
  );
}
