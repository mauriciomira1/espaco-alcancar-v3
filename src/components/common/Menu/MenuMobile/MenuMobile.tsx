"use client";
import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import logo from "@/../public/common/logo_nome.svg";
import Image from "next/image";
import WindowMenu from "./WindowMenu"; // Ajuste o caminho conforme necessário
import Link from "next/link";

const MenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={`menu-mobile ${isOpen ? "left-0" : "-left-72"}`}
    >
      <nav className="bg-white h-16 flex justify-between items-center px-5 z-50">
        <div
          className={`w-72 bg-verde-claro flex flex-col items-center justify-start pt-12 absolute top-0 h-full duration-300 z-50 ${
            isOpen ? "left-0" : "-left-72"
          }`}
        >
          <WindowMenu handleClose={() => setIsOpen(false)} />
        </div>
        <span
          className="text-verde-escuro hover:text-verde-claro active:text-verde-claro text-4xl duration-150"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenu />
        </span>
        <Link href="/">
          <Image src={logo} alt="Logotipo Espaço Alcançar" width={100} />
        </Link>
        <Link
          href="https://wa.me/5561994250846"
          target="_blank"
          className="text-green-900 text-4xl hover:text-green-600 active:text-green-500 duration-150"
        >
          <BsWhatsapp size={30} />
        </Link>
      </nav>
    </div>
  );
};

export default MenuMobile;
