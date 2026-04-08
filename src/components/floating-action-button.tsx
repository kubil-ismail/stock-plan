import * as yup from "yup";
import { useRef, useState, KeyboardEvent, useEffect } from "react";
import {
  ArrowRightLeft,
  CheckCircle,
  Clock,
  MinusCircle,
  Plus,
  PlusCircle,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  add_auth_trading_plan,
  edit_auth_trading_plan,
  get_auth_brokers,
} from "@/services/auth";
import { DialogTitle } from "@radix-ui/react-dialog";
import { get_companies } from "@/services/company";
import { useRouter } from "next/navigation";
import { StockList } from "@/types/company";
import { MyBrokers, TradingPlanList } from "@/types/auth";
import { FieldLabel } from "./ui/field";
import { Spinner } from "./ui/spinner";
import { useFormik } from "formik";
import { Button } from "./button";
import { Badge } from "./badge";
import { toast } from "sonner";
import { cn } from "./ui/utils";
import { formatRupiah } from "@/lib/utils";

const validationSchema = yup.object({
  id: yup.number().optional(),
  ticker: yup.string().required("Stocks is required"),
  order_type: yup.string().required("Order Type is required"),
  broker_id: yup
    .string()
    .required("Broker is required")
    .min(1, "Price must be greater than 0"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  lot: yup
    .number()
    .typeError("Lot must be a number")
    .required("Lot is required")
    .min(1, "Lot must be at least 1"),
  expiry: yup.date().required("Expiry is required"),
  status: yup.string().optional(),
});

export function FloatingActionButton({
  variant = "floating",
  ticker = "",
  defaultValue,
}: {
  variant?: "button" | "floating" | "button-update";
  ticker?: string;
  defaultValue?: TradingPlanList;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(ticker);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState<StockList | null>(null);
  const [stockList, setStockList] = useState<StockList[] | never[]>([]);
  const [myBrokers, setMyBrokers] = useState<MyBrokers[] | never[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      ticker: "",
      order_type: "",
      broker_id: "",
      price: "0",
      lot: "0",
      expiry: "",
      status: "ONGOING",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (variant == "button-update") {
        return edit_auth_trading_plan(values).then(() => {
          router.refresh();

          setTimeout(() => {
            toast.success("Trading plan edited", {
              description: "Your trading plan has been edited successfully.",
              icon: <CheckCircle size="14px" className="text-green-600" />,
            });

            handleClose();
          }, 500);
        });
      } else {
        return add_auth_trading_plan(values).then(() => {
          router.refresh();

          setTimeout(() => {
            toast.success("Trading plan created", {
              description: "Your trading plan has been created successfully.",
              icon: <CheckCircle size="14px" className="text-green-600" />,
            });

            handleClose();
          }, 500);
        });
      }
    },
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (stockList.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % stockList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + stockList.length) % stockList.length
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedStock = stockList[selectedIndex];
      if (selectedStock) {
        handleStockSelect(selectedStock);
      }
    }
  };

  const handleStockSelect = (stock: StockList) => {
    setSelected(stock);

    formik.setFieldValue("ticker", stock.ticker);
  };

  const decrement = (field: "price" | "lot") => {
    const value = parseInt(formik.values[field]) || 0;

    if (value > 0) {
      const next = Math.max(0, value - 1);

      formik.setFieldValue(field, String(next));
    }
  };

  const increment = (field: "price" | "lot") => {
    const value = parseInt(formik.values[field]) || 0;

    formik.setFieldValue(field, String(value + 1));
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelected(null);
    setQuery("");
    setStockList([]);

    formik.resetForm();
  };

  useEffect(() => {
    if (!query) {
      setStockList([]);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(async () => {
      const response = await get_companies({ search: query });

      setStockList(response.data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const el = itemRefs.current[selectedIndex];

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (openModal) {
      setSelectedIndex(0);

      get_auth_brokers().then((response) => {
        setMyBrokers(response.data);
      });

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [openModal]);

  useEffect(() => {
    if (ticker && stockList.length) {
      const defaultStock = stockList.find((item) => item.ticker === ticker)!;

      // set default value
      if (defaultStock) handleStockSelect(defaultStock);

      // handle if type button update
      if (variant === "button-update" && defaultValue) {
        formik.setValues({
          id: defaultValue.id!,
          ticker: defaultValue.ticker!,
          order_type: defaultValue.order_type!,
          broker_id: String(defaultValue.user_broker.id)!,
          price: String(defaultValue.price)!,
          lot: String(defaultValue.lot)!,
          expiry: defaultValue.expiry!,
          status: defaultValue.status,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker, stockList]);

  useEffect(() => {
    if (ticker) setQuery(ticker);
  }, [ticker]);

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <div>
          <DialogTrigger asChild>
            {variant === "floating" ? (
              <div
                className="fixed bottom-24 md:bottom-8 right-6 z-40 group"
                aria-label="Trade"
              >
                <div className="relative">
                  {/* Button */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center cursor-pointer group-hover:scale-105 active:scale-95">
                    <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Tooltip (desktop only) */}
                  <div className="hidden md:block absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-foreground text-background px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap shadow-md">
                      Create Plan
                      <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            ) : variant === "button-update" ? (
              <Button variant="outline" className="w-full">
                Update
              </Button>
            ) : (
              <Button variant="primary" size="sm" className="flex items-center">
                <Plus className="w-3 h-3 mr-1.5" />
                Add Order
              </Button>
            )}
          </DialogTrigger>

          <DialogContent className="min-w-[400px]">
            <DialogHeader className="mb-3">
              <DialogTitle>Trading Plan</DialogTitle>
            </DialogHeader>

            <form onSubmit={formik.handleSubmit}>
              {/* STEP 1 */}
              {!selected && (
                <div>
                  <div className="flex items-center gap-3 px-5 py-4 border border-border rounded-lg">
                    <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(0);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Search stocks..."
                      className="flex-1 bg-transparent border-none outline-none text-[16px] text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Results */}
                  <div className="max-h-[60vh] overflow-y-auto">
                    {/* Search Results */}
                    {!loading && query.trim() && (
                      <div className="py-1">
                        {stockList.length > 0 ? (
                          <>
                            <div className="px-3 py-2 mb-2">
                              <p className="text-[13px] font-medium text-muted-foreground">
                                Stocks · {stockList.length}{" "}
                                {stockList.length === 1 ? "result" : "results"}
                              </p>
                            </div>
                            <div className="space-y-1">
                              {stockList.map((stock, index) => {
                                return (
                                  <div
                                    key={stock.id}
                                    ref={(el) => {
                                      itemRefs.current[index] = el;
                                    }}
                                    className={cn(
                                      "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all",
                                      selectedIndex === index
                                        ? "bg-primary/10"
                                        : "hover:bg-muted/30"
                                    )}
                                    onClick={() => handleStockSelect(stock)}
                                    style={{
                                      animation: `fadeIn 200ms ease-out ${
                                        index * 30
                                      }ms backwards`,
                                    }}
                                  >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                      <span className="text-[16px] font-bold text-primary">
                                        {stock.ticker.substring(0, 2)}
                                      </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="text-[15px] font-bold text-foreground">
                                          {stock.ticker}
                                        </p>
                                        <Badge
                                          variant="secondary"
                                          className="text-[11px] px-2 py-0"
                                        >
                                          {stock.sector.name}
                                        </Badge>
                                      </div>
                                      <p className="text-[13px] text-muted-foreground truncate">
                                        {stock.name}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div className="py-12 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                              <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-[16px] font-medium text-foreground mb-1">
                              No stocks found
                            </p>
                            <p className="text-[14px] text-muted-foreground">
                              Try searching by stock code or company name
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                      <div className="py-12 text-center px-4">
                        <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                          <Spinner className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-[16px] font-medium text-foreground mb-1">
                          Loading...
                        </p>
                        <p className="text-[14px] text-muted-foreground">
                          Preparing for searching stocks
                        </p>
                      </div>
                    )}

                    {/* Empty State (no recent searches) */}
                    {!loading && !query.trim() && (
                      <div className="py-12 text-center px-4">
                        <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                          <Clock className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-[16px] font-medium text-foreground mb-1">
                          No recent searches
                        </p>
                        <p className="text-[14px] text-muted-foreground">
                          Start searching for stocks to see them here
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {stockList.length > 0 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
                      <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">
                            ↑↓
                          </kbd>
                          <span>Navigate</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">
                            ↵
                          </kbd>
                          <span>Select</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">
                          ESC
                        </kbd>
                        <span>Close</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2 */}
              {selected && (
                <div className="space-y-5">
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all bg-muted/30 border border-border"
                    )}
                    style={{
                      animation: `fadeIn 200ms ease-out ${0 * 30}ms backwards`,
                    }}
                    onClick={() => setSelected(null)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[16px] font-bold text-primary">
                        {selected.ticker.substring(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[15px] font-bold text-foreground">
                          {selected.ticker}
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-[11px] px-2 py-0"
                        >
                          {selected.sector.name}
                        </Badge>
                      </div>
                      <p className="text-[13px] text-muted-foreground truncate">
                        {selected.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <Button size="xs" variant="ghost">
                        <ArrowRightLeft size="20px" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="input-group-url">
                      Order Type
                    </FieldLabel>

                    <div>
                      <Select
                        onValueChange={(value) =>
                          formik.setFieldValue("order_type", value)
                        }
                        value={formik.values.order_type}
                      >
                        <SelectTrigger
                          className={cn(
                            "rounded-md py-4 w-50 bg-white",
                            "transition-all duration-200",
                            formik.errors.order_type &&
                              formik.touched.order_type
                              ? "border-destructive focus:ring-destructive"
                              : "border-border"
                          )}
                        >
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="BUY">BUY</SelectItem>
                            <SelectItem value="SELL">SELL</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {formik.errors.order_type &&
                        formik.touched.order_type && (
                          <p className="text-[12px] text-destructive mt-2 transition-all duration-200">
                            {formik.errors.order_type}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="input-group-url">Broker</FieldLabel>

                    <div>
                      <Select
                        onValueChange={(value) =>
                          formik.setFieldValue("broker_id", value)
                        }
                        value={formik.values.broker_id}
                      >
                        <SelectTrigger
                          className={cn(
                            "rounded-md py-4 w-50 bg-white",
                            "transition-all duration-200",
                            formik.errors.broker_id && formik.touched.broker_id
                              ? "border-destructive focus:ring-destructive"
                              : "border-border"
                          )}
                        >
                          <SelectValue placeholder="Select Broker" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Broker</SelectLabel>
                            {myBrokers.map((item) => (
                              <SelectItem value={String(item.id)} key={item.id}>
                                {item.broker.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {formik.errors.broker_id && formik.touched.broker_id && (
                        <p className="text-[12px] text-destructive mt-2 transition-all duration-200">
                          {formik.errors.broker_id}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="input-group-url">Price</FieldLabel>

                    <div>
                      <InputGroup
                        className={cn(
                          "rounded-md py-4 w-50 bg-white",
                          "transition-all duration-200",
                          formik.errors.price && formik.touched.price
                            ? "border-destructive focus:ring-destructive"
                            : "border-border"
                        )}
                      >
                        <InputGroupInput
                          id="price"
                          name="price"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowUp") {
                              e.preventDefault();
                              increment("price");
                              return;
                            }

                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              decrement("price");
                              return;
                            }

                            if (
                              !/^\d$/.test(e.key) &&
                              !["Backspace", "Delete"].includes(e.key)
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <InputGroupAddon
                          className="cursor-pointer"
                          onClick={() => decrement("price")}
                        >
                          <MinusCircle />
                        </InputGroupAddon>
                        <InputGroupAddon
                          className="cursor-pointer"
                          align="inline-end"
                          onClick={() => increment("price")}
                        >
                          <PlusCircle />
                        </InputGroupAddon>
                      </InputGroup>

                      {formik.errors.price && formik.touched.price && (
                        <p className="text-[12px] text-destructive mt-2 transition-all duration-200">
                          {formik.errors.price}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="input-group-url">
                      Buy Order Lot
                    </FieldLabel>

                    <div>
                      <InputGroup
                        className={cn(
                          "rounded-md py-4 w-50 bg-white",
                          "transition-all duration-200",
                          formik.errors.lot && formik.touched.lot
                            ? "border-destructive focus:ring-destructive"
                            : "border-border"
                        )}
                      >
                        <InputGroupInput
                          id="lot"
                          name="lot"
                          value={formik.values.lot}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowUp") {
                              e.preventDefault();
                              increment("lot");
                              return;
                            }

                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              decrement("lot");
                              return;
                            }

                            if (
                              !/^\d$/.test(e.key) &&
                              !["Backspace", "Delete"].includes(e.key)
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <InputGroupAddon
                          className="cursor-pointer"
                          onClick={() => decrement("lot")}
                        >
                          <MinusCircle />
                        </InputGroupAddon>
                        <InputGroupAddon
                          className="cursor-pointer"
                          align="inline-end"
                          onClick={() => increment("lot")}
                        >
                          <PlusCircle />
                        </InputGroupAddon>
                      </InputGroup>

                      {formik.errors.lot && formik.touched.lot && (
                        <p className="text-[12px] text-destructive mt-2 transition-all duration-200">
                          {formik.errors.lot}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="input-group-url">Expiry</FieldLabel>

                    <div>
                      <InputGroup
                        className={cn(
                          "rounded-md py-4 w-50 bg-white",
                          "transition-all duration-200",
                          formik.errors.expiry && formik.touched.expiry
                            ? "border-destructive focus:ring-destructive"
                            : "border-border"
                        )}
                      >
                        <InputGroupInput
                          type="date"
                          id="expiry"
                          name="expiry"
                          min={new Date().toISOString().split("T")[0]}
                          value={formik.values.expiry}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </InputGroup>

                      {formik.errors.expiry && formik.touched.expiry && (
                        <p className="text-[12px] text-destructive mt-2 transition-all duration-200">
                          {formik.errors.expiry}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="input-group-url">Status</FieldLabel>

                    <div>
                      <Select
                        onValueChange={(value) =>
                          formik.setFieldValue("status", value)
                        }
                        value={formik.values.status}
                      >
                        <SelectTrigger
                          className={cn(
                            "rounded-md py-4 w-50 bg-white",
                            "transition-all duration-200",
                            formik.errors.status && formik.touched.status
                              ? "border-destructive focus:ring-destructive"
                              : "border-border"
                          )}
                        >
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ONGOING">On Going</SelectItem>
                            <SelectItem value="ONHOLD">On Hold</SelectItem>
                            <SelectItem value="SUCCESS">Success</SelectItem>
                            <SelectItem value="FAILED">Failed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {formik.errors.status && formik.touched.status && (
                        <p className="text-[12px] text-destructive mt-2 transition-all duration-200">
                          {formik.errors.status}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm leading-none font-medium mb-1">
                        Total Investment
                      </p>
                      <p className="text-sm leading-none font-medium">
                        (Plus Fee)
                      </p>
                    </div>

                    <span className="font-bold">
                      {formatRupiah(
                        parseInt(formik.values.lot) *
                          100 *
                          parseInt(formik.values.price)
                      )}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full mt-10"
                    disabled={formik.isSubmitting || !formik.isValid}
                    loading={formik.isSubmitting}
                  >
                    {variant === "button-update" ? "Update" : "Create"}
                  </Button>
                </div>
              )}
            </form>
          </DialogContent>
        </div>
      </Dialog>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
