"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

interface ListAllChildsProps {
  placeholder: string;
  frameworks: { idSelected: string; value: string; label: string }[];
  onChildChange: (child: string) => void;
}

const ListAllChilds = ({
  placeholder,
  frameworks,
  onChildChange,
}: ListAllChildsProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [idSelected, setIdSelected] = React.useState("");

  const handleChildChange = (childValue: string) => {
    const child = frameworks.find(
      (framework) => framework.value === childValue
    );
    setValue(child?.label || "");
    if (child?.idSelected) {
      onChildChange(child.idSelected); // Chamando a função de callback quando o child for atualizado
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mt-3 w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm bg-white border rounded-md"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="sm:w-[500px]">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>Nenhuma encontrada.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleChildChange}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ListAllChilds;
