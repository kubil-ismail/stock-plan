"use client";
import React, { useState } from "react";
import { Edit2, Trash2, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TradingPagination } from "@/components/Pagination";
import { ApiResponse, TradingSetup } from "@/types/index";
import { SpinnerBox } from "@/components/Loading";
import { useRouter } from "next/navigation";
import { TradingSearch } from "@/components/Search";
import Setup_Form from "./_form/_Setup.form";

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

    if (setup?.name) {
      setEditingSetup(setup);

      setFormData({
        name: setup.name,
        description: setup.description,
        timeframe: setup.timeframe,
        script: setup.script,
      });
    }
  };

  const handleClearForm = () => {
    setError("");
    setErrorUnique("");
    setIsSubmit(false);
    setEditingSetup(null);
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

      if (editingSetup) {
        const request = await fetch(`/api/trading/setup/${editingSetup.id}`, {
          method: "PATCH",
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
      } else {
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

        <div className="flex items-center gap-[10px]">
          <TradingSearch total={list?.options?.total ?? 0} />
          <Setup_Form
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleOpenDialog={handleOpenDialog}
            editingSetup={editingSetup}
            handleSubmit={handleSubmit}
            isSubmit={isSubmit}
            error={error}
            formData={formData}
            errorUnique={errorUnique}
            setFormData={setFormData}
            setErrorUnique={setErrorUnique}
          />
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
                      onClick={() => handleOpenDialog(setup)}
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
