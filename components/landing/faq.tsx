"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { Section } from "@/components/landing/section";
import { faq } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

export function Faq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" title="Pertanyaan yang sering ditanyakan" tone="muted">
      <ul className="flex max-w-3xl flex-col divide-y rounded-lg border bg-card">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `${baseId}-question-${index}`;
          const panelId = `${baseId}-answer-${index}`;

          return (
            <li key={item.question}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.question}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={cn(
                      "size-5 shrink-0 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-5 pb-4 leading-7 text-muted-foreground"
              >
                {item.answer}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
