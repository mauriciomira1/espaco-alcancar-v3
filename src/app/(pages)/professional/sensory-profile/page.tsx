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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChildDefaultResponse } from "@/interfaces/ChildInterfaces";

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
      }
    } catch (error) {
      setError("Failed to fetch child data: " + (error as Error).message);
    }
  };

  const fetchResultsOfSensoryProfile = async (sensoryProfileId: string) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/dashboard/sp/get-answers-by-sp-id?id=${sensoryProfileId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const sensoryProfileData = await response.json();
        setResultsOfSensoryProfile(sensoryProfileData);
        return sensoryProfileData;
      } else {
        setError(
          "Failed to fetch sensory profile data: " + response.statusText
        );
      }
    } catch (error) {
      setError(
        "Failed to fetch sensory profile data: " + (error as Error).message
      );
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center px-2 bg-white h-screen">
      <h1 className="font-destaque-gg text-destaque-g pt-8 pb-2 text-verde-escuro">
        Área do profissional
      </h1>
      <div className="w-full">
        <Link
          href="/professional/dashboard"
          className="flex items-center text-sm justify-center bg-verde-escuro text-white mb-8 w-20 rounded-md p-1"
        >
          <FaArrowLeft className="mr-1" />
          Voltar
        </Link>
      </div>
      <div className="text-verde-escuro items-center justify-center flex flex-col p-3 rounded border-verde-escuro border duration-150">
        <h2 className="text-sm font-titulos">Meus perfis sensoriais</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="mt-3 w-full flex items-center gap-2 px-2 py-2 text-left text-sm bg-white border rounded-md">
              {inputValue || (
                <>
                  Selecione um paciente <MdKeyboardArrowDown size={22} />
                </>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
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
          <div className="mt-4 flex flex-col gap-1 text-sm font-subtitulos">
            {childData && (
              <div className="font-normal text-sm mb-3">
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
                <Dialog>
                  <DialogTrigger
                    className="bg-verde-escuro px-3 py-1.5 rounded-md text-white my-2"
                    onClick={() => fetchResultsOfSensoryProfile(profile.id)}
                  >
                    Resultados do Perfil
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Resultados do Perfil Sensorial</DialogTitle>
                    </DialogHeader>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Item
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Pontuação
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(resultsOfSensoryProfile).map(
                          ([title, value]) => (
                            <tr key={title}>
                              <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                                {title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                {Number(value)}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </DialogContent>
                </Dialog>
                <Link
                  href={`/professional/sensory-profile/${profile.id}`}
                  className="bg-pessego px-3 py-1.5 rounded-md text-white flex items-center justify-center"
                >
                  Ver perfil sensorial completo
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
