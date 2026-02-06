"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import type {
  ApiResponse,
  ListCompanies,
  ListSetup,
  TradingPlan,
} from "@/types";
import dynamic from "next/dynamic";
import "@/styles/quill.min.css";
import { TradingPagination } from "@/components/Pagination";
import { DataTable } from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams, useRouter } from "next/navigation";
import { getNextSort } from "@/lib/utils";
import { TradingSearch } from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { Setup_Form_Readonly } from "../trading-setups/_form/_Setup.form";
import { DatePickerNaturalLanguage } from "@/components/Datepicker";
import { Spinner } from "@/components/ui/spinner";
import Ticker_Form_Readonly from "./_form/_Ticker.form";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
});

export default function View({
  loading,
  list,
  companies,
  setup,
}: {
  loading?: boolean;
  list: ApiResponse<TradingPlan[]>;
  companies: ApiResponse<ListCompanies[]>;
  setup: ApiResponse<ListSetup[]>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const [isSubmit, setIsSubmit] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogTicker, setIsDialogTicker] = useState<string | null>(null);
  const [isDialogSetup, setIsDialogSetup] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<TradingPlan | null>(null);
  const [sortField, sortDir] = currentSort?.split(":") ?? [];

  const [formData, setFormData] = useState({
    ticker: "",
    setup: "",
    entry_price: 0,
    entry_date: new Date().toISOString().split("T")[0],
    entry_reason: "",
    risk_note: "",
    confidenceScore: 5,
    emotionState: "Calm and focused",
    script: "",
    status: "Planned" as TradingPlan["status"],
  });

  const emotionOptions = [
    "Calm and focused",
    "Patient",
    "Confident",
    "Slightly anxious",
    "Excited",
    "Uncertain",
    "FOMO",
    "Revenge trading urge",
  ];

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    const request = await fetch("/api/trading/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticker: formData.ticker,
        setup: formData.setup,
        entry_price: formData.entry_price,
        entry_date: formData.entry_date,
        entry_reason: formData.entry_reason,
        risk_note: formData.risk_note,
        psychology: {
          confidence_score: formData.confidenceScore,
          emotion_state: formData.emotionState,
        },
        script: formData.script,
        status: formData.status,
      }),
    });

    setIsDialogOpen(false);
    setIsSubmit(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      await fetch(`/api/trading/plan/${id}`, {
        method: "DELETE",
      });

      router.refresh();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-700 border-green-200";
      case "ARCHIVE":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "ACTIVE":
        return "bg-blue-100 textEdit2-blue-700 border-blue-200";
      case "FAILED":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const columns: ColumnDef<TradingPlan>[] = [
    {
      accessorKey: "ticker",
      header: "Ticker",
      cell: (props) => (
        <p
          className="underline cursor-pointer"
          onClick={() => setIsDialogTicker(String(props.getValue()))}
        >
          {String(props.getValue())}
        </p>
      ),
    },
    {
      accessorKey: "m_trading_setup",
      header: "Setup Name",
      cell: (props) => (
        <p
          className="underline cursor-pointer"
          onClick={() =>
            setIsDialogSetup(
              String(props.row.original.m_trading_setup.setup_slug)
            )
          }
        >
          {String(props.row.original.m_trading_setup.name)}
        </p>
      ),
    },
    {
      accessorKey: "entry_price",
      header: "Entry Price",
    },
    {
      accessorKey: "entry_date",
      header: () => {
        const isActive = sortField === "entry_date";

        const Icon = !isActive
          ? ArrowUpDown
          : sortDir === "asc"
          ? ArrowUp
          : ArrowDown;

        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1"
            onClick={() => {
              const nextSort = getNextSort(currentSort, "entry_date");

              const params = new URLSearchParams(searchParams.toString());
              params.set("sort", nextSort);
              params.set("page", "1"); // reset pagination
              router.push(`?${params.toString()}`);
            }}
          >
            Entry Date
            <Icon className="h-4 w-4" />
          </Button>
        );
      },
      cell: (props) => new Date(String(props.getValue())).toLocaleDateString(),
    },
    {
      accessorKey: "risk_note",
      header: "Risk Note",
    },
    {
      accessorKey: "status",
      header: () => {
        const isActive = sortField === "status";

        const Icon = !isActive
          ? ArrowUpDown
          : sortDir === "asc"
          ? ArrowUp
          : ArrowDown;

        return (
          <Button
            variant="ghost"
            className="flex items-center gap-1"
            onClick={() => {
              const nextSort = getNextSort(currentSort, "status");

              const params = new URLSearchParams(searchParams.toString());
              params.set("sort", nextSort);
              params.set("page", "1"); // reset pagination
              router.push(`?${params.toString()}`);
            }}
          >
            Entry Date
            <Icon className="h-4 w-4" />
          </Button>
        );
      },
      cell: (props) => (
        <>
          <Badge
            variant="outline"
            className={getStatusColor(String(props.getValue()))}
          >
            {String(props.getValue())}
          </Badge>
        </>
      ),
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: (props) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            // onClick={() => handleOpenDialog(setup)}
            className="hover:bg-muted"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(String(props.getValue()))}
            className="hover:bg-muted"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-foreground mb-2">Trade Plans</h1>
          <p className="text-muted-foreground">
            Create and manage individual trade plans
          </p>
        </div>
        <div className="flex items-center gap-[10px]">
          <TradingSearch total={list?.options?.total ?? 0} />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? "Edit Plan" : "Create New Trade Plan"}
                </DialogTitle>
                <DialogDescription>
                  Plan your trade entry, document your reasoning, and check your
                  psychology
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Trade Logic Section */}
                <div className="space-y-4">
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
                    Trade Logic
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticker">Ticker Symbol *</Label>
                      <Select
                        value={formData.ticker}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            ticker: value,
                          })
                        }
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {companies?.data?.map((item) => (
                            <SelectItem value={item.ticker} key={item.id}>
                              {item.ticker}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setup">Setup *</Label>
                      <Select
                        value={formData.setup}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            setup: value,
                            script: String(
                              setup.data?.find(
                                (item) => item.setup_slug === value
                              )?.script
                            ),
                          })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        {/* <SelectContent>
                          {setup?.data?.map((item) => (
                            <SelectItem value={item.setup_slug} key={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent> */}
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entry_price">Entry Price *</Label>
                      <Input
                        id="entry_price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.entry_price || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            entry_price: parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entry_date">Entry Date *</Label>
                      <DatePickerNaturalLanguage
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            entry_date: new Date(e).toISOString().split("T")[0],
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entry_reason">Entry Reason *</Label>
                    <Textarea
                      id="entry_reason"
                      value={formData.entry_reason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entry_reason: e.target.value,
                        })
                      }
                      placeholder="Why are you taking this trade? What's your thesis?"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          status: value as TradingPlan["status"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planned">Planned</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Risk Notes Section */}
                <div className="space-y-4">
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
                    Risk Notes
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="risk_note">Risk Note</Label>
                    <Textarea
                      id="risk_note"
                      value={formData.risk_note}
                      onChange={(e) =>
                        setFormData({ ...formData, risk_note: e.target.value })
                      }
                      placeholder="Document your stop loss, position size, and risk management plan"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Psychology Section */}
                <div className="space-y-4">
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
                    Psychology Check
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="confidenceScore">
                      Confidence Score: {formData.confidenceScore}/10
                    </Label>
                    <Slider
                      id="confidenceScore"
                      min={1}
                      max={10}
                      step={1}
                      value={[formData.confidenceScore]}
                      onValueChange={(value) =>
                        setFormData({ ...formData, confidenceScore: value[0] })
                      }
                      className="py-4"
                    />
                    <p className="text-xs text-muted-foreground">
                      How confident are you in this trade setup?
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emotionState">Emotion State</Label>
                    <Select
                      value={formData.emotionState}
                      onValueChange={(value) =>
                        setFormData({ ...formData, emotionState: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {emotionOptions.map((emotion) => (
                          <SelectItem key={emotion} value={emotion}>
                            {emotion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      How are you feeling about this trade?
                    </p>
                  </div>
                </div>

                <Separator />

                {/* script Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                      script (Editable Checklist)
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Pre-filled from setup. Customize for this specific trade.
                    </p>
                  </div>
                  <RichTextEditor
                    value={formData.script}
                    onChange={(value) =>
                      setFormData({ ...formData, script: value })
                    }
                    placeholder="Your trading checklist will appear here..."
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmit}>
                    {isSubmit && <Spinner data-icon="inline-start" />}
                    {editingPlan
                      ? "Update Plan"
                      : isSubmit
                      ? "Create Plan..."
                      : "Create Plan"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Plans Table */}
      {list?.data?.length === 0 ? (
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">
              Create a trading setup first
            </p>
            <p className="text-sm text-muted-foreground">
              Go to Trading Setups to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <DataTable
                loading={loading}
                columns={columns}
                data={list?.data ?? []}
              />

              <TradingPagination
                show={!loading && list?.data?.length > 0}
                page={list?.options?.page ?? 1}
                limit={list?.options?.limit ?? 0}
                total={list?.options?.total ?? 0}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Setup_Form_Readonly
        isDialogOpen={isDialogSetup}
        setIsDialogOpen={() => setIsDialogSetup(null)}
      />

      <Ticker_Form_Readonly
        isDialogOpen={isDialogTicker}
        setIsDialogOpen={() => setIsDialogTicker(null)}
      />
    </div>
  );
}
