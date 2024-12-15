/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import config from "@/app/config/variables";

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
      const data = await response.json();
      setSensoryProfile(data);
      setResultsOfSensoryProfile(data?.resultsOfSensoryProfile);
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

  if (!resultsOfSensoryProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Paciente: {sensoryProfile?.childName}</h1>

      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}
