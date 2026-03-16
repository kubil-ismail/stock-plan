"use client";
import { useEffect } from "react";
import { GlassCard } from "@/components/glass-card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Building2,
  Users,
  Briefcase,
  Shield,
  Network,
  Plus,
  Globe,
  Calendar,
  StarIcon,
} from "lucide-react";
import { useDetailNavbar } from "@/contexts/detail-navbar-context";
import { useRouter, useSearchParams } from "next/navigation";
import { PB_PATH_STOCKS, PR_PATH_ORDER_ADD } from "@/lib/route";
import Link from "next/link";
import { StockDetailResponse } from "@/types/company";
import { format } from "date-fns";

interface Response {
  companies: StockDetailResponse;
}

interface Props {
  response: Response;
}

export default function StockDetail(props: Props) {
  const { companies } = props?.response ?? {};

  const router = useRouter();
  const search = useSearchParams();
  const back = search.get("ref") ?? PB_PATH_STOCKS;
  const { setNavbar, clearNavbar } = useDetailNavbar();

  // Find stock data
  const stock = companies.data;
  const website = stock.website
    ?.replace("www.", "")
    ?.replace("https://", "")
    ?.replace("http://", "")
    ?.replace("/", "");

  const secretary = stock.managements?.find(
    (item) => item.position === "SEKRETARIS PERUSAHAAN"
  );

  const directors =
    stock.managements?.filter((item) =>
      item.position.toLowerCase().includes("direktur")
    ) ?? [];

  const commissioners =
    stock.managements?.filter((item) =>
      item.position.toLowerCase().includes("komisaris")
    ) ?? [];

  const subsidiaries =
    stock.subsidiaries?.sort(
      (a, b) =>
        parseFloat(b.percentage.replace("%", "")) -
        parseFloat(a.percentage.replace("%", ""))
    ) ?? [];

  const shareholders = stock.shareholders?.sort(
    (a, b) =>
      parseFloat(b.percentage.replace("%", "")) -
      parseFloat(a.percentage.replace("%", ""))
  );

  // Set detail navbar title
  useEffect(() => {
    if (stock) {
      setNavbar({
        title: stock.name,
        showAction: true,
        actionType: "bookmark",
        onAction: () => {
          // Bookmark action (mock)
          console.log("Bookmarked", stock.ticker);
        },
      });
    }
    return () => clearNavbar();
  }, [stock, setNavbar, clearNavbar]);

  if (!stock) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto">
          <GlassCard className="p-8 text-center">
            <h2 className="mb-2">Stock not found</h2>
            <button
              onClick={() => router.back()}
              className="text-primary hover:underline"
            >
              Go back
            </button>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="md:py-0 pb-24 md:pb-8">
      <div className="mx-auto space-y-6 md:space-y-8">
        {/* Back Button - Desktop Only */}
        <Link
          href={back}
          className="hidden md:inline-flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stocks
        </Link>

        {/* Stock Header Section */}
        <GlassCard className="p-5 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
            {/* Desktop - Large Stock Logo */}
            <div className="hidden md:flex w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 items-center justify-center flex-shrink-0">
              <span className="text-[28px] md:text-[36px] font-bold text-primary">
                {stock.ticker.substring(0, 2)}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              {/* Stock Info */}
              <div className="flex gap-4">
                {/* Large Stock Logo */}
                <div className="flex md:hidden w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[28px] md:text-[36px] font-bold text-primary">
                    {stock.ticker.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-[28px] md:text-[28px] font-bold text-foreground mb-1">
                    {stock.ticker}
                  </h1>
                  <p className="text-[16px] md:text-[18px] text-muted-foreground mb-4">
                    {stock.name}
                  </p>
                </div>
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-[13px] px-3 py-1.5">
                  {stock.sector.name}
                </Badge>
                <Badge variant="secondary" className="text-[13px] px-3 py-1.5">
                  {stock.subsector.name}
                </Badge>
                <Badge variant="secondary" className="text-[13px] px-3 py-1.5">
                  {stock.industry.name}
                </Badge>
                <Badge variant="secondary" className="text-[13px] px-3 py-1.5">
                  {stock.subindustry.name}
                </Badge>
              </div>

              {/* Price and Change */}
              {/* <div>
                <div className="flex items-center gap-4 mb-1">
                  <div>
                    <p className="text-[36px] md:text-[28px] font-bold text-foreground leading-none">
                      ${stock.price.toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      isPositive ? "text-success" : "text-destructive"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-6 h-6" />
                    ) : (
                      <TrendingDown className="w-6 h-6" />
                    )}
                    <span className="text-[24px] font-semibold">
                      {isPositive ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                    <span className="text-[18px] font-medium">
                      ({isPositive ? "+" : ""}${stock.change.toFixed(2)})
                    </span>
                  </div>
                </div>

                <p className="text-secondary text-[14px]">
                  As of today at 14:39 GMT+7
                </p>
              </div> */}

              {/* Quick CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={() =>
                    router.push(`${PR_PATH_ORDER_ADD}?stock=${stock.id}`)
                  }
                >
                  <StarIcon className="w-3 h-3 mr-1.5" />
                  Bookmark
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center"
                  onClick={() =>
                    router.push(`${PR_PATH_ORDER_ADD}?stock=${stock.id}`)
                  }
                >
                  <Plus className="w-3 h-3 mr-1.5" />
                  Add Order
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Your Asset Allocation in This Stock */}
        {/* {Boolean(userPosition) && (
          <GlassCard className="p-5 md:p-6 border-2">
            <h3 className="text-[20px] font-semibold text-foreground mb-1 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Your Allocation in This Stock
            </h3>
            <p className="text-[13px] text-muted-foreground mb-5">
              Summary of your holdings and performance for {stock.ticker}
            </p>

            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-5">
                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    Total Buy Amount
                  </p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    ${userPosition?.totalBuy.toLocaleString()}
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">
                    Average Price
                  </p>
                  <p className="text-[20px] md:text-[24px] font-bold text-primary">
                    ${userPosition?.averagePrice.toFixed(2)}
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">
                    Total Lot
                  </p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    {userPosition?.totalLot}
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1 flex items-center gap-1">
                    {isProfitable ? (
                      <TrendingUpIcon className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDownIcon className="w-3.5 h-3.5" />
                    )}
                    Unrealized P/L
                  </p>
                  <p
                    className={`flex items-center gap-2 ${
                      isProfitable ? "text-success" : "text-destructive"
                    }`}
                  >
                    <span className="text-[24px] md:text-[28px] font-bold">
                      {isProfitable ? "+" : ""}$
                      {Math.abs(userPosition?.profitLoss ?? 0).toLocaleString()}
                    </span>
                    <span>
                      ({isProfitable ? "+" : ""}
                      {userPosition?.profitLossPercent.toFixed(2)}% )
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/20 border border-border">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Unrealized P/L</strong>{" "}
                  shows potential profit or loss if you sell at current market
                  price. This changes in real-time with the stock price.
                </p>
              </div>
            </div>
          </GlassCard>
        )} */}

        {/* Stock Snapshot Section */}
        {/* <GlassCard className="p-5 md:p-6">
          <h3 className="text-[18px] font-semibold text-foreground mb-5">
            Stock Snapshot
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">
                Market Cap
              </p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                ${stock.marketCap}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">
                P/E Ratio
              </p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                {stock.peRatio}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">
                Dividend Yield
              </p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                {stock.dividendYield}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">Volume</p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                {stock.volume}
              </p>
            </div>
          </div>
        </GlassCard> */}

        {/* Company Information Section */}
        <GlassCard className="p-5 md:p-6">
          <h3 className="text-[20px] font-semibold text-foreground mb-1 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Company Information
          </h3>
          <p className="text-[13px] text-muted-foreground mb-6">
            Detailed corporate structure and fundamentals
          </p>

          {/* Company Overview */}
          <div className="mb-6 pb-6 border-b border-border">
            <h4 className="text-[16px] font-semibold text-foreground mb-3">
              Company Profile
            </h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
              {stock.main_business}
            </p>

            {/* Corporate Details */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                <Building2 className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[12px] text-muted-foreground mb-0.5">
                    Headquarters
                  </p>
                  <p className="text-[14px] font-medium text-foreground">
                    {stock.office_address || "Jakarta, Indonesia"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                <Calendar className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[12px] text-muted-foreground mb-0.5">
                    Listing Date
                  </p>
                  <p className="text-[14px] font-medium text-foreground">
                    {format(stock.listing_date, "dd MMMM yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                <Globe className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[12px] text-muted-foreground mb-0.5">
                    Website
                  </p>
                  <a
                    href={stock.website || "#"}
                    className="text-[14px] font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Corporate Structure */}
          <div className="space-y-6">
            <Accordion
              type="multiple"
              defaultValue={["secretary", "directors", "commissioners"]}
              className="space-y-3"
            >
              <AccordionItem
                value="secretary"
                className="border border-border rounded-xl bg-card/30"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <h4 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="hidden md:block w-4 h-4 text-primary" />
                    Company Secretary / Sekretaris Perusahaan
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="bg-muted/20 rounded-xl p-4 flex items-start gap-3">
                    {/* Avatar Placeholder */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[14px] font-bold text-primary">
                        {secretary?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-[14px] font-semibold text-foreground mb-0.5">
                          {secretary?.name}
                        </p>

                        {secretary?.is_affiliated && (
                          <Badge
                            variant="secondary"
                            size="sm"
                            className="text-[11px] px-2 py-0.5"
                          >
                            Affiliated
                          </Badge>
                        )}
                      </div>
                      <p className="text-[13px] text-muted-foreground">
                        {secretary?.position}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Directors */}
              <AccordionItem
                value="directors"
                className="border border-border rounded-xl bg-card/30"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <h4 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="hidden md:block w-4 h-4 text-primary" />
                    Board of Directors / Direksi
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    {directors.map((director, index) => (
                      <div
                        key={index}
                        className="bg-muted/20 rounded-xl p-4 flex items-start gap-3"
                      >
                        {/* Avatar Placeholder */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[14px] font-bold text-primary">
                            {director.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="text-[14px] font-semibold text-foreground mb-0.5">
                              {director.name}
                            </p>

                            {director.is_affiliated && (
                              <Badge
                                variant="secondary"
                                size="sm"
                                className="text-[11px] px-2 py-0.5"
                              >
                                Affiliated
                              </Badge>
                            )}
                          </div>
                          <p className="text-[13px] text-muted-foreground">
                            {director.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Commissioners */}
              <AccordionItem
                value="commissioners"
                className="border border-border rounded-xl bg-card/30"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <h4 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
                    <Shield className="hidden md:block w-4 h-4 text-primary" />
                    Board of Commissioners / Komisaris
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    {commissioners.map((commissioner, index) => (
                      <div
                        key={index}
                        className="bg-muted/20 rounded-xl p-4 flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[14px] font-bold text-primary">
                            {commissioner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="text-[14px] font-semibold text-foreground mb-0.5">
                              {commissioner.name}
                            </p>

                            {commissioner.is_affiliated && (
                              <Badge
                                variant="secondary"
                                size="sm"
                                className="text-[11px] px-2 py-0.5"
                              >
                                Affiliated
                              </Badge>
                            )}
                          </div>
                          <p className="text-[13px] text-muted-foreground">
                            {commissioner.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Subsidiaries */}
              <AccordionItem
                value="Subsidiaries"
                className="border border-border rounded-xl bg-card/30"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <h4 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
                    <Network className="hidden md:block w-4 h-4 text-primary" />
                    Subsidiaries / Anak Perusahaan
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
                    {subsidiaries.map((subsidiary, index) => (
                      <div
                        key={index}
                        className="bg-muted/20 rounded-xl p-4 flex items-center justify-between gap-3"
                      >
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[14px] font-bold text-primary">
                              <Building2 className="w-4 h-4 text-primary" />
                            </span>
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-foreground mb-0.5">
                              {subsidiary.name}
                            </p>
                            <p className="text-[13px] text-muted-foreground">
                              {subsidiary.type}
                            </p>
                          </div>
                        </div>
                        <p className="text-right text-[16px] font-bold text-primary ml-4 w-22">
                          {subsidiary.percentage}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Shareholders */}
              <AccordionItem
                value="Shareholders"
                className="border border-border rounded-xl bg-card/30 last:border-b"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <h4 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
                    <Users className="hidden md:block w-4 h-4 text-primary" />
                    Shareholders / Pemegang Saham
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="space-y-3">
                    {shareholders.map((shareholder, index) => (
                      <div key={index} className="bg-muted/20 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-[14px] font-medium text-foreground flex-1 flex items-center flex-wrap gap-2">
                            <span>{shareholder.name}</span>
                            {index === 0 && (
                              <Badge
                                variant="secondary"
                                className="text-[11px] px-2 py-0.5"
                              >
                                Major Shareholder
                              </Badge>
                            )}
                          </div>
                          <p className="text-[16px] font-bold text-primary ml-4">
                            {shareholder.percentage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
