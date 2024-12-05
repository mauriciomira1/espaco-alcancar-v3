"use client";
import config from "@/app/config/variables";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChildDefaultResponse } from "@/interfaces/ChildInterfaces";
import { ProfessionalDashboardResponse } from "@/interfaces/ProfessionalInterfaces";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";

interface FrameworksInterface {
  value: string;
  label: string;
}

const SensoryProfilePage = () => {
  const [user, setUser] = useState<ProfessionalDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sensoryProfiles, setSensoryProfiles] = useState<
    SensoryProfileResponseInterface[]
  >([]);
  const [frameworks, setFrameworks] = useState<FrameworksInterface[]>([]);
  const token = localStorage.getItem("professional-espaco-alcancar");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      setError("Token not found");
      navigate("/login-professional");
      return;
    }

    // Buscar todos Perfis Sensoriais criados pelo atual profissional
    const fetchUserData = async () => {
      try {
        const sensoryProfiles = await fetch(
          `${config.apiBaseUrl}/dashboard/sp/list-all-sensory-profiles-created`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        if (sensoryProfiles.ok) {
          const sensoryProfilesData = await sensoryProfiles.json();
          setSensoryProfiles(sensoryProfilesData);
        } else {
          setError(
            "Failed to fetch patients data: " + sensoryProfiles.statusText
          );
        }
      } catch (error) {
        setError("Failed to fetch user data: " + (error as Error).message);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  useEffect(() => {
    setFrameworks(
      sensoryProfiles.map((sp) => ({
        value: `/professional/sensory-profile/${sp.id}`,
        label: sp.childName,
      }))
    );
  }, [sensoryProfiles]);

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
