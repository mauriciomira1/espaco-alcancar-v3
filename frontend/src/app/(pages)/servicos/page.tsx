"use client";
import Image from "next/image";
import logotipo from "@/../public/common/logo.svg";
import Title from "@/components/common/Title/Title";
import astronauta from "@/../public/servicos/astronauta_em_pe.svg";
import ListaServicosLaptop from "@/components/servicos/Laptop/ListaServicosLaptop";
import ListaServicosMobile from "@/components/servicos/Mobile/ListaServicosMobile";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Servicos = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="flex justify-center relative h-96 max-lg:h-64 max-[520px]:h-52">
        <Title title="Nossos serviços" color="text-pessego" />
        <Image
          src={astronauta}
          alt="Astronauta em pé segurando foguete"
          width={360}
          quality={100}
          className="absolute top-3 right-1/4 max-xl:right-[18%] max-lg:w-64 max-md:right-14 max-sm:w-56 max-sm:right-6 max-[520px]:right-2 max-[520px]:w-48 max-[520px]:top-6 max-[390px]:w-40"
          data-aos="fade-right"
          data-aos-duration="800"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <ListaServicosLaptop />
        <ListaServicosMobile />
      </div>

      <div className="w-full flex justify-center py-14 flex-col items-center gap-20">
        <span
          className="text-destaque-gg font-destaque-gg text-lilas max-w-lg text-center max-sm:text-destaque-g px-8 max-[332px]:text-destaque"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          &quot;O céu é o limite, mas o potencial das crianças é infinito!&quot;
        </span>
        <Image
          alt="Logotipo Espaço Alcançar"
          src={logotipo}
          height={450}
          quality={100}
          className="max-xl:h-full max-lg:h-96 max-md:h-72 max-sm:h-64 max-[425px]:h-56"
        />
      </div>
    </div>
  );
};

export default Servicos;
