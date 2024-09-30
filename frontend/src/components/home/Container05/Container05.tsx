"use client";
import Image from "next/image";
import astronauta from "@/../public/home/astronauta_com_rasgo.svg";
import Agende from "@/components/common/Agende/Agende";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Container05 = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-28 max-[425px]:py-14 relative mx-10 max-[425px]:mx-4">
        <div className="flex justify-between items-center max-w-[1440px]">
          <p
            className="text-white font-light text-3xl italic w-3/5 max-md:text-xl max-[375px]:text-base"
            data-aos="fade-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="800"
          >
            Nossa clínica é a sua nave espacial para a saúde infantil.
            <br />
            <br />
            Vamos voar juntos!
          </p>
          <Image
            src={astronauta}
            alt="Astronauta voando"
            width={350}
            className="max-lg:w-64 max-md:w-48 max-[425px]:w-36 max-[320px]:w-28"
            data-aos="zoom-in-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="800"
            data-aos-delay="200"
          />
        </div>
        <Agende />
      </div>
    </>
  );
};

export default Container05;
