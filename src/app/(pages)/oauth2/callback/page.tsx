"use client";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";

const OAuth2Callback: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          console.error("Token não encontrado");
          router.replace("/login");
          return;
        }

        localStorage.setItem("espaco-alcancar", token);

        // Use replace ao invés de push para evitar histórico indesejado
        await router.replace("/dashboard");
      } catch (error) {
        console.error("Erro no callback:", error);
        router.replace("/login");
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin-fast text-6xl text-pessego">
        <AiOutlineLoading />
      </div>
      <p className="text-xl text-white font-titulos mt-4">Autenticando...</p>
    </div>
  );
};

export default OAuth2Callback;
