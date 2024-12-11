"use client";
import Link from "next/link";
import React from "react";

const LinksAlternaPacienteProfissionalLogin: React.FC = () => {
  return (
    <div className="flex text-sm w-11/12 max-w-7xl md:w-[26rem] max-sm:w-11/12 items-center gap-2 mb-2">
      <Link
        href="/login"
        className="border-white flex items-center justify-center w-full px-2 bg-gray-100 py-1.5 rounded-lg border font-bold text-secondaryColor font-titulos text-verde-claro hover:text-verde-escuro hover:border-verde-escuro"
      >
        Login de paciente
      </Link>
      <Link
        href="/login-professional"
        className="border-verde-claro flex items-center justify-center w-full px-2 bg-verde-claro py-1.5 rounded-lg border font-bold text-secondaryColor font-titulos text-white hover:text-verde-escuro hover:border-verde-escuro"
      >
        Login profissional
      </Link>
    </div>
  );
};

export default LinksAlternaPacienteProfissionalLogin;
