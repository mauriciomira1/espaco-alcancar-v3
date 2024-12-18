"use client";
import config from "@/app/config/variables";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import React, { useEffect } from "react";

interface AvailableSensoryProfileBoxProps {
  sensoryProfileId: string;
  unfilled?: boolean;
  started?: boolean;
}

const AvailableSensoryProfileBox: React.FC<AvailableSensoryProfileBoxProps> = ({
  sensoryProfileId,
  unfilled,
  started,
}) => {
  const toast = useToast();

  const activeToast = () => {
    toast.toast({
      title: "Perfil Sensorial",
      description: "Perfil Sensorial preenchido com sucesso!",
      style: {
        backgroundColor: unfilled ? "#16a34a" : started ? "#f97316" : "#16a34a",
        color: "white",
      },
      duration: 2000,
    });
  };

  return (
    <div className="activity-item border rounded drop-shadow-sm bg-white">
      <h1 className="bg-green-600 rounded-t text-white font-subtitulos text-base py-2 pl-2">
        Perfil Sensorial disponível
      </h1>
      <div className="pl-2 py-2 font-paragrafos text-sm text-gray-900">
        <p>
          Disponibilizado por <strong>Cissy Tinazi</strong>
        </p>
        <p>
          Nome do paciente: <strong>Ana Liz</strong>
        </p>
      </div>
      <div className="w-full flex justify-center pb-2">
        <Link
          href={`/dashboard/fillout/${sensoryProfileId}`}
          className="duration-100 font-subtitulos text-sm text-green-600 bg-white hover:bg-green-600 hover:text-white border-green-600 border px-3 py-2 my-4 rounded-md"
        >
          Preencher agora
        </Link>
      </div>
    </div>
  );
};

export default AvailableSensoryProfileBox;
