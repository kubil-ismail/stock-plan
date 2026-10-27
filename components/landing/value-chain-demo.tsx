import { Section } from "@/components/landing/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { valueChainDemo } from "@/lib/landing-content";

export function ValueChainDemo() {
  return (
    <Section
      id="demo"
      title="Lihat satu tema dari hulu ke hilir"
      description={valueChainDemo.description}
      tone="muted"
    >
      <Card className="gap-4 overflow-x-auto">
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{valueChainDemo.title}</CardTitle>
          <Badge variant="outline">Ilustrasi</Badge>
        </div>
        <CardContent>
          <table className="w-full min-w-[28rem] text-left text-sm">
            <caption className="sr-only">
              Contoh eksposur pendapatan per tahap rantai nilai batubara
              (data ilustrasi)
            </caption>
            <thead>
              <tr className="text-muted-foreground">
                <th scope="col" className="pb-3 font-medium">
                  Kode
                </th>
                <th scope="col" className="pb-3 font-medium">
                  Tahap
                </th>
                <th scope="col" className="pb-3 font-medium">
                  Eksposur pendapatan
                </th>
              </tr>
            </thead>
            <tbody>
              {valueChainDemo.rows.map((row) => (
                <tr key={row.code} className="border-t">
                  <th scope="row" className="py-3 pr-4 font-semibold">
                    {row.code}
                  </th>
                  <td className="py-3 pr-4">
                    <Badge variant="secondary">{row.layer}</Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 w-full min-w-24 overflow-hidden rounded-full bg-muted"
                        role="img"
                        aria-label={`Eksposur pendapatan ${row.exposure} persen`}
                      >
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${row.exposure}%` }}
                        />
                      </div>
                      <span className="w-10 text-right font-semibold">
                        {row.exposure}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">{valueChainDemo.note}</p>
    </Section>
  );
}
