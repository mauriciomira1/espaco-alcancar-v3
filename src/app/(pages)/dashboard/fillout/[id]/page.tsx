"use client";
import config from "@/app/config/variables";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const FilloutPage = ({ params }: { params: { id: string } }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [resultsOfSensoryProfile, setResultsOfSensoryProfile] =
    useState<string>(new Array(questions.length).fill("6").join(""));
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

  const handleAnswerChange = (index: number, answer: number) => {
    const resultsArray = resultsOfSensoryProfile.split("");
    resultsArray[index] = answer.toString();
    setResultsOfSensoryProfile(resultsArray.join(""));
  };

  useEffect(() => {
    fetchSensoryProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (sensoryProfile) {
      fetchQuestionsOfSensoryProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensoryProfile]);

  useEffect(() => {
    console.log(resultsOfSensoryProfile);
  }, [resultsOfSensoryProfile]);

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
    <div>
      <h1>Respondendo um Perfil Sensorial</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <div>
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={num}
                  onChange={() => handleAnswerChange(index, num)}
                />
                {num}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilloutPage;
