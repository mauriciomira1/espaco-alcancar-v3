import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const BackToDashboardButton: React.FC = () => {
  return (
    <Link
      href="/dashboard"
      className="flex items-center justify-center bg-verde-escuro text-white mt-3 mb-8 w-20 rounded-md p-1"
    >
      <FaArrowLeft className="mr-1" />
      Voltar
    </Link>
  );
};

export default BackToDashboardButton;
