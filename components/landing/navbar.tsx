import Image from "next/image";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/landing-content";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <a href="/" className="flex items-center">
          <Image
            src="/logo-full.png"
            alt="StockPlan"
            width={150}
            height={38}
            priority
          />
        </a>
        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="sm">
          <a href="#daftar">Daftar tunggu</a>
        </Button>
      </div>
    </header>
  );
}
