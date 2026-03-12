import React from "react";
import { cn } from "../lib/utils";
import { RefreshCcw } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  loading,
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-[10px] flex gap-[5px] items-center justify-center font-medium transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
    outline: "border border-border bg-transparent hover:bg-accent",
    ghost: "hover:bg-accent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[12px]",
    md: "px-4 py-2 text-[14px]",
    lg: "px-6 py-3 text-[16px]",
  };

  const sizeText = {
    sm: "13px",
    md: "16px",
    lg: "20px",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && <RefreshCcw className="animate-spin" size={sizeText[size]} />}
      {children}
    </button>
  );
}
