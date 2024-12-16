"use client";
import config from "@/app/config/variables";
import ListAllChilds from "@/components/professionalDashboard/sensoryProfile/listAllChilds";
import { ChildDefaultResponse } from "@/interfaces/ChildInterfaces";
import React, { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

// ShadcnUI
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

const BoxNewSensoryProfile: React.FC = () => {
  const [frameworks, setFrameworks] = React.useState<
    { idSelected: string; value: string; label: string }[]
  >([]);
  const [selectedChild, setSelectedChild] = React.useState<string>("");
  const { toast } = useToast();

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

      if (response.ok) {
        toast({
          title: "Perfil criado com sucesso!",
          style: { backgroundColor: "#85DC00", color: "#fff" },
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error to create sensory profile. Try again.", error);
    }
  };

  useEffect(() => {
    fetchChilds();
  }, []);

  if (!frameworks) {
    return (
      <div className="h-screen w-screen bg-gradient-to-b from-[#2D1C40] to-[#39719A] flex items-center justify-center">
        <div className="animate-spin-fast text-6xl text-pessego">
          <AiOutlineLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 shadow-md bg-white mt-8 text-pessego items-center justify-center  max-sm:w-full sm:w-[600px] flex flex-col p-3 rounded border-pessego border duration-150 ">
      <h2 className="text-sm font-titulos">Criar perfil sensorial</h2>
      <ListAllChilds
        placeholder="Selecione o paciente"
        frameworks={frameworks}
        onChildChange={(childId) => setSelectedChild(childId)}
      />
      <AlertDialog>
        {selectedChild ? (
          <AlertDialogTrigger className="mt-3 bg-pessego rounded-md w-full py-1.5 text-sm font-subtitulos text-white">
            Criar Perfil Sensorial
          </AlertDialogTrigger>
        ) : null}
        <AlertDialogContent className="rounded-md mx-2">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-verde-escuro font-titulos text-base">
              Deseja criar um novo Perfil Sensorial?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              O perfil sensorial será criado e disponibilizado para
              preenchimento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-verde-escuro"
              onClick={() => fetchNewSensoryProfile(selectedChild)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BoxNewSensoryProfile;
