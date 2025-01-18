import React, { useState, useEffect } from "react";
import logoCompacto from "@/../public/common/logo_nome.svg";
import Image from "next/image";
import BtnMarcarAgora from "./btnMarcarAgora";
import ItemMenu from "./itemMenu";
import ItemMenuModelo2 from "./itemMenuModelo2";
import Link from "next/link";

const MenuLaptop = () => {
  const [isProfessionalLoggedIn, setIsProfessionalLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("professional-espaco-alcancar");
    if (token) {
      setIsProfessionalLoggedIn(true);
    } else {
      setIsProfessionalLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-white drop-shadow-lg w-full flex justify-between items-center px-4 h-16">
      <div>
        <Link href="/">
          <Image
            src={logoCompacto}
            alt="Logotipo Espaço Alcançar"
            width={100}
            priority
          />
        </Link>
      </div>
      <div className="h-full xl:flex items-center">
        <ul className="flex items-center h-full">
          <ItemMenu to="/" name="Início" />
          <ItemMenu to="/nosso-espaco" name="Nosso espaço" />
          <ItemMenu to="/servicos" name="Serviços" />
          <ItemMenu to="/sobre" name="Sobre nós" />
          <ItemMenu to="/trabalhe-conosco" name="Trabalhe conosco" />
          {isProfessionalLoggedIn ? (
            <ItemMenuModelo2 to="/professional/dashboard" name="Acessar" />
          ) : (
            <ItemMenuModelo2 to="/dashboard" name="Acessar" />
          )}
          <BtnMarcarAgora href="https://wa.me/5561994250846" />
        </ul>
      </div>
    </nav>
  );
};

export default MenuLaptop;
