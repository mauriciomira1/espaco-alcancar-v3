"use client";
import Image from "next/image";
import logotipo from "@/../public/common/logo.svg";
import NossaHistoria from "./nossaHistoria";
import MissaoVisaoValores from "./missaoVisaoValores";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Sobre = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center w-full pt-16 pb-6">
        <Image
          alt="Logotipo Espaço Alcançar"
          src={logotipo}
          width={150}
          height={150}
          quality={100}
          priority
          className="max-2xl:h-[300px] max-lg:h-96 max-md:h-72 max-[630px]:h-64 max-[425px]:h-56 h-[350px]"
          data-aos="zoom-in"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        />
      </div>
      <NossaHistoria />
      <MissaoVisaoValores />
    </div>
  );
};

export default Sobre;
