import type { Metadata } from "next";
import "../../globals.css";

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
    <div className=" bg-gray-50">
      <div className="flex-1">{children}</div>
    </div>
  );
}
