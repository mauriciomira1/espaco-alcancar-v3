"use client";
import config from "@/app/config/variables";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

// Componentes do ShadcnUI
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const FilloutPage = ({ params }: { params: { id: string } }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [allAnswered, setAllAnswered] = useState<boolean>(false);
  const [resultsOfSensoryProfile, setResultsOfSensoryProfile] =
    useState<string>(new Array(questions.length).fill("0").join(""));
  const [sensoryProfile, setSensoryProfile] =
    useState<SensoryProfileResponseInterface | null>(null);

  const toast = useToast();

  // Buscar perfil sensorial e salvar em sensoryProfile
  const fetchSensoryProfile = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/dashboard/sp/find-sp/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("espaco-alcancar")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        window.location.href = "/login";
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
            Authorization: `Bearer ${localStorage.getItem("espaco-alcancar")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching sensory profile questions:", error);
    }
  };

  const fetchToSendAnswers = async (
    sensoryProfileId: string,
    answers: string
  ) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/dashboard/sp/fillout`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("espaco-alcancar")}`,
          },
          body: JSON.stringify({
            sensoryProfileId,
            answers,
          }),
        }
      );

      if (!response.ok) {
        toast.toast({
          title: "Ah não!",
          description:
            "Não consegui enviar as suas respostas. Tente mais tarde.",
          datatype: "error",
          duration: 3000,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
        datatype: "success",
      });

      return response;
    } catch (error) {
      console.error("Error sending sensory profile answers:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSensoryProfile();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resultsOfSensoryProfile) {
      fetchQuestionsOfSensoryProfile();
      setAnswers(new Array(questions.length).fill(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsOfSensoryProfile]);

  const handleAnswerChange = (index: number, answer: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);

    setAllAnswered(true);

    /*     if (newAnswers.every((answer) => answer !== undefined)) {
      setAllAnswered(true);
    } else {
      setAllAnswered(false);
    }
    console.log(newAnswers); */
  };

  const handleSubmit = () => {
    const copiedAnswers = [...answers];
    const sanitizedAnswers = copiedAnswers.map((answer) =>
      answer === undefined ? 0 : answer
    );
    const results = sanitizedAnswers.join("");

    // Enviar respostas
    fetchToSendAnswers(sensoryProfile!.id, results);
  };

  if (questions.length === 0) {
    return (
      <div className="h-screen w-screen bg-gradient-to-b from-[#2D1C40] to-[#39719A] flex items-center justify-center">
        <div className="animate-spin-fast text-6xl text-pessego">
          <AiOutlineLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1C40] to-[#39719A] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mt-3 text-white mb-6">Questionário</h1>
      <div className="bg-white p-6 font-titulos text-verde-escuro rounded-lg shadow-lg w-full max-w-2xl my-2">
        <h2>Paciente: {sensoryProfile?.childName}</h2>
        <h2></h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm font-semibold mb-2">{question}</p>
            <div className="flex space-x-4 mb-10">
              <table className="w-full table-fixed border border-gray-300">
                <thead>
                  <tr className="text-[.65rem] border-b border-gray-300">
                    <th className="w-1/6 border-r border-gray-300 break-words">
                      Quase Sempre
                    </th>
                    <th className="w-1/6 border-r border-gray-300 break-words">
                      Frequentemente
                    </th>
                    <th className="w-1/6 border-r border-gray-300 break-words">
                      Metade do Tempo
                    </th>
                    <th className="w-1/6 border-r border-gray-300 break-words">
                      Ocasionalmente
                    </th>
                    <th className="w-1/6 border-r border-gray-300 break-words">
                      Quase Nunca
                    </th>
                    <th className="w-1/6 break-words">Não se Aplica</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    {[5, 4, 3, 2, 1, 0].map((num) => (
                      <td
                        key={num}
                        className="text-center  py-2 border-r border-gray-300 last:border-r-0"
                      >
                        <label className="flex items-center justify-center space-x-2">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={num}
                            checked={answers[index] === num}
                            onChange={() => handleAnswerChange(index, num)}
                            className="form-radio text-indigo-600"
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {!allAnswered && (
          <div className="flex flex-col items-center my-2">
            <p className="text-sm font-subtitulos text-gray-600">
              Responda todas as perguntas para poder enviar o questionário.
            </p>
            <p className="text-xs font-subtitulos font-bold text-red-700">
              Faltam responder as perguntas:{" "}
              {questions
                .map((_, index) =>
                  answers[index] === undefined ? index + 1 : null
                )
                .filter((index) => index !== null)
                .join(", ")}
            </p>
          </div>
        )}
        <AlertDialog>
          <AlertDialogTrigger
            disabled={!allAnswered}
            className={`mt-6 w-full py-2 px-4 rounded-lg text-white font-semibold ${
              allAnswered
                ? "bg-verde-claro hover:bg-verde-escuro"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Enviar respostas
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja enviar as respostas?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essas respostas serão disponibilizadas para a Terapeuta que
                disponibilizou o questionário.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-verde-escuro"
                onClick={handleSubmit}
              >
                Enviar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default FilloutPage;
