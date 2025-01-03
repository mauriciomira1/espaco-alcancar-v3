"use client";

import { FaArrowLeft } from "react-icons/fa";
import NossasRedesSociais from "@/components/common/NossasRedesSociais/NossasRedesSociais";
import FooterResponsive from "@/components/common/Footer/FooterResponsive";
import FormProfessionalLogin from "./FormProfessionalLogin";
import LinksAlternaPacienteProfissionalLogin from "@/components/login/LinksAlternaPacienteProfissionalLogin";
import Link from "next/link";

const ProfessionalLogin = () => {
  return (
    <>
      <div className="flex items-center justify-center md:mx-4">
        <div className="flex flex-col items-center justify-center md:m-24 my-24 mx-2">
          <Link href="/">
            <div className="mb-4 flex items-center gap-2 font-text font-semibold text-white">
              <FaArrowLeft />
              Voltar para Página inicial
            </div>
          </Link>
          <LinksAlternaPacienteProfissionalLogin />
          <FormProfessionalLogin />
        </div>
      </div>
      <NossasRedesSociais />
      <FooterResponsive />
    </>
  );
};

export default ProfessionalLogin;
