"use client";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import BtnMarcarAgora from "../MenuLaptop/btnMarcarAgora";

const WindowMenu = ({ handleClose }: { handleClose: () => void }) => {
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

      {/*       <Link className={linksClass} href="/">
        Dúvidas
      </Link> */}

      <Link
        className="text-verde-escuro uppercase py-4 w-4/5 font-subtitulos text-center mb-6"
        href="/trabalhe-conosco"
        onClick={handleClose}
      >
        Trabalhe Conosco
      </Link>

      <BtnMarcarAgora href="https://wa.me/5561994250846" />
    </>
  );
};

export default WindowMenu;
