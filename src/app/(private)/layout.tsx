"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Target,
  FileText,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetProfileQuery } from "@/services/auth";
import { Skeleton } from "@/components/ui/skeleton";

interface MainLayoutProps {
  children: React.ReactNode;
}

function UserMenu() {
  const { data, isLoading } = useGetProfileQuery(undefined, {
    skip: typeof window === "undefined",
  });

  return (
    <div className="flex items-center gap-4">
      <div className="text-right hidden sm:block">
        {isLoading || !data ? (
          <div className="flex flex-col items-end">
            <Skeleton className="h-3 mb-1 w-[60px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        ) : (
          <>
            <p className="text-sm text-foreground">{data?.fullname}</p>
            <p className="text-xs text-muted-foreground">{data?.email}</p>
          </>
        )}
      </div>
      <Link href="/auth/logout" passHref>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </Link>
    </div>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    {
      id: "dashboard" as const,
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "setups" as const,
      href: "/trading-setups",
      label: "Trading Setups",
      icon: Target,
    },
    {
      id: "plans" as const,
      href: "/trading-plans",
      label: "Trade Plans",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" passHref>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl text-foreground">StockPlan</span>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.id} href={item.href} passHref>
                      <button
                        onClick={() => {}}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer hover:bg-muted ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-card border-b border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = false;
            return (
              <button
                key={item.id}
                onClick={() => {}}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
