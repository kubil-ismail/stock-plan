import { Section } from "@/components/landing/section";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { steps } from "@/lib/landing-content";

export function HowItWorks() {
  return (
    <Section id="cara-kerja" title="Cara kerja StockPlan">
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex">
            <Card className="w-full gap-3">
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
              >
                {index + 1}
              </span>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
