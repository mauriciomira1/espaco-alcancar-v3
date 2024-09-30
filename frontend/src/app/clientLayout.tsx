"use client";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "@/routes/routes";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}
