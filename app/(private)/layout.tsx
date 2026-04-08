"use client";

import { AppSidebar } from "../../components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import ProtectedRoute from "../Components/Login/ProtectedRoute";
import { Providers } from "../providers/Providers";



export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-full flex flex-col w-full">
        <SidebarTrigger />
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
      </main>
    </SidebarProvider>
  </ProtectedRoute>;
}