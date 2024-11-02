"use client";

import { FaArrowLeft } from "react-icons/fa";
import FormularioLogin from "@/components/login/FormularioLogin";
import { Link } from "react-router-dom";
import NossasRedesSociais from "@/components/common/NossasRedesSociais/NossasRedesSociais";
import FooterResponsive from "@/components/common/Footer/FooterResponsive";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center md:mx-4">
        <div className="flex flex-col items-center justify-center md:m-24 my-24">
          <Link to="/">
            <div className="mb-4 flex items-center gap-2 font-text font-semibold text-white">
              <FaArrowLeft />
              Voltar para Página inicial
            </div>
          </Link>
          <a
            href="/oauth2/authorization/google"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login com Google
          </a>
          <FormularioLogin />
        </div>
      </div>
      <NossasRedesSociais />
      <FooterResponsive />
    </>
  );
};

export default Login;
