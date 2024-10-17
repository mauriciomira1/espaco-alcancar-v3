"use client";
import { HiMenu } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import logo from "@/../public/common/logo_nome.svg";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import WindowMenu from "./WindowMenu";

const MenuMobile = () => {
  const [toogleWindow, setToogleWindow] = useState(false);

  const handleClose = () => {
    setToogleWindow(false);
  };

  const handleOpen = () => {
    setToogleWindow(true);
  };

  return (
    <nav className="bg-white h-16 flex justify-between items-center px-5 z-50">
      <div
        className={`w-72 bg-verde-claro flex flex-col items-center justify-start pt-12 absolute top-0 h-full duration-300 z-50 ${
          toogleWindow ? "left-0" : "-left-72"
        }`}
      >
        <WindowMenu handleClose={handleClose} />
      </div>
      <span
        className="text-verde-escuro hover:text-verde-claro active:text-verde-claro text-4xl duration-150"
        onClick={handleOpen}
      >
        <HiMenu />
      </span>
      <Link href="/">
        <Image src={logo} alt="Logotipo Espaço Alcançar" width={130} />
      </Link>
      <Link
        href="https://wa.me/5561994250846"
        className="text-green-900 text-4xl hover:text-green-600 active:text-green-500 duration-150"
      >
        <BsWhatsapp />
      </Link>
    </nav>
  );
};

export default MenuMobile;
