import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { SiteHeader } from "@/components/site-header/SiteHeader";
import { getServerAuthUser } from "@/utils/UserUtils";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuthUser();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
