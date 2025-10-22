import type { Metadata } from "next";
import "../../globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Analise de vendas",
  description: "Painel de analise de vendas",
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
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
