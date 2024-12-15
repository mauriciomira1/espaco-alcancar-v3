/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import config from "@/app/config/variables";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function SensoryProfileDetails({
  params,
}: {
  params: { id: string };
}) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [resultsOfSensoryProfile, setResultsOfSensoryProfile] =
    useState<String>();
  const [sensoryProfile, setSensoryProfile] =
    useState<SensoryProfileResponseInterface | null>(null);

  // Buscar perfil sensorial e salvar em sensoryProfile
  const fetchSensoryProfile = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/dashboard/sp/find-sp/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "professional-espaco-alcancar"
            )}`,
          },
        }
      );
      const data: SensoryProfileResponseInterface = await response.json();
      setSensoryProfile(data);
      // Salvando string de resultados do Perfil
      setResultsOfSensoryProfile(data!.resultsOfSensoryProfile);
    } catch (error) {
      console.error("Error fetching sensory profile:", error);
    }
  };

  const fetchQuestionsOfSensoryProfile = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/dashboard/sp/get-questions?sensoryProfileType=${sensoryProfile?.profileType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "professional-espaco-alcancar"
            )}`,
          },
        }
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching sensory profile questions:", error);
    }
  };

  useEffect(() => {
    fetchSensoryProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (sensoryProfile) {
      fetchQuestionsOfSensoryProfile();
    }
  }, [sensoryProfile]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!questions) {
    return (
      <div className="h-screen w-screen bg-gradient-to-b from-[#2D1C40] to-[#39719A] flex items-center justify-center">
        <div className="animate-spin-fast text-6xl text-pessego">
          <AiOutlineLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center px-2 bg-white h-screen">
      <h1 className="font-destaque-gg text-left pl-4 text-destaque pt-8 pb-2 text-verde-escuro">
        Perfil Sensorial Completo
      </h1>
      <div className="w-full flex mt-4 ml-4">
        <Link
          href="/professional/dashboard"
          className="flex items-center text-sm justify-center bg-verde-escuro text-white w-20 rounded-md p-1"
        >
          <FaArrowLeft className="mr-1" />
          Voltar
        </Link>
      </div>
      <h1 className="text-destaque-p font-destaque-p mt-6 mb-5">
        {sensoryProfile?.childName}
      </h1>
      <table className="min-w-full bg-gray-100 rounded-md">
        <thead>
          <tr className="bg-gray-300">
            <th className="py-2 px-4 border-b-2 border-gray-400">Pergunta</th>
            <th className="py-2 px-4 border-b-2 border-gray-400">Pontuação</th>
            <th className="py-2 px-4 border-b-2 border-gray-400">Legenda</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index} className="even:bg-gray-200">
              <td className="py-2 px-4 border-b border-gray-400 text-sm font-paragrafos">
                {question}
              </td>
              <td className="py-2 px-4 border-b border-gray-400 text-center text-sm font-subtitulos">
                {resultsOfSensoryProfile
                  ? resultsOfSensoryProfile[index]
                  : "N/A"}
              </td>
              <td className="py-2 px-4 border-b border-gray-400 text-center text-sm font-subtitulos">
                {resultsOfSensoryProfile
                  ? {
                      1: "Quase nunca",
                      2: "Ocasionalmente",
                      3: "Metade do tempo",
                      4: "Frequentemente",
                      5: "Quase sempre",
                    }[resultsOfSensoryProfile[index]] || "N/A"
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
