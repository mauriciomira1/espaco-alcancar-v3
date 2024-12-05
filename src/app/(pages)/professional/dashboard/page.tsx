"use client";
import config from "@/app/config/variables";
import DashboardItem01 from "@/components/common/Dashboard/DashboardItem01";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardProfessionalMenu from "./DashboardProfessionalMenu";

// Interface para a resposta

interface ProfileType {
  patient: boolean;
  professional: boolean;
  admin: boolean;
}

interface ProfessionalDashboardResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  active: boolean;
  birth: string;
  registerNumber: string;
  occupation: string;
  profileType: ProfileType;
}

const ProfessionalDashboardPage = () => {
  const [user, setUser] = useState<ProfessionalDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("professional-espaco-alcancar");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Token not found");
        setError("Token not found");
        navigate("/login-professional");
        return;
      }

      try {
        const response = await fetch(`${config.apiBaseUrl}/professional/me`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          navigate("/login");
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

        const data: ProfessionalDashboardResponse = await response.json();
        setUser(data);

        // Verificando se o usuário possi a role "PROFESSIONAL" para poder acessar essa página
        if (!data.profileType.professional) {
          navigate("/login");
        }
      } catch (error) {
        setError("Failed to fetch user data: " + (error as Error).message);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("professional-espaco-alcancar");
    navigate(0);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white h-screen p-2">
      <h1 className="font-destaque-gg text-destaque-g pt-8 pb-2 text-verde-escuro">
        Área do profissional
      </h1>
      <p className="font-titulos text-verde-claro">
        Bem vindo(a) {user.name.split(" ")[0]}
      </p>
      <div className="flex justify-center items-center pb-14">
        {user.occupation && (
          <p className="text-xs font-citacao italic text-gray-500">
            {user.occupation}
          </p>
        )}
        {user.registerNumber && (
          <p className="text-xs font-citacao italic text-gray-500">
            &nbsp;- {user.registerNumber}
          </p>
        )}
      </div>
      <Outlet />
      <DashboardProfessionalMenu handleLogout={handleLogout} />
    </div>
  );
};

export default ProfessionalDashboardPage;
