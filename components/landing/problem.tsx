import { Section } from "@/components/landing/section";
import { Card } from "@/components/ui/card";
import { problem } from "@/lib/landing-content";

export function Problem() {
  return (
    <Section
      id="masalah"
      title={problem.title}
      description={problem.description}
      tone="muted"
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {problem.points.map((point) => (
          <li key={point} className="flex">
            <Card className="w-full">
              <p className="font-medium leading-6">{point}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
