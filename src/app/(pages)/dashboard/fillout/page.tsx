"use client";
import config from "@/app/config/variables";
import AvailableSensoryProfileBox from "@/components/userDashboard/sensoryProfile/availableSensoryProfileBox";
import { ChildFullDataResponse } from "@/interfaces/ChildInterfaces";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Fillout = () => {
  const [sensoryProfileId, setSensoryProfileId] = React.useState<
    string | null
  >();
  const [childs, setChilds] = React.useState<ChildFullDataResponse[]>([]);
  const [sensoryProfiles, setSensoryProfiles] = React.useState<
    SensoryProfileResponseInterface[]
  >([]);

  // Buscando todos os dependentes do usuário
  const fetchChilds = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/user/children/list`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("espaco-alcancar"),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setChilds(data);
    } catch (error) {
      throw new Error("Erro ao buscar dependentes");
    }
  };

  // Buscar perfil sensorial pelo ID
  const fetchSensoryProfilesOfaChild = async (childId: string) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/dashboard/sp/list-all-of-a-child/${childId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("espaco-alcancar")}`,
          },
        }
      );
      const data = await response.json();
      setSensoryProfiles((prev) => {
        const newProfiles = data.filter(
          (profile: SensoryProfileResponseInterface) =>
            !prev.some((existingProfile) => existingProfile.id === profile.id)
        );
        return [...prev, ...newProfiles];
      });
    } catch (error) {
      console.error("Error fetching sensory profile:", error);
    }
  };

  useEffect(() => {
    fetchChilds();
  }, []);

  useEffect(() => {
    if (childs.length > 0) {
      childs.map((child) => {
        fetchSensoryProfilesOfaChild(child.id);
      });
    }
  }, [childs]);

  return (
    <div className="flex flex-col px-4 bg-gray-100 h-screen">
      <Link
        href="/dashboard"
        className="flex items-center justify-center bg-verde-escuro text-white mt-3 mb-8 w-20 rounded-md p-1"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="font-destaque items-center text-destaque pt-8 pb-4 text-verde-escuro">
          Preenchimento de dados
        </h1>
        <div className="activity-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sensoryProfiles && sensoryProfiles.length > 0 ? (
            sensoryProfiles.map((sensoryProfile) => {
              if (sensoryProfile.status == "UNFILLED") {
                return (
                  <AvailableSensoryProfileBox
                    key={sensoryProfile.id}
                    sensoryProfileId={sensoryProfile.id}
                    unfilled
                  />
                );
              } else if (sensoryProfile.status == "STARTED") {
                return (
                  <AvailableSensoryProfileBox
                    key={sensoryProfile.id}
                    sensoryProfileId={sensoryProfile.id}
                    started
                  />
                );
              }
            })
          ) : (
            <p>Nenhum perfil aqui.</p>
          )}

          {/*          <div className="activity-item p-4 border rounded shadow">
            <h2 className="font-titulos text-verde-claro">Perfil Escolar</h2>
            <p>Descrição da atividade de Perfil Escolar.</p>
          </div> */}
        </div>

        <h2 className="font-destaque items-center text-destaque pt-8 text-verde-claro">
          Histórico
        </h2>
        <div className="mb-10 mt-4 activity-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sensoryProfiles &&
            sensoryProfiles.map((sensoryProfile) => {
              if (sensoryProfile.status == "FINISHED") {
                return (
                  <AvailableSensoryProfileBox
                    key={sensoryProfile.id}
                    sensoryProfileId={sensoryProfile.id}
                    filled
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Fillout;
