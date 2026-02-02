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
import type { TradingSetup } from "@/types";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSetup, setEditingSetup] = useState<TradingSetup | null>(null);

  const setups: any = [];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    timeframe: "Daily" as TradingSetup["timeframe"],
    script: "",
  });

  const handleOpenDialog = (setup?: TradingSetup) => {
    if (setup) {
      setEditingSetup(setup);
      setFormData({
        name: setup.name,
        description: setup.description,
        timeframe: setup.timeframe,
        script: setup.script,
      });
    } else {
      setEditingSetup(null);
      setFormData({
        name: "",
        description: "",
        timeframe: "Daily",
        script: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSetup) {
      //   updateSetup(editingSetup.id, formData);
    } else {
      //   addSetup(formData);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this setup?")) {
      //   deleteSetup(id);
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
                  <Label htmlFor="name">Setup Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Breakout Strategy"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Timeframe *</Label>
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
                      <SelectItem value="1H">1 Hour</SelectItem>
                      <SelectItem value="4H">4 Hours</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
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
                  onChange={(value) =>
                    setFormData({ ...formData, script: value })
                  }
                  placeholder="Define your trading rules, entry criteria, exit strategy..."
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
                  {editingSetup ? "Update Setup" : "Create Setup"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Setups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {setups.length === 0 ? (
          <Card className="col-span-full border-border shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                No trading setups yet
              </p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Setup
              </Button>
            </CardContent>
          </Card>
        ) : (
          setups.map((setup) => (
            <Card
              key={setup?.id}
              className="border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2 text-foreground">
                      {setup?.name}
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
                      onClick={() => handleOpenDialog(setup)}
                      className="hover:bg-muted"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(setup?.id)}
                      className="hover:bg-muted"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {setup?.description && (
                  <CardDescription className="text-sm">
                    {setup?.description}
                  </CardDescription>
                )}
                <div className="border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Trading Rules:
                  </p>
                  <div
                    className="prose prose-sm max-w-none text-sm text-foreground"
                    dangerouslySetInnerHTML={{
                      __html:
                        setup?.script ||
                        '<p class="text-muted-foreground">No script defined</p>',
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
