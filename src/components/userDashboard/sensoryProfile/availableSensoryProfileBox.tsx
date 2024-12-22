"use client";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface AvailableSensoryProfileBoxProps {
  sensoryProfileId: string;
  unfilled?: boolean;
  started?: boolean;
  filled?: boolean;
}

const AvailableSensoryProfileBox: React.FC<AvailableSensoryProfileBoxProps> = ({
  sensoryProfileId,
  unfilled,
  started,
  filled,
}) => {
  const toast = useToast();

  const activeToast = () => {
    toast.toast({
      title: "Perfil Sensorial",
      description: "Perfil Sensorial preenchido com sucesso!",
      style: {
        backgroundColor: unfilled ? "#16a34a" : "#f0aa28",
        color: "white",
      },
      duration: 2000,
    });
  };

  return (
    <div
      className={`activity-item border rounded drop-shadow-sm bg-white ${
        filled ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <h1
        className={`${
          filled
            ? "bg-gray-500"
            : unfilled
            ? "bg-[#16a34a]"
            : started
            ? "bg-[#f0aa28]"
            : "bg-[#16a34a]"
        } rounded-t text-white font-subtitulos text-base py-2 pl-2`}
      >
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
        {filled ? (
          <p className="font-subtitulos text-sm text-gray-500 my-4">
            Perfil já enviado
          </p>
        ) : (
          <Link
            href={`/dashboard/fillout/${sensoryProfileId}`}
            className="duration-100 font-subtitulos text-sm text-green-600 bg-white hover:bg-green-600 hover:text-white border-green-600 border px-3 py-2 my-4 rounded-md"
          >
            Preencher agora
          </Link>
        )}
      </div>
    </div>
  );
};

export default AvailableSensoryProfileBox;
