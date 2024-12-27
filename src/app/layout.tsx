import "./globals.css";
import type { Metadata } from "next";
import { inter, quicksand, raleway } from "./fonts";
import ClientLayout from "./clientLayout";
import { Toaster } from "@/components/ui/toaster";
import { TokenProvider } from "@/contexts/TokenContext";

export const metadata: Metadata = {
  title: "Espaço Alcançar",
  description: "Clínica Multiprofissional Infantil No Gama/DF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${raleway.variable} ${quicksand.variable} relative bg-main min-h-screen vsc-initialized`}
      >
        <TokenProvider>
          <ClientLayout>{children}</ClientLayout>
        </TokenProvider>
        <Toaster />
      </body>
    </html>
  );
}
