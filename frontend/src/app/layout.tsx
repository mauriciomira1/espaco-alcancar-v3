import "./globals.css";
import type { Metadata } from "next";
import { inter, quicksand, raleway } from "./fonts";
import ClientLayout from "./clientLayout";

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
        className={`${inter.variable} ${raleway.variable} ${quicksand.variable} relative bg-main`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
