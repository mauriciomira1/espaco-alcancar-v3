"use client";
import RoutesComponent from "@/routes/routes";

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
