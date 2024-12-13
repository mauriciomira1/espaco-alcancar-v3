"use client"; // Indica que este código deve ser executado no cliente.
import config from "@/app/config/variables"; // Importa a configuração de variáveis.
import React, { useState, useEffect } from "react"; // Importa React e hooks.
import { FaArrowLeft, FaCheck, FaTimesCircle } from "react-icons/fa"; // Importa ícones.
import Link from "next/link"; // Importa o componente Link do Next.js.

const Rate: React.FC = () => {
  const [rating, setRating] = useState(0); // Estado para a avaliação.
  const [hover, setHover] = useState(0); // Estado para o hover das estrelas.
  const [review, setReview] = useState(""); // Estado para o texto da avaliação.
  const [submitted, setSubmitted] = useState(false); // Estado para verificar se a avaliação foi enviada.
  const [charCount, setCharCount] = useState(300); // Estado para contar os caracteres restantes.
  const [error, setError] = useState(false); // Estado para verificar se houve erro no envio.

  // Atualiza a contagem de caracteres restantes sempre que o texto da avaliação muda.
  useEffect(() => {
    setCharCount(300 - review.length);
  }, [review]);

  // Função para obter o emoji correspondente à avaliação.
  const getEmoji = (rating: number) => {
    switch (rating) {
      case 1:
        return "😢";
      case 2:
        return "😟";
      case 3:
        return "😐";
      case 4:
        return "😊";
      case 5:
        return "😁";
      default:
        return "🙂";
    }
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Faz uma requisição POST para enviar a avaliação.
      const response = await fetch(`${config.apiBaseUrl}/dashboard/rate/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("espaco-alcancar")}`,
        },
        body: JSON.stringify({
          stars: rating, // Envia a avaliação como parte do corpo da requisição.
          comment: review,
        }),
      });

      const data = await response.json();
      if (data) {
        setSubmitted(true);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError(true);
    }
  };

  return (
    <div className="w-full flex flex-col h-screen bg-white pt-12 items-center p-5">
      <Link
        href="/dashboard"
        className="flex items-center text-verde-escuro p-4"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <div className="bg-gray-200 p-6 mb-10 rounded-lg justify-center items-center shadow-md w-full max-w-md">
        {submitted ? (
          <div className="text-center flex flex-col items-center justify-center">
            <FaCheck className="text-6xl text-green-500 mb-4" />
            <h1 className="text-2xl font-destaque mb-4">
              Ebaa! A sua avaliação foi enviada.
            </h1>
            <p className="text-sm font-paragrafos">
              Volte e avalie-nos novamente a qualquer momento. Muito obrigado
              pelo seu feedback. :)
            </p>
          </div>
        ) : error ? (
          <div className="w-full h-screen flex flex-col items-center justify-center bg-white p-4">
            <FaTimesCircle className="text-red-500 text-6xl mb-4" />
            <p className="text-xl">
              Houve uma falha no envio da avaliação. Tente mais tarde por favor.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-destaque text-verde-escuro text-center mb-5 mt-1">
              Para nós, a sua opinião importa!
            </h1>
            <p className="font-paragrafos text-sm mb-8">
              Ajude-nos a melhorar. Deixe a sua opinião, sugestão ou elogio.
              Isso nos ajuda a melhorar o nosso jeito de cuidar de você e do seu
              pequeno astronauta.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <div className="text-6xl mb-4">{getEmoji(hover || rating)}</div>
                <div className="flex flex-row mb-4">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <svg
                        key={index}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(rating)}
                        fill={
                          starValue <= (hover || rating) ? "#FFA500" : "#D3D3D3"
                        }
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        className="cursor-pointer"
                      >
                        <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
                      </svg>
                    );
                  })}
                </div>
                <div className="w-full">
                  <textarea
                    value={review}
                    maxLength={300}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Escreva sua avaliação de até 300 caracteres."
                    className="w-full h-36 p-2 bg-white rounded"
                  />
                  <div className="text-xs mb-3 font-paragrafos">
                    Caracteres restantes: {charCount}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-verde-claro text-white py-2 px-4 rounded hover:bg-verde-escuro transition duration-150"
                >
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Rate;
