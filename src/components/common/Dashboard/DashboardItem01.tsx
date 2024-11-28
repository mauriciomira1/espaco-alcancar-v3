import React from "react";
import { Link } from "react-router-dom";

interface DashboardItem01Props {
  urlTo: string;
  icon: React.ReactNode;
  text: string;
}

const DashboardItem01: React.FC<DashboardItem01Props> = ({
  urlTo,
  icon,
  text,
}) => {
  return (
    <Link
      to={urlTo}
      className="text-white items-center justify-center flex flex-col p-4 rounded bg-verde-escuro active:bg-verde-claro cursor-pointer duration-150"
    >
      {icon}
      <p className="text-xs mt-1.5">{text}</p>
    </Link>
  );
};

export default DashboardItem01;
