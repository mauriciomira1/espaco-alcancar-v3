"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface DialogSensoryProfileResumeProps {
  isFilled: boolean;
  sensoryProfileId: string;
  resultsOfSensoryProfile: Record<string, number>;
  fetchResultsOfSensoryProfile: (profileId: string) => void;
}

const DialogSensoryProfileResume: React.FC<DialogSensoryProfileResumeProps> = ({
  isFilled,
  sensoryProfileId,
  resultsOfSensoryProfile,
  fetchResultsOfSensoryProfile,
}) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (isFilled) {
      fetchResultsOfSensoryProfile(sensoryProfileId);
    } else {
      toast({
        title: "O perfil não foi preenchido.",
        description: "Resultado indisponível.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`px-3 py-1.5 rounded-md text-white my-2 ${
          isFilled ? "bg-verde-escuro" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleClick}
        disabled={!isFilled}
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
            {Object.entries(resultsOfSensoryProfile).map(([title, value]) => {
              const formattedTitle =
                {
                  exploracao: "Exploração",
                  esquiva: "Esquiva",
                  sensibilidade: "Sensibilidade",
                  observacao: "Observação",
                  geral: "Geral",
                  auditivo: "Auditivo",
                  visual: "Visual",
                  tato: "Tato",
                  movimentos: "Movimentos",
                  posicaoDoCorpo: "Posição do Corpo",
                  oral: "Oral",
                  conduta: "Conduta",
                  socioemocional: "Socioemocional",
                  atencao: "Atenção",
                  sensibilidadeOral: "Sensibilidade Oral",
                  comportamental: "Comportamental",
                }[title] || title;

              return (
                <tr key={title}>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                    {formattedTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {Number(value)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSensoryProfileResume;
