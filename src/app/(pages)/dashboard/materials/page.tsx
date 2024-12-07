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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white pt-10">
      <Link
        href="/dashboard"
        className="flex items-center text-verde-escuro p-4"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <h1>Download Materials</h1>
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            <a href={material.url} download>
              {material.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Materials;
