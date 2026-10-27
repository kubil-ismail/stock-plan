import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  LinkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { Section } from "@/components/landing/section";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/landing-content";

const icons = [
  MagnifyingGlassIcon,
  LinkIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
];

export function Features() {
  return (
    <Section id="fitur" title="Yang bisa kamu lakukan di StockPlan">
      <ul className="grid gap-4 sm:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <li key={feature.title} className="flex">
              <Card className="w-full gap-3">
                <Icon aria-hidden="true" className="size-6 text-ring" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
