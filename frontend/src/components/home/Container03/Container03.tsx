"use client";
import Link from "next/link";
import Image from "next/image";
import Title from "../../common/Title/Title";
import { BsArrowRight } from "react-icons/bs";
import astronauta02 from "@/../public/home/astronauta_planetas.svg";

import "./styles.css";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const Container03 = () => {
  const [position, setPosition] = useState(6);

  useEffect(() => {
    AOS.init();

    const intervalId = setInterval(() => {
      setPosition((prevPosition) => (prevPosition === 6 ? -6 : 6));
    }, 950);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container03 relative flex flex-col py-10">
      <div className="container03Pre h-[700px] max-xl:h-[450px] max-lg:h-96 max-[425px]:h-44 shadowOut"></div>
      <div className="bg-[#eaeaea] flex justify-center -my-1 z-10">
        <div className="max-w-[1440px] px-20 max-md:px-10 max-[425px]:px-4 flex flex-col gap-12 max-md:gap-8 max-[425px]:gap-6 items-center justify-center">
          <Title title="Sobre nós" />
          <div className="w-full">
            <p
              className="font-paragrafos text-paragrafos text-verde-escuro max-[425px]:text-base text-justify"
              data-aos="fade-down"
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic"
            >
              O Espaço Alcançar é um Centro de habilitação e reabilitação de
              crianças e adolescentes que apresentam dificuldades motoras,
              sensório-motoras, sociais, cognitivas e de comunicação
              provenientes ou não de lesão neurológica ou atraso do
              desenvolvimento.
              <br />
              <br />
              Somos uma equipe multidisciplinar especializada, atualizada e
              qualificada, com objetivo de tornar essas crianças capazes de
              desenvolver o máximo do seu potencial e assim, promovendo mais
              autonomia em suas atividades diárias.
            </p>
          </div>

          <div className="z-10 flex justify-between items-center w-full -mt-16 max-md:-mt-12 max-[425px]:-mt-4">
            <Link
              href="/sobre"
              className="text-white bg-pessego px-6 py-2 flex gap-3 items-center justify-center font-subtitulos text-subtitulos uppercase rounded-full hover:bg-lilas active:bg-verde-claro duration-150 max-[425px]:text-base max-[425px]:px-4 max-[425px]:py-1.5"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="100"
            >
              Saiba mais
              <span className="text-xl">
                <BsArrowRight />
              </span>
            </Link>
            <Image
              src={astronauta02}
              alt="Astronauta meditando"
              width={280}
              className="max-lg:w-72 max-md:w-60 max-sm:w-48 max-[425px]:w-28 max-[465px]:w-40 duration-1000"
              data-aos-easing="ease-out-cubic"
              style={{ marginRight: `${position}px` }}
            />
          </div>
        </div>
      </div>
      <div className="container03Pos h-[700px] max-xl:h-[450px] max-lg:h-96 max-[425px]:h-44 shadowOutDown"></div>
    </div>
  );
};

export default Container03;
