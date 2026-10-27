"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { submitWaitlist, type WaitlistResult } from "@/lib/waitlist";

type Status = "idle" | "loading" | "success" | "error";

type WaitlistFormProps = {
  className?: string;
  submit?: (email: string) => Promise<WaitlistResult>;
};

export function WaitlistForm({
  className,
  submit = submitWaitlist,
}: WaitlistFormProps) {
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");
    const result = await submit(email);

    if (result.ok) {
      setStatus("success");
      setEmail("");
      return;
    }
    setStatus("error");
    setMessage(result.message);
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "rounded-md border bg-card px-4 py-3 text-sm font-medium",
          className,
        )}
      >
        Terima kasih, kamu sudah masuk daftar tunggu. Kami akan mengabari
        lewat email.
      </p>
    );
  }

  const hasError = status === "error";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-2", className)}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email
        </label>
        <Input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email kamu"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? (
            "Mengirim..."
          ) : (
            <>
              Daftar tunggu
              <ArrowRightIcon aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
      {hasError ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {message}
        </p>
      ) : null}
    </form>
  );
}
