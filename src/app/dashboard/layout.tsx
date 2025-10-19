import type { Metadata } from "next";
import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Formulario de login - Degusta",
  description: "Login page for Degusta application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased`}
      >
        <div className=" bg-gray-50">
          <SidebarProvider className="flex gap-1">
            <AppSidebar />
            <div className="flex-1">{children}</div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
