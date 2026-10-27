import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  tone?: "default" | "muted" | "accent";
  className?: string;
  children?: ReactNode;
};

const tones = {
  default: "",
  muted: "bg-muted/50",
  accent: "bg-accent",
} as const;

export function Section({
  id,
  title,
  description,
  tone = "default",
  className,
  children,
}: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("scroll-mt-20 py-16 sm:py-24", tones[tone], className)}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2
            id={titleId}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="text-lg leading-7 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
