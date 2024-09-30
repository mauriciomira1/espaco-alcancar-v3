"use client";

import { FaArrowLeft } from "react-icons/fa";
import FormularioLogin from "@/components/login/FormularioLogin";

import Link from "next/link";

const Login = () => {
  return (
    <div className="flex items-center justify-center mx-4">
      <div className="flex flex-col items-center justify-center m-24">
        <Link href="/">
          <div className="mb-4 flex items-center gap-2 font-text font-semibold text-white">
            <FaArrowLeft />
            Voltar para Página inicial
          </div>
        </Link>
        <FormularioLogin />
      </div>
    </div>
  );
};

export default Login;
