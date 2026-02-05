import React from "react";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TradingSetup } from "@/types/index";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
});

interface FormData {
  name: string;
  description: string;
  timeframe: TradingSetup["timeframe"];
  script: string;
}

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleOpenDialog: (setup?: TradingSetup) => void;
  editingSetup: TradingSetup | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmit: boolean;
  error: string;
  formData: FormData;
  errorUnique: string;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setErrorUnique: React.Dispatch<React.SetStateAction<string>>;
}

function Setup_Form(props: Props) {
  const {
    isDialogOpen,
    setIsDialogOpen,
    handleOpenDialog,
    editingSetup,
    handleSubmit,
    isSubmit,
    error,
    formData,
    errorUnique,
    setFormData,
    setErrorUnique,
  } = props;

  return (
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
                <div className="text-sm text-destructive">{errorUnique}</div>
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
              Document your entry rules, exit strategy, and risk management
              checklist
            </p>
            <RichTextEditor
              value={formData.script}
              onChange={(value) => setFormData({ ...formData, script: value })}
              placeholder="Define your trading rules, entry criteria, exit strategy..."
            />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

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
  );
}

export default Setup_Form;
