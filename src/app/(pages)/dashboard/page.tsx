"use client";
import config from "@/app/config/variables";
import { useEffect, useState } from "react";
import DashboardMenu from "./DashboardMenu";
import { useRouter } from "next/navigation";

// Interfaces para tipar a resposta
interface Address {
  address: string;
  city: string;
  complement: string;
}

interface ProfileType {
  patient: boolean;
  professional: boolean;
  admin: boolean;
}

interface UserDashboardResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  children: any[]; // Definir uma interface específica para os filhos, se necessário
  gender: "MALE" | "FEMALE";
  address: Address;
  profileType: ProfileType;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("espaco-alcancar");

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Token not found");
        setError("Token not found");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`${config.apiBaseUrl}/user/me`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          router.push("/login");
          console.error("Token inválido");
          setError("Token inválido");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          setError("Failed to fetch user data: " + errorData.message);
          return;
        }

        const data: UserDashboardResponse = await response.json();
        setUser(data);

        // Verificando se o usuário possui a role "PATIENT" para poder acessar essa página
        if (!data.profileType.patient) {
          router.push("/professional/dashboard");
        }
      } catch (error) {
        setError("Failed to fetch user data: " + (error as Error).message);
      }
    };

    fetchUserData();
  }, [token, router]);

  const handleLogout = () => {
    localStorage.removeItem("espaco-alcancar");
    router.push("/login");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex flex-col items-center bg-white h-screen">
      <h1 className="font-destaque-gg text-destaque-gg pt-8 pb-2 text-verde-escuro">
        Área do paciente
      </h1>
      <p className="font-titulos text-verde-claro pb-14">
        Bem vindo(a) {firstName}
      </p>
      <DashboardMenu handleLogout={handleLogout} />
    </div>
  );
};

export default Dashboard;
