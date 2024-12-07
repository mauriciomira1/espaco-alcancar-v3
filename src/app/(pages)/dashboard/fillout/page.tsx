"use client";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const Fillout = () => {
  return (
    <div className="flex flex-col px-4 bg-white h-screen">
      <Link
        href="/dashboard"
        className="flex items-center justify-center bg-verde-escuro text-white mt-3 mb-8 w-20 rounded-md p-1"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="font-destaque items-center text-destaque pt-8 pb-4 text-verde-escuro">
          Preenchimento de dados
        </h1>
        <div className="activity-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="activity-item p-4 border rounded shadow">
            <h2 className="font-titulos text-verde-claro">Perfil Sensorial</h2>
            <p>Descrição da atividade de Perfil Sensorial.</p>
          </div>
          <div className="activity-item p-4 border rounded shadow">
            <h2 className="font-titulos text-verde-claro">Perfil Escolar</h2>
            <p>Descrição da atividade de Perfil Escolar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fillout;
