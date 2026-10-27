import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { Section } from "@/components/landing/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  audience,
  nonGoals,
  pricing,
  trust,
} from "@/lib/landing-content";

export function Audience() {
  return (
    <Section
      id="untuk-siapa"
      title={audience.title}
      description={audience.description}
      tone="muted"
    />
  );
}

export function Trust() {
  return (
    <Section id="kredibilitas" title={trust.title}>
      <ul className="flex max-w-2xl flex-col gap-3">
        {trust.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <CheckIcon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-success"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function NonGoals() {
  return (
    <Section id="tidak-dilakukan" title={nonGoals.title} tone="muted">
      <ul className="flex max-w-2xl flex-col gap-3">
        {nonGoals.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <XMarkIcon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Pricing() {
  return (
    <Section id="harga" title={pricing.title}>
      <Card className="max-w-2xl gap-4">
        <p className="leading-7">{pricing.description}</p>
        <div>
          <Button asChild>
            <a href="#daftar-akhir">Daftar tunggu</a>
          </Button>
        </div>
      </Card>
    </Section>
  );
}
