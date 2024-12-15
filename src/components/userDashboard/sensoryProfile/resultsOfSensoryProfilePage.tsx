"use client";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import React, { useState } from "react";

interface ResultsOfSensoryProfilePageProps {
  results: string[];
}

const ResultsOfSensoryProfilePage: React.FC<
  ResultsOfSensoryProfilePageProps
> = ({ results }) => {
  const [profile, setProfile] =
    useState<SensoryProfileResponseInterface | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Página de PS completo</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsOfSensoryProfilePage;
