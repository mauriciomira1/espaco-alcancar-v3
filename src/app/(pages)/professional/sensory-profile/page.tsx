"use client";
// Icons
import { FaArrowLeft } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

import config from "@/app/config/variables";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

//Interfaces
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
import { ChildDefaultResponse } from "@/interfaces/ChildInterfaces";

// Components ShadcnUI
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

// Componentes
import DialogSensoryProfileResume from "@/components/userDashboard/sensoryProfile/dialogSensoryProfileResume";

interface FrameworksInterface {
  value: string;
  label: string;
}

const SensoryProfilePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [sensoryProfiles, setSensoryProfiles] = useState<
    SensoryProfileResponseInterface[]
  >([]);
  const [sensoryProfilesOfPatient, setSensoryProfilesOfPatient] = useState<
    SensoryProfileResponseInterface[]
  >([]);
  const [childData, setChildData] = useState<ChildDefaultResponse>();
  const [frameworks, setFrameworks] = useState<FrameworksInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null
  );
  const [resultsOfSensoryProfile, setResultsOfSensoryProfile] = useState({});
  const token = localStorage.getItem("professional-espaco-alcancar");

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      setError("Token not found");
      router.push("/login-professional");
      return;
    }

    // Buscar todos Perfis Sensoriais criados pelo atual profissional
    const fetchSensoryProfilesData = async () => {
      try {
        const response = await fetch(
          `${config.apiBaseUrl}/dashboard/sp/list-all-sensory-profiles-created`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const sensoryProfilesData: SensoryProfileResponseInterface[] =
            await response.json();
          // Remover duplicatas
          const uniqueProfiles = sensoryProfilesData.filter(
            (profile, index, self) =>
              index === self.findIndex((p) => p.id === profile.id)
          );
          setSensoryProfiles(uniqueProfiles);
        } else {
          setError("Failed to fetch patients data: " + response.statusText);
          router.push("/login");
        }
      } catch (error) {
        setError("Failed to fetch user data: " + (error as Error).message);
      }
    };

    fetchSensoryProfilesData();
  }, [token, router]);

  const fetchChildData = async (childId: String) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/user/children/find/${childId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const childData = await response.json();
        return childData;
      } else {
        setError("Failed to fetch child data: " + response.statusText);
        router.push("/login");
      }
    } catch (error) {
      setError("Failed to fetch child data: " + (error as Error).message);
    }
  };

  useEffect(() => {
    setFrameworks(
      sensoryProfiles.map((sp) => ({
        value: sp.childId,
        label: sp.childName,
      }))
    );
  }, [sensoryProfiles]);

  // Função que busca alguns detalhes do perfil sensorial do paciente selecionado (pelo array sensoryProfiles)
  const findSensoryProfilesOfPatient = async (childId: string) => {
    const sensoryProfilesOfThisPatient = sensoryProfiles.filter(
      (sensoryProfile) => childId === sensoryProfile.childId
    );

    setSensoryProfilesOfPatient(sensoryProfilesOfThisPatient);
    const child = await fetchChildData(childId);
    setChildData(child);
  };

  const fetchResultsOfSensoryProfile = async (profileId: string) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/dashboard/sp/get-answers-by-sp-id?id=${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "professional-espaco-alcancar"
            )}`,
          },
        }
      );
      const data = await response.json();
      setResultsOfSensoryProfile(data);
      setSelectedProfileId(profileId);
    } catch (error) {
      console.error("Error fetching sensory profile results:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center px-2 bg-white h-screen">
      <h1 className="font-destaque-gg text-destaque-g pt-8 pb-2 text-verde-escuro">
        Área do profissional
      </h1>
      <div className="w-full flex justify-center mt-4">
        <Link
          href="/professional/dashboard"
          className="flex items-center text-sm justify-center bg-verde-escuro text-white mb-8 w-20 rounded-md p-1"
        >
          <FaArrowLeft className="mr-1" />
          Voltar
        </Link>
      </div>
      <div className="text-verde-escuro items-center justify-center  max-sm:w-full sm:w-[600px] flex flex-col p-3 rounded border-verde-escuro border duration-150 ">
        <h2 className="text-sm font-titulos">Meus perfis sensoriais</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="mt-3 w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm bg-white border rounded-md">
              {inputValue || (
                <>
                  Selecione um paciente <MdKeyboardArrowDown size={22} />
                </>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command className="sm:w-[500px]">
              <CommandInput
                placeholder="Buscar paciente..."
                value={inputValue}
                onValueChange={(value) => setInputValue(value)}
              />
              <CommandList>
                <CommandEmpty>Nenhum perfil encontrado.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      onSelect={() => {
                        findSensoryProfilesOfPatient(framework.value);

                        setInputValue(framework.label);

                        setOpen(false);
                      }}
                    >
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {sensoryProfilesOfPatient && (
          <div className="mt-4 w-full flex flex-col gap-1 text-sm font-subtitulos">
            {childData && (
              <div className="font-normal text-sm my-4">
                <p> Nome: {childData.name} </p>
                <p>
                  Data de nascimento:{" "}
                  {childData.birth
                    ? new Date(childData.birth).toLocaleDateString("pt-BR")
                    : ""}
                </p>
              </div>
            )}

            {sensoryProfilesOfPatient.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col gap-2 bg-slate-200 drop-shadow-sm shadow-lg shadow-gray-300 rounded-md p-2"
              >
                <p>
                  Data de criação:{" "}
                  {new Date(profile.createdAt).toLocaleDateString("pt-BR")}
                </p>
                <p className="flex justify-between items-center gap-2">
                  Status:{" "}
                  {profile.status === "FINISHED" ? (
                    <>
                      Preenchido
                      <span className="w-3 h-3 bg-green-500 rounded-full ml-auto"></span>
                    </>
                  ) : profile.status === "UNFILLED" ? (
                    <>
                      Não preenchido
                      <span className="w-3 h-3 bg-red-500 rounded-full ml-auto"></span>
                    </>
                  ) : (
                    <>
                      Parcialmente preenchido
                      <span className="w-3 h-3 bg-orange-500 rounded-full ml-auto"></span>
                    </>
                  )}
                </p>
                <DialogSensoryProfileResume
                  isFilled={profile.status === "FINISHED"}
                  sensoryProfileId={profile.id}
                  resultsOfSensoryProfile={resultsOfSensoryProfile}
                  fetchResultsOfSensoryProfile={fetchResultsOfSensoryProfile}
                />
                <Link
                  href={`/professional/sensory-profile/${profile.id}`}
                  className="bg-pessego px-3 py-1.5 rounded-md text-white flex items-center justify-center"
                >
                  Perfil sensorial completo
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SensoryProfilePage;
