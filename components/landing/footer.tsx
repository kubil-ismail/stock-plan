import Image from "next/image";

import { footer } from "@/lib/landing-content";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Image src="/logo-full.png" alt="StockPlan" width={120} height={30} />
          <nav aria-label="Tautan hukum">
            <ul className="flex gap-6 text-sm">
              {footer.links.map((link) => (
                <li key={link.label}>
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
        </div>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          {footer.disclaimer}
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} StockPlan
        </p>
      </div>
    </footer>
  );
}
