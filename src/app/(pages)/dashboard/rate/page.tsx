"use client";
import config from "@/app/config/variables";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Rate: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(300);

  useEffect(() => {
    setCharCount(300 - review.length);
  }, [review]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/dashboard/rate/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("espaco-alcancar")}`,
        },
        body: JSON.stringify({
          stars: rating,
          comment: review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="w-full flex flex-col h-screen bg-white pt-12 items-center p-5">
      <Link to="/dashboard" className="flex items-center text-verde-escuro p-4">
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <div className="bg-gray-200 p-6 mb-10 rounded-lg justify-center items-center shadow-md w-full max-w-md">
        {submitted ? (
          <div className="text-center flex flex-col items-center justify-center">
            <FaCheck className="text-6xl text-green-500 mb-4" />
            <h1 className="text-2xl font-destaque mb-4">
              A sua avaliação foi enviada.
            </h1>
            <p className="text-sm font-paragrafos">
              Volte e altere a qualquer momento. Muito obrigado pelo seu
              feedback. :)
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
