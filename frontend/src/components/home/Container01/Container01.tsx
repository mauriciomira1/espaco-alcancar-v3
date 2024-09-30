"use client";
import Link from "next/link";
import Image from "next/image";

import Title from "../../common/Title/Title";
import CardServicos from "./CardServicos";
import { BsArrowRight } from "react-icons/bs";
import astronauta01 from "@/../public/home/astronauta_sobre_planeta.svg";

import "./styles.css";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Container01 = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container01 relative flex flex-col">
      <div className="container01Pre h-96 max-xl:h-72 max-lg:h-48 max-[425px]:h-32 shadowOut relative pt-10"></div>
      <div className="bg-[#eaeaea] flex justify-center -my-0.5">
        <div className="max-w-[1440px] pt-10 px-20 max-md:px-10 max-[425px]:px-4 flex flex-col gap-12 max-md:gap-8 max-[425px]:gap-6 items-center justify-center">
          <Title title="Espaço Alcançar" />
          <div className="w-full">
            <p className="font-paragrafos text-paragrafos text-verde-escuro max-[425px]:text-base text-justify">
              A sua Clínica Multiprofissional completa. Oferecemos uma abordagem
              completa e integrada para a saúde das crianças.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap items-center justify-center">
            <CardServicos texto="pediatria" />
            <CardServicos texto="neuropediatria" />
            <CardServicos texto="hebiatria" />
            <CardServicos texto="homeopatia" />
            <CardServicos texto="psiquiatria" />
            <CardServicos texto="dermatologia" />
            <CardServicos texto="alergia e imunologia" />
            <CardServicos texto="cirurgia pediátrica" />
            <CardServicos texto="osteopatia" />
            <CardServicos texto="fisioterapia" />
            <CardServicos texto="terapia ocupacional" />
            <CardServicos texto="nutrição" />
            <CardServicos texto="psicologia" />
            <CardServicos texto="neuropsicologia" />
            <CardServicos texto="psicopedagogia" />
            <CardServicos texto="fonoaudiologia" />
            <CardServicos texto="musicoterapia" />
            <CardServicos texto="arteterapia" />
          </div>
          <Link
            href="/servicos"
            className="text-white bg-pessego px-6 py-2 flex gap-3 items-center justify-center font-subtitulos text-subtitulos uppercase rounded-full hover:bg-lilas active:bg-verde-claro duration-150 max-[425px]:text-base max-[425px]:px-4 max-[425px]:py-1.5 mb-3"
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
            Saiba mais
            <span className="tex-xl">
              <BsArrowRight />
            </span>
          </Link>
        </div>
      </div>
      <div className="container01Pos h-96 max-xl:h-72 max-lg:h-48 max-[425px]:h-32 shadowOut"></div>
      <Image
        src={astronauta01}
        alt="Astronauta em cima do planeta"
        width={340}
        className="absolute bottom-48 right-0 max-xl:bottom-16 max-lg:bottom-0 max-lg:w-72 max-md:w-60 max-md:bottom-10 max-sm:w-44 max-sm:bottom-24 max-[425px]:w-28 max-[425px]:bottom-16"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
      />
    </div>
  );
};

export default Container01;
