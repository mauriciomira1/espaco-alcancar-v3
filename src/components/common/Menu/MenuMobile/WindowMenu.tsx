"use client";

import { IoIosClose } from "react-icons/io";
import BtnMarcarAgora from "../MenuLaptop/btnMarcarAgora";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const WindowMenu = ({ handleClose }: { handleClose: () => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("espaco-alcancar");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const linksClass =
    "text-verde-escuro uppercase py-4 border-b-[1px] w-4/5 border-verde-escuro font-subtitulos text-center";

  return (
    <>
      <button
        className="text-white absolute right-1 top-1 text-5xl drop-shadow-sm"
        onClick={handleClose}
      >
        <IoIosClose />
      </button>
      <Link className={`mt-4 ${linksClass}`} to="/" onClick={handleClose}>
        Início
      </Link>
      <Link className={linksClass} to="/nosso-espaco" onClick={handleClose}>
        Nosso espaço
      </Link>
      <Link className={linksClass} to="/servicos" onClick={handleClose}>
        Serviços
      </Link>
      <Link className={linksClass} to="/sobre" onClick={handleClose}>
        Sobre nós
      </Link>
      <Link className={linksClass} to="/trabalhe-conosco" onClick={handleClose}>
        Trabalhe Conosco
      </Link>
      {isLoggedIn && location.pathname !== "/dashboard" && (
        <Link
          className="text-white bg-verde-escuro uppercase py-3 w-4/5 font-subtitulos text-center mb-6"
          to="/dashboard"
          onClick={handleClose}
        >
          Área do Usuário
        </Link>
      )}
      {!isLoggedIn && (
        <>
          <Link className={linksClass} to="/login" onClick={handleClose}>
            Entrar
          </Link>
          <Link
            className="text-verde-escuro uppercase py-4 w-4/5 font-subtitulos text-center mb-6"
            to="/cadastro"
            onClick={handleClose}
          >
            Cadastrar
          </Link>
        </>
      )}
      <BtnMarcarAgora href="https://wa.me/5561994250846" />
    </>
  );
};

export default WindowMenu;
