import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Activities = () => {
  return (
    <div className="flex flex-col items-center bg-white h-screen">
      <Link to="/dashboard" className="flex items-center text-verde-escuro p-4">
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <h1 className="font-destaque-gg text-destaque-gg pt-8 pb-2 text-verde-escuro">
        Atividades
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
  );
};

export default Activities;
