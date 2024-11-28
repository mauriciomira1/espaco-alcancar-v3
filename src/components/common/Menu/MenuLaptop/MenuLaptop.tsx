import React, { useState, useEffect } from "react";
import logoCompacto from "@/../public/common/logo_nome.svg";
import Image from "next/image";
import BtnMarcarAgora from "./btnMarcarAgora";
import ItemMenu from "./itemMenu";
import ItemMenuModelo2 from "./itemMenuModelo2";
import { Link, useLocation } from "react-router-dom";

const MenuLaptop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Simulação de verificação de autenticação
    const token = localStorage.getItem("espaco-alcancar"); // ou qualquer outra lógica para verificar se o usuário está logado
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-white drop-shadow-lg w-full flex justify-between items-center px-4 h-16">
      <div>
        <Link to="/">
          <Image
            src={logoCompacto}
            alt="Logotipo Espaço Alcançar"
            width={120}
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
          <ItemMenuModelo2 to="/dashboard" name="Login" />
          {/* {isLoggedIn && location.pathname !== "/dashboard" && (
          )}
          {!isLoggedIn && (
            <>
              <ItemMenuModelo2 to="/login" name="Entrar" />
              <ItemMenuModelo2 to="/cadastro" name="Cadastrar" />
            </>
          )} */}
          <BtnMarcarAgora href="https://wa.me/5561994250846" />
        </ul>
      </div>
    </nav>
  );
};

export default MenuLaptop;
