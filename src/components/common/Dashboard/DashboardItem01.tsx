import Link from "next/link";
import React from "react";

interface DashboardItem01Props {
  urlTo: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const DashboardItem01: React.FC<DashboardItem01Props> = ({
  urlTo,
  icon,
  title,
  description,
}) => {
  return (
    <Link
      href={urlTo}
      className="text-verde-escuro items-center text-center justify-center flex flex-col p-4 rounded border-verde-escuro border hover:bg-verde-escuro hover:text-white cursor-pointer duration-150"
    >
      {icon}
      <h1 className="text-sm font-titulos mt-2">{title}</h1>
      {description && (
        <p className="text-[0.65rem] text-gray-500 italic text-center">
          {description}
        </p>
      )}
    </Link>
  );
};

export default DashboardItem01;
