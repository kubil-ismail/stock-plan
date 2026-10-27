import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Data ilustrasi untuk pratinjau. Bukan data asli, persentase eksposur
// nanti dihitung dari laporan keuangan.
const valueChain = [
  { code: "UNTR", layer: "Kontraktor tambang", exposure: 85 },
  { code: "PTBA", layer: "Pemilik tambang", exposure: 90 },
  { code: "AADI", layer: "Logistik dan pembangkit", exposure: 55 },
  { code: "ADMR", layer: "Pengolahan", exposure: 55 },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Image
          src="/logo-full.png"
          alt="StockPlan"
          width={150}
          height={38}
          priority
        />
        <Button variant="outline" size="sm">
          Masuk
        </Button>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <section className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">
            Segera hadir
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Pahami bisnis di balik saham, bukan cuma angkanya
          </h1>
          <p className="max-w-xl text-lg leading-7 text-muted-foreground">
            Cari perusahaan lewat tema bisnis seperti batubara, lihat siapa
            saja yang bermain di setiap tahap rantai nilainya, lalu susun
            portofolio sesuai tesis investasimu.
          </p>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Email kamu"
              aria-label="Email untuk daftar tunggu"
              required
            />
            <Button type="submit" size="default">
              Daftar tunggu
              <ArrowRightIcon aria-hidden="true" />
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            StockPlan adalah alat riset dan perencanaan, bukan saran investasi.
          </p>
        </section>

        <Card className="gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>Rantai nilai batubara</CardTitle>
            <CardDescription>
              Contoh tampilan. Data pada kartu ini bersifat ilustrasi.
            </CardDescription>
          </div>
          <CardContent className="flex flex-col gap-4">
            {valueChain.map((row) => (
              <div key={row.code} className="flex items-center gap-4">
                <span className="w-14 text-sm font-semibold">{row.code}</span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <Badge variant="secondary" className="w-fit">
                    {row.layer}
                  </Badge>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-muted"
                    role="img"
                    aria-label={`Eksposur pendapatan ${row.exposure} persen`}
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${row.exposure}%` }}
                    />
                  </div>
                </div>
                <span className="w-10 text-right text-sm font-semibold">
                  {row.exposure}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
