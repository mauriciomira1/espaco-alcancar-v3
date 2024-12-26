"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Material {
  id: number;
  title: string;
  url: string;
}

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);

  /*   useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []); */

  /*   if (!materials) {
    return <div>Loading...</div>;
  } */

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white pt-10">
      <Link
        href="/dashboard"
        className="flex items-center text-verde-escuro p-4"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <h1 className="font-destaque-gg text-destaque-gg pt-8 pb-2 text-verde-escuro">
        Meus materiais
      </h1>
      <ul>
        {materials.length ? (
          materials.map((material) => (
            <li key={material.id}>
              <a href={material.url} download>
                {material.title}
              </a>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center py-10 px-3 text-pessego">
            <h2 className="font-titulos text-5xl pb-3 text-center">Poxa!</h2>
            <p className="font-subtitulos text-subtitulos text-center">
              Ainda não temos materiais disponíveis para download.
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Materials;
