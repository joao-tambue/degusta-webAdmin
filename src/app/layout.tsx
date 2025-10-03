import type { Metadata } from "next";
import { Geist, Geist_Mono , Inter} from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ 
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${inter.variable} ${inter.className} antialiased`}
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
