"use client";
import { Toaster } from "sonner";
import { NotificationProvider } from "@/contexts/notification-context";
import { AuthProvider } from "@/contexts/auth-context";
import { DetailNavbarProvider } from "@/contexts/detail-navbar-context";

import "@/styles/index.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
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
