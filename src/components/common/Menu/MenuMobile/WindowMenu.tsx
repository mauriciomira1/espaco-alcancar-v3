"use client";

import { IoIosClose } from "react-icons/io";
import BtnMarcarAgora from "../MenuLaptop/btnMarcarAgora";
import { useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import config from "@/app/config/variables";
import { useToken } from "@/contexts/TokenContext";

const WindowMenu = ({ handleClose }: { handleClose: () => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfessionalLoggedIn, setIsProfessionalLoggedIn] = useState(false);
  const { tokenChecked, setTokenChecked } = useToken();

  useEffect(() => {
    const token = localStorage.getItem("espaco-alcancar");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const tokenProfessional = localStorage.getItem(
      "professional-espaco-alcancar"
    );
    if (tokenProfessional) {
      setIsProfessionalLoggedIn(true);
    } else {
      setIsProfessionalLoggedIn(false);
    }
  }, []);

  const renewToken = async () => {
    const response = await fetch(`${config.apiBaseUrl}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (
      !response.ok &&
      (window.location.pathname !== "/login" ||
        window.location.pathname !== "/nosso-espaco" ||
        window.location.pathname !== "/servicos" ||
        window.location.pathname !== "/sobre" ||
        window.location.pathname !== "/trabalhe-conosco")
    ) {
      window.location.href = "/login";
      return;
    }

    const data = await response.json();
    const newToken = data.token;
    localStorage.setItem("espaco-alcancar", newToken);
    setIsLoggedIn(true);
  };

  const checkToken = async () => {
    const token = localStorage.getItem("espaco-alcancar");
    if (!token) {
      await renewToken();
    }
    setTokenChecked(true);
  };

  useEffect(() => {
    if (!tokenChecked) {
      setTokenChecked(true);
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Link className={`mt-4 ${linksClass}`} href="/" onClick={handleClose}>
        Início
      </Link>
      <Link className={linksClass} href="/nosso-espaco" onClick={handleClose}>
        Nosso espaço
      </Link>
      <Link className={linksClass} href="/servicos" onClick={handleClose}>
        Serviços
      </Link>
      <Link className={linksClass} href="/sobre" onClick={handleClose}>
        Sobre nós
      </Link>
      <Link
        className={linksClass}
        href="/trabalhe-conosco"
        onClick={handleClose}
      >
        Trabalhe Conosco
      </Link>
      {isProfessionalLoggedIn ? (
        <Link
          className="text-white bg-verde-escuro uppercase py-3 w-4/5 font-subtitulos text-center mb-6 flex items-center justify-center"
          href="/professional/dashboard"
          onClick={handleClose}
        >
          <FaRegCircleUser size={18} className="mr-2" />
          Acessar
        </Link>
      ) : (
        <Link
          className="text-white bg-verde-escuro uppercase py-3 w-4/5 font-subtitulos text-center mb-6 flex items-center justify-center"
          href="/dashboard"
          onClick={handleClose}
        >
          <FaRegCircleUser size={18} className="mr-2" />
          Acessar
        </Link>
      )}
      <BtnMarcarAgora href="https://wa.me/5561994250846" />
    </>
  );
};

export default WindowMenu;
