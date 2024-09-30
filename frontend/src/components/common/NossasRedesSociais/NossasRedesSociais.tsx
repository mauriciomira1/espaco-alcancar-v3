import Link from "next/link";
import React from "react";
import planetas from "@/../public/common/planetas.svg";
import astronautaMeditando from "@/../public/common/astronauta_meditando.svg";

import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import Image from "next/image";

const NossasRedesSociais = () => {
  return (
    <div className="flex justify-center mx-10 max-sm:mx-4">
      <div className="flex gap-28 max-lg:gap-14 max-md:gap-8 max-[560px]:gap-2 items-center justify-between max-[425px]:flex-col max-[425px]:gap-10">
        <Image
          src={planetas}
          alt="Planetas"
          width={280}
          className="max-lg:w-48 max-md:w-36 max-[560px]:w-28"
        />
        <div className="flex flex-col items-center justify-center gap-6 max-[560px]:gap-3">
          <h2 className="text-subtitulos font-subtitulos text-white text-center max-[560px]:text-lg">
            Nossas Redes Sociais
          </h2>
          <div className="flex gap-6 max-[560px]:gap-3">
            <Link
              href="https://instagram.com/espacoalcancargama"
              target="_blank"
              rel="noreferrer noopener noreferrer"
              className="px-3 py-3 rounded-full bg-white text-3xl text-pessego hover:text-verde-claro active:text-verde-escuro duration-100 max-md:px-2 max-md:py-2 max-md:text-2xl"
            >
              <BsInstagram />
            </Link>
            <Link
              href="https://wa.me/5561994250846"
              target="_blank"
              rel="noreferrer noopener noreferrer"
              className="px-3 py-3 rounded-full bg-white text-3xl text-pessego hover:text-verde-claro active:text-verde-escuro duration-100 max-md:px-2 max-md:py-2 max-md:text-2xl"
            >
              <BsWhatsapp />
            </Link>
          </div>
        </div>
        <Image
          src={astronautaMeditando}
          alt="Astronauta meditando"
          width={220}
          className="max-lg:w-44 max-md:w-32 max-[560px]:w-24"
        />
      </div>
    </div>
  );
};

export default NossasRedesSociais;
