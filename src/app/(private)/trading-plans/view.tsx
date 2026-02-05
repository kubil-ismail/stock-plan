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
import type { ApiResponse, TradingPlan } from "@/types";
import dynamic from "next/dynamic";
import "@/styles/quill.min.css";
import { TradingPagination } from "@/components/Pagination";
import { DataTable } from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams, useRouter } from "next/navigation";
import { getNextSort } from "@/lib/utils";
import { TradingSearch } from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { ComboboxBasic } from "@/components/Combobox";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
});

export default function View({
  loading,
  list,
}: {
  loading?: boolean;
  list: ApiResponse<TradingPlan[]>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");
  const setups: any = [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TradingPlan | null>(null);
  const [sortField, sortDir] = currentSort?.split(":") ?? [];

  const [formData, setFormData] = useState({
    ticker: "",
    setupId: "",
    entryPrice: 0,
    entryDate: new Date().toISOString().split("T")[0],
    entryReason: "",
    riskNote: "",
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

  const handleOpenDialog = (plan?: TradingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      // setFormData({
      //   ticker: plan.ticker,
      //   setupId: plan.setupId,
      //   entryPrice: plan.entryPrice,
      //   entryDate: plan.entryDate.split("T")[0],
      //   entryReason: plan.entryReason,
      //   riskNote: plan.riskNote,
      //   confidenceScore: plan.confidenceScore,
      //   emotionState: plan.emotionState,
      //   script: plan.script,
      //   status: plan.status,
      // });
    } else {
      setEditingPlan(null);
      const selectedSetup = setups.find(
        (s: any) => s.id === (setups[0]?.id || "")
      );
      setFormData({
        ticker: "",
        setupId: setups[0]?.id || "",
        entryPrice: 0,
        entryDate: new Date().toISOString().split("T")[0],
        entryReason: "",
        riskNote: "",
        confidenceScore: 5,
        emotionState: "Calm and focused",
        script: selectedSetup?.script || "",
        status: "Planned",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSetupChange = (setupId: string) => {
    const setup = setups.find((s) => s.id === setupId);
    setFormData({
      ...formData,
      setupId,
      script: setup?.script || "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const setup = setups.find((s) => s.id === formData.setupId);
    if (!setup) return;

    const planData = {
      ...formData,
      setupName: setup.name,
      entryDate: new Date(formData.entryDate).toISOString(),
    };

    if (editingPlan) {
      //   updatePlan(editingPlan.id, planData);
    } else {
      //   addPlan(planData);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      //   deletePlan(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-700 border-green-200";
      case "ARCHIVE":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "ACTIVE":
        return "bg-blue-100 text-blue-700 border-blue-200";
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
    },
    {
      accessorKey: "setup",
      header: "Setup Name",
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
              <Button onClick={() => handleOpenDialog()}>
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
                      {/* <Input
                        id="ticker"
                        value={formData.ticker}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ticker: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder="e.g., AAPL"
                        required
                      /> */}
                      <ComboboxBasic />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setup">Setup *</Label>
                      <ComboboxBasic />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entryPrice">Entry Price *</Label>
                      <Input
                        id="entryPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.entryPrice || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            entryPrice: parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entryDate">Entry Date *</Label>
                      <Input
                        id="entryDate"
                        type="date"
                        value={formData.entryDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            entryDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entryReason">Entry Reason *</Label>
                    <Textarea
                      id="entryReason"
                      value={formData.entryReason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entryReason: e.target.value,
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
                          // status: value as TradePlan["status"],
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
                    <Label htmlFor="riskNote">Risk Note</Label>
                    <Textarea
                      id="riskNote"
                      value={formData.riskNote}
                      onChange={(e) =>
                        setFormData({ ...formData, riskNote: e.target.value })
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

                {/* Script Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                      Script (Editable Checklist)
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
                  <Button type="submit">
                    {editingPlan ? "Update Plan" : "Save Plan"}
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
    </div>
  );
}
