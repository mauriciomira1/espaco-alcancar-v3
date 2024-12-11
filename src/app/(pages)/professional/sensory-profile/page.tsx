"use client";
import config from "@/app/config/variables";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SensoryProfileResponseInterface } from "@/interfaces/SensoryProfileInterfaces";
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

interface FrameworksInterface {
  value: string;
  label: string;
}

const SensoryProfilePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [sensoryProfiles, setSensoryProfiles] = useState<
    SensoryProfileResponseInterface[]
  >([]);
  const [frameworks, setFrameworks] = useState<FrameworksInterface[]>([]);
  const [selectedProfile, setSelectedProfile] =
    useState<SensoryProfileResponseInterface | null>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
    const fetchUserData = async () => {
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

    fetchUserData();
  }, [token, router]);

  useEffect(() => {
    setFrameworks(
      sensoryProfiles.map((sp) => ({
        value: `/professional/sensory-profile/${sp.id}`,
        label: sp.childName,
      }))
    );
  }, [sensoryProfiles]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center px-2 bg-white h-screen">
      <h1 className="font-destaque-gg text-destaque-g pt-8 pb-2 text-verde-escuro">
        Área do profissional
      </h1>
      <div className="w-full">
        <Link href="/professional/dashboard">
          <a className="flex items-center text-sm justify-center bg-verde-escuro text-white mb-8 w-20 rounded-md p-1">
            <FaArrowLeft className="mr-1" />
            Voltar
          </a>
        </Link>
      </div>
      <div className="text-verde-escuro items-center justify-center flex flex-col p-3 rounded border-verde-escuro border cursor-pointer duration-150">
        <h2 className="text-sm font-titulos">Meus perfis sensoriais</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="w-full px-4 py-2 text-left bg-white border rounded-md">
              {inputValue || "Selecione um perfil sensorial"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Buscar perfil sensorial..."
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
                        const selected = sensoryProfiles.find(
                          (sp) => sp.id === framework.value.split("/").pop()
                        );
                        setSelectedProfile(selected || null);
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
        {selectedProfile && (
          <div className="mt-4">
            <p>{selectedProfile.resultsOfSensoryProfile}</p>
            <Link href={`/professional/sensory-profile/${selectedProfile.id}`}>
              <a className="text-blue-500 underline">Ver perfil completo</a>
            </Link>
          </div>
        )}
      </div>

      {/* <Outlet /> */}
    </div>
  );
};

export default SensoryProfilePage;
