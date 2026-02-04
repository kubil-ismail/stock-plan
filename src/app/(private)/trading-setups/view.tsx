"use client";
import React, { useState } from "react";
import { Plus, Edit2, Trash2, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { TradingPagination } from "@/components/Pagination";
import dynamic from "next/dynamic";
import { ApiResponse, TradingSetup } from "@/types/index";
import { SpinnerBox } from "@/components/Loading";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { TradingSearch } from "@/components/Search";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
});

export default function View({
  loading,
  list,
}: {
  loading?: boolean;
  list: ApiResponse<TradingSetup[]>;
}) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [errorUnique, setErrorUnique] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetup, setEditingSetup] = useState<TradingSetup | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    timeframe: "DAILY" as TradingSetup["timeframe"],
    script: "",
  });

  const handleOpenDialog = (setup?: TradingSetup) => {
    setIsDialogOpen(true);

    handleClearForm();
  };

  const handleClearForm = () => {
    setError("");
    setErrorUnique("");
    setIsSubmit(false);
    setFormData({
      name: "",
      description: "",
      timeframe: "DAILY" as TradingSetup["timeframe"],
      script: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmit(true);
      const request = await fetch("/api/trading/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (request.status !== 200) {
        const { message } = await request?.json();

        if (
          ["Setup name already exist", "setup_slug must be unique"].includes(
            message
          )
        ) {
          setErrorUnique("Setup name already exist");
        } else {
          setError(message);
        }

        throw Error(message);
      }

      router.refresh();

      setIsDialogOpen(false);
    } catch {
    } finally {
      setIsSubmit(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this setup?")) {
      await fetch(`/api/trading/setup/${id}`, {
        method: "DELETE",
      });

      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-foreground mb-2">Trading Setups</h1>
          <p className="text-muted-foreground">
            Manage your reusable trading strategies
          </p>
        </div>

        <div className="flex gap-[10px]">
          <TradingSearch total={list?.options?.total ?? 0} />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Setup
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSetup ? "Edit Setup" : "Add New Setup"}
                </DialogTitle>
                <DialogDescription>
                  Define a reusable trading strategy with rules and checklist
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Setup Name<span className="text-[red]">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setErrorUnique("");
                      }}
                      placeholder="e.g., Breakout Strategy"
                      className={cn(errorUnique ? "border-[red]" : "")}
                      required
                    />

                    {errorUnique && (
                      <div className="text-sm text-destructive">
                        {errorUnique}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeframe">
                      Timeframe <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      value={formData.timeframe}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          timeframe: value as TradingSetup["timeframe"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DAILY">Daily</SelectItem>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="QUARTERLY">Quartterly</SelectItem>
                        <SelectItem value="YEARLY">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of the setup"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Script (Trading Rules & Checklist)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Document your entry rules, exit strategy, and risk
                    management checklist
                  </p>
                  <RichTextEditor
                    value={formData.script}
                    onChange={(value) =>
                      setFormData({ ...formData, script: value })
                    }
                    placeholder="Define your trading rules, entry criteria, exit strategy..."
                  />
                </div>

                {error && (
                  <div className="text-sm text-destructive">{error}</div>
                )}

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
                    {editingSetup
                      ? "Update Setup"
                      : isSubmit
                      ? "Create Setup..."
                      : "Create Setup"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Setups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading ? (
          <Card className="col-span-full border-none shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <SpinnerBox />
            </CardContent>
          </Card>
        ) : list?.data?.length === 0 || !list?.data ? (
          <Card className="col-span-full border-none shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                No trading setups yet
              </p>
            </CardContent>
          </Card>
        ) : (
          list?.data?.map((setup) => (
            <Card
              key={setup?.id}
              className="border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2 text-foreground">
                      {setup?.name ?? "No name"}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{setup?.timeframe}</span>
                    </div>
                  </div>
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
                      onClick={() => handleDelete(setup.id)}
                      className="hover:bg-muted"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {setup?.description ?? "No description"}
                </CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <TradingPagination
        show={!loading && list?.data?.length > 0}
        page={list.options?.page ?? 1}
        limit={list.options?.limit ?? 0}
        total={list.options?.total ?? 0}
      />
    </div>
  );
}
