"use client";
import Image from "next/image";

import logotipo from "@/../public/common/logo.svg";
import Agende from "@/components/common/Agende/Agende";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Capa = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-20 pb-8 max-md:pb-0">
      <Agende />
      <div className="flex items-center justify-between w-4/6 max-lg:w-4/5 max-md:w-5/6 pt-6">
        <div>
          <h1
            className="w-96 max-[630px]:w-64 max-[425px]:w-44 text-lilas text-destaque-gg font-destaque-gg max-lg:text-destaque-g max-lg:font-destaque-g max-md:font-destaque max-md:text-destaque max-[425px]:text-destaque-p pb-1"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-easing="ease-out-cubic"
          >
            No universo Alcançar,
            <br />o céu é apenas o começo.
          </h1>
          <hr
            className="border-none bg-white h-[2px] w-16 rounded-full"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="400"
          />
        </div>
        <Image
          alt="Logotipo Espaço Alcançar"
          src={logotipo}
          height={450}
          quality={100}
          className="max-lg:h-96 max-md:h-72 max-[630px]:h-52 max-[425px]:h-44"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="150"
        />
      </div>
    </div>
  );
};

export default Capa;
