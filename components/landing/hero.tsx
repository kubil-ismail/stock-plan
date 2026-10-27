import { WaitlistForm } from "@/components/landing/waitlist-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/landing-content";

export function Hero() {
  return (
    <section
      id="daftar"
      aria-labelledby="hero-title"
      className="scroll-mt-20 py-16 sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <Badge variant="secondary">{hero.badge}</Badge>
        <h1
          id="hero-title"
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
        >
          {hero.title}
        </h1>
        <p className="max-w-2xl text-lg leading-7 text-muted-foreground">
          {hero.description}
        </p>
        <WaitlistForm className="w-full max-w-md" />
        <Button asChild variant="ghost" size="sm">
          <a href="#demo">{hero.secondaryCta}</a>
        </Button>
        <p className="text-sm text-muted-foreground">{hero.disclaimer}</p>
      </div>
    </section>
  );
}
