"use client";
import config from "@/app/config/variables";
import ListAllChilds from "@/components/userDashboard/sensoryProfile/listAllChilds";
import { ChildDefaultResponse } from "@/interfaces/ChildInterfaces";
import React, { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const BoxNewSensoryProfile: React.FC = () => {
  const [frameworks, setFrameworks] = React.useState<
    { idSelected: string; value: string; label: string }[]
  >([]);

  const fetchChilds = async () => {
    try {
      const currentToken =
        typeof window !== "undefined"
          ? localStorage.getItem("professional-espaco-alcancar")
          : null;

      const response = await fetch(
        `${config.apiBaseUrl}/user/children/list-all`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + currentToken,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      const transformedData = data.map((child: ChildDefaultResponse) => ({
        idSelected: child.id,
        value: child.name,
        label: child.name,
      }));
      setFrameworks(transformedData);
    } catch (error) {
      console.error("Error fetching childs. Try again.", error);
    }
  };

  const fetchNewSensoryProfile = async (childId: string) => {
    try {
      const currentToken = localStorage.getItem("professional-espaco-alcancar");

      const response = await fetch(`${config.apiBaseUrl}/dashboard/sp/new`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + currentToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ childId }),
      });
    } catch (error) {
      console.error("Error to create sensory profile. Try again.", error);
    }
  };

  useEffect(() => {
    fetchChilds();
  }, []);

  if (!frameworks.length) {
    return (
      <div className="h-screen w-screen bg-gradient-to-b from-[#2D1C40] to-[#39719A] flex items-center justify-center">
        <div className="animate-spin-fast text-6xl text-pessego">
          <AiOutlineLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 text-pessego items-center justify-center  max-sm:w-full sm:w-[600px] flex flex-col p-3 rounded border-pessego border duration-150 ">
      <h2 className="text-sm font-titulos">Criar perfil sensorial</h2>
      <ListAllChilds
        placeholder="Selecione o paciente"
        frameworks={frameworks}
        onChildChange={(childId) => fetchNewSensoryProfile(childId)}
      />
    </div>
  );
};

export default BoxNewSensoryProfile;
