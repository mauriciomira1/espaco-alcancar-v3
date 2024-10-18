"use client";

import { FaArrowLeft } from "react-icons/fa";
import FormularioCadastro from "@/components/cadastro/FormularioCadastro";

import Link from "next/link";

const Cadastro = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mx-4">
      <div className="flex flex-col items-center justify-center md:m-10 my-10">
        <Link href="/">
          <div className="mb-4 flex items-center gap-2 font-text font-semibold text-white">
            <FaArrowLeft />
            Voltar para Página inicial
          </div>
        </Link>
        <FormularioCadastro />
      </div>
    </div>
  );
};

export default Cadastro;
