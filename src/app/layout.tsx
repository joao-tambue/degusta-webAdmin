import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}