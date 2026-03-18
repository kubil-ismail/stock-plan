"use client";
import { Toaster } from "sonner";
import { NotificationProvider } from "@/contexts/notification-context";
import { AuthProvider } from "@/contexts/auth-context";
import { DetailNavbarProvider } from "@/contexts/detail-navbar-context";

import "@/styles/index.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <AuthProvider>
          <NotificationProvider>
            <DetailNavbarProvider>
              {children}
              <Toaster position="top-center" />
            </DetailNavbarProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
