import type { Metadata } from "next";
import "../../globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Degusta - Dashboard",
  description: "Admin dashboard for Degusta application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-gray-50">
      <SidebarProvider className="flex gap-1">
        <AppSidebar />
        <div className="flex-1">{children}</div>
      </SidebarProvider>
    </div>
  );
}
