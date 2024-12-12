"use client";
import RoutesComponent from "@/routes/routes";
import React, { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <RoutesComponent />
      {children}
    </div>
  );
}