"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CircleUser, MailIcon, PhoneCall, PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ================= TYPES ================= */

interface Management {
  id: number;
  name: string;
  type: string;
  position: string;
  phone: string;
  email: string;
  is_affiliated: boolean;
}

interface Shareholder {
  id: number;
  name: string;
  type: string;
  total: string;
  percentage: string;
}

interface Subsidiary {
  id: number;
  name: string;
  type: string;
  asset: string;
  percentage: string;
}

interface CompanyDetail {
  id: number;
  ticker: string;
  name: string;
  listing_date: string;
  listing_board: string;
  main_business: string;
  sector?: { name: string };
  subsector?: { name: string };
  industry?: { name: string };
  subindustry?: { name: string };
  managements: Management[];
  shareholders: Shareholder[];
  subsidiaries: Subsidiary[];
}

/* ================= COMPONENT ================= */

export default function Ticker_Form_Readonly(props: {
  isDialogOpen: string | null;
  setIsDialogOpen: (open: boolean) => void;
}) {
  const { isDialogOpen, setIsDialogOpen } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [company, setCompany] = useState<CompanyDetail | null>(null);

  useEffect(() => {
    if (!isDialogOpen) return;

    const controller = new AbortController();

    setIsLoading(true);
    setError("");

    fetch(`/api/companies/${isDialogOpen}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed load data");
        return res.json();
      })
      .then((res) => {
        setCompany(res.data ?? res);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to load company data");
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [isDialogOpen]);

  const sekretaris =
    company?.managements?.filter((m) => m.type === "SEKRETARIS PERUSAHAAN") ??
    [];
  const direksi =
    company?.managements?.filter((m) => m.type === "DIREKSI") ?? [];
  const komisaris =
    company?.managements?.filter((m) => m.type === "KOMISARIS") ?? [];
  const audit =
    company?.managements?.filter((m) => m.type === "KOMITE AUDIT") ?? [];

  return (
    <Dialog open={Boolean(isDialogOpen)} onOpenChange={setIsDialogOpen}>
      <DialogContent className="min-w-4xl min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Company</DialogTitle>
          <DialogDescription>Company detail information</DialogDescription>
        </DialogHeader>

        {/* LOADING */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-10 flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {/* ERROR */}
        {error && !isLoading && (
          <div className="text-sm text-destructive py-8 text-center">
            {error}
          </div>
        )}

        {!error && company && (
          <div className="space-y-8">
            {/* BASIC INFO */}
            <section className="grid grid-cols-2 gap-4">
              <Info label="Ticker" value={company.ticker} />
              <Info label="Company Name" value={company.name} />
              <Info label="Sector" value={company.sector?.name} />
              <Info label="Subsector" value={company.subsector?.name} />
              <Info label="Industry" value={company.industry?.name} />
              <Info label="Sub Industry" value={company.subindustry?.name} />
              <Info label="Listing Board" value={company.listing_board} />
              <Info
                label="Listing Date"
                value={new Date(company.listing_date).toLocaleDateString()}
              />
            </section>

            {/* BUSINESS */}
            <section className="space-y-2">
              <Label>Main Business</Label>
              <div className="border rounded-md p-3 text-sm bg-muted/30">
                {company.main_business || "-"}
              </div>
            </section>

            {/* MANAGEMENT */}
            <section className="space-y-4">
              <Label className="text-base">Management</Label>
              <ManagementTable title="Sekretaris" data={sekretaris} />
              <ManagementTable title="Direksi" data={direksi} />
              <ManagementTable title="Komisaris" data={komisaris} />
              <ManagementTable title="Auditor" data={audit} />
            </section>

            {/* SHAREHOLDERS */}
            <section className="space-y-3">
              <Label className="text-base">Shareholders</Label>
              <ShareholderTable data={company.shareholders || []} />
            </section>

            {/* SUBSIDIARIES */}
            <section className="space-y-3">
              <Label className="text-base">Subsidiaries</Label>
              <SubsidiaryTable data={company.subsidiaries || []} />
            </section>

            {/* ACTION */}
            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ================= SUB COMPONENT ================= */

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="border rounded-md px-3 py-2 text-sm bg-muted/30">
        {value || "-"}
      </div>
    </div>
  );
}

/* MANAGEMENT TABLE */

function AffiliationBadge({ item }: { item: Management }) {
  switch (item.type) {
    case "DIREKSI":
      if (item.is_affiliated)
        return (
          <div className={cn("flex items-center gap-1 mt-1 text-xs")}>
            <CircleUser className="w-4" />
            Affiliated
          </div>
        );
      else return null;

    case "KOMISARIS":
      if (item.is_affiliated)
        return (
          <div className={cn("flex items-center gap-1 mt-1 text-xs")}>
            <CircleUser className="w-4" />
            Independent
          </div>
        );
      else return null;

    default:
      return null;
  }
}

function ManagementTable({
  title,
  data,
}: {
  title: string;
  data: Management[];
}) {
  if (!data.length) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted px-3 py-2 text-sm font-medium">{title}</div>
      <div className="divide-y">
        {data.map((item) => (
          <div key={item.id} className="px-3 py-2 text-sm">
            <div className="font-medium">{item.name}</div>
            <div className="text-muted-foreground">{item.position}</div>
            <AffiliationBadge item={item} />
            {item.phone !== "-" && (
              <div className="text-muted-foreground flex items-center gap-[5px]">
                <PhoneIcon className="w-4" />{" "}
                <a className="underline" href={`tel:${item.phone}`}>
                  {item.phone}
                </a>
              </div>
            )}
            {item.email !== "-" && (
              <div className="text-muted-foreground flex items-center gap-[5px]">
                <MailIcon className="w-4" />{" "}
                <a className="underline" href={`mailto:${item.email}`}>
                  {item.email}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* SHAREHOLDER TABLE */

function ShareholderTable({ data }: { data: Shareholder[] }) {
  if (!data.length) return <Empty text="No shareholder data available" />;

  return (
    <TableWrapper headers={["Name", "Type", "Shares", "Ownership"]}>
      {data.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="px-3 py-2">{item.name}</td>
          <td className="px-3 py-2">{item.type}</td>
          <td className="px-3 py-2 text-right">{item.total}</td>
          <td className="px-3 py-2 text-right">{item.percentage}</td>
        </tr>
      ))}
    </TableWrapper>
  );
}

/* SUBSIDIARY TABLE */

function SubsidiaryTable({ data }: { data: Subsidiary[] }) {
  if (!data.length) return <Empty text="No subsidiary data available" />;

  return (
    <TableWrapper headers={["Company", "Business", "Assets", "Ownership"]}>
      {data.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="px-3 py-2">{item.name}</td>
          <td className="px-3 py-2">{item.type}</td>
          <td className="px-3 py-2 text-right">{item.asset}</td>
          <td className="px-3 py-2 text-right">{item.percentage}</td>
        </tr>
      ))}
    </TableWrapper>
  );
}

/* GENERIC TABLE */

function TableWrapper({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">{children}</tbody>
      </table>
    </div>
  );
}

/* EMPTY STATE */

function Empty({ text }: { text: string }) {
  return (
    <div className="border rounded-lg p-6 text-sm text-muted-foreground text-center">
      {text}
    </div>
  );
}
