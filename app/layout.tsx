import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "../components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Toaster } from "sonner";
import { Providers } from "./providers/Providers";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task manager",
  description: "Developed by Rakibul Hasan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Toaster richColors position="top-center" />
        <TooltipProvider>
          <main className="min-h-full flex flex-col w-full">
            <div className="flex-1">
              <Providers>{children}</Providers>
            </div>
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
