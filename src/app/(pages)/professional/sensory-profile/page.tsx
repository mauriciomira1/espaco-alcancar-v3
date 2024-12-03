"use client";
import config from "@/app/config/variables";
import DashboardItem01 from "@/components/common/Dashboard/DashboardItem01";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RiFilePaper2Line } from "react-icons/ri";

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

const SensoryProfilePage = () => {
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
          navigate("/login-professional");
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
    localStorage.removeItem("espaco-alcancar");
    navigate(0);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex w-full flex-col items-center bg-white h-screen">
      <h1 className="font-destaque-gg text-destaque-g pt-8 pb-2 text-verde-escuro">
        Área do profissional
      </h1>
      <p className="font-titulos text-verde-claro pb-14">
        Bem vindo(a) {firstName}
      </p>
      <Link
        to="/professional/dashboard"
        className="flex items-center justify-center bg-verde-escuro text-white mb-8 w-20 rounded-md p-1"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <div className="text-verde-escuro items-center justify-center flex flex-col p-3 rounded border-verde-escuro border cursor-pointer duration-150">
        <h2 className="text-sm font-titulos">Meus perfis sensoriais</h2>
        {/* <Link to={}>{}</Link> */}
      </div>

      <Outlet />
    </div>
  );
};

export default SensoryProfilePage;
