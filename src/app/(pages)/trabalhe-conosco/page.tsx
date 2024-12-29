"use client";
import Image from "next/image";
import logo from "@/../public/common/logo.svg";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import NossasRedesSociais from "@/components/common/NossasRedesSociais/NossasRedesSociais";
import FooterResponsive from "@/components/common/Footer/FooterResponsive";

const TrabalheConosco = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mx-4">
        <div className="grid grid-cols-2 bg-white w-[768px] max-lg:w-[620px] max-md:w-[500px] rounded-2xl my-16 justify-items-center place-items-center max-[470px]:grid-cols-3">
          <div
            className="flex flex-col px-5 bg-pessego rounded-2xl font-paragrafos gap-4 items-start justify-center w-full h-full py-16 max-[470px]:col-span-2 max-[470px]:px-3 max-[360px]:col-span-3 max-[360px]:items-center"
            style={{ boxShadow: "inset -2px 0px 3px 3px rgba(0,0,0,0.1)" }}
          >
            <h1
              className="text-white font-destaque-g text-destaque-g max-md:text-destaque max-[520px]:text-base"
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="100"
              data-aos-duration="800"
            >
              Faça parte da nossa equipe!
            </h1>
            <div
              className="bg-white h-[1.5px] rounded-full w-44"
              data-aos="zoom-in"
              data-aos-duration="1800"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="1000"
            ></div>
            <p
              className="text-white font-paragrafos text-paragrafos max-md:text-base max-[520px]:text-sm"
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              Envie seu currículo para:
              <br />
              <a
                href="mailto:rh@espacoalcancar.com.br"
                className="font-bold text-verde-escuro hover:text-verde-claro active:text-white"
              >
                rh@espacoalcancar.com.br
              </a>
            </p>
          </div>
          <Image
            src={logo}
            alt="Logotipo Espaço Alcançar"
            quality={100}
            className="py-10 max-md:w-32 max-[520px]:w-24 max-[470px]:w-20 max-[360px]:hidden"
            data-aos="fade-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="800"
          />
        </div>
      </div>
      <NossasRedesSociais />
      <FooterResponsive />
    </>
  );
};

export default TrabalheConosco;
