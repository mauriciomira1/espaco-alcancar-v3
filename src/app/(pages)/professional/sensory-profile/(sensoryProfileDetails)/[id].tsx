"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import config from "@/app/config/variables";

export default function SensoryProfileDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] =
    useState<SensoryProfileResponseInterface | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `${config.apiBaseUrl}/dashboard/sp/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "professional-espaco-alcancar"
                )}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const profileData = await response.json();
            setProfile(profileData);
          } else {
            setError("Failed to fetch profile data: " + response.statusText);
          }
        } catch (error) {
          setError("Failed to fetch profile data: " + (error as Error).message);
        }
      };

      fetchProfile();
    }
  }, [id]);

  useEffect(() => {
    if (profile) {
      const fetchQuestions = async () => {
        try {
          const response = await fetch(
            `${config.apiBaseUrl}/dashboard/sp/get-questions`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "professional-espaco-alcancar"
                )}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ sensoryProfileType: profile.profileType }),
            }
          );

          if (response.ok) {
            const questionsData = await response.json();
            setQuestions(questionsData);
          } else {
            setError("Failed to fetch questions: " + response.statusText);
          }
        } catch (error) {
          setError("Failed to fetch questions: " + (error as Error).message);
        }
      };

      fetchQuestions();
    }
  }, [profile]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Perfil Sensorial de {profile.childName}</h1>
      <p>ID: {profile.id}</p>
      <p>Tipo de Perfil: {profile.profileType}</p>
      <p>Status: {profile.status}</p>
      <p>
        Criado em: {new Date(profile.createdAt).toLocaleDateString("pt-BR")}
      </p>
      <p>
        Atualizado em: {new Date(profile.updatedAt).toLocaleDateString("pt-BR")}
      </p>
      <p>Resultados do Perfil Sensorial: {profile.resultsOfSensoryProfile}</p>
      <h2>Perguntas do Perfil Sensorial</h2>
      {questions.map((question, index) => (
        <p key={index}>{question}</p>
      ))}
    </div>
  );
}
