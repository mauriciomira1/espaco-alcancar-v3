"use client";
import Title from "@/components/common/Title/Title";
import "./styles.css";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const NossaHistoria = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative flex flex-col">
      <div className="nossaHistoriaPre h-56 max-xl:h-28"></div>
      <div className="py-2 bg-[#eaeaea] -my-0.5 flex justify-center">
        <div className="w-11/12 flex flex-col gap-6">
          <Title title="Nossa história" color="text-verde-escuro" />

          <div className="flex w-full justify-start">
            <p
              className="text-left w-3/5 max-md:w-4/5 max-[425px]:text-base max-[375px]:w-11/12 px-6 py-3 bg-lilas rounded text-white text-paragrafos font-paragrafos"
              data-aos="fade-right"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="600"
            >
              A ideia da Clínica surgiu no ano de 2015 e, no ano seguinte, o
              sonho tornou-se ainda mais próximo.
            </p>
          </div>

          <div className="flex w-full justify-end">
            <p
              className="text-right w-3/5 max-md:w-4/5 max-[425px]:text-base max-[375px]:w-11/12 px-6 py-3 bg-pessego rounded text-white text-paragrafos font-paragrafos"
              data-aos="fade-left"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="100"
              data-aos-duration="600"
            >
              Em 2022 o sonho deixou de ser apenas um sonho e a Clínica Espaço
              Alcançar foi idealizada pela Terapeuta Ocupacional Cissy Tinazi e
              pela Fonoaudióloga Hellen Lima.
            </p>
          </div>

          <div className="flex w-full justify-start">
            <p
              className="text-left w-3/5 max-md:w-4/5 max-[425px]:text-base max-[375px]:w-11/12 px-6 py-3 bg-verde-claro rounded text-white text-paragrafos font-paragrafos"
              data-aos="fade-right"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="100"
              data-aos-duration="600"
            >
              Atualmente, a Espaço Alcançar é um Centro de habilitação e
              reabilitação de crianças e adolescentes que apresentam
              dificuldades motoras, sensório-motoras, sociais, cognitivas e de
              comunicação provenientes ou não de lesão neurológica ou atraso do
              desenvolvimento.
            </p>
          </div>

          <div className="flex w-full justify-end">
            <p
              className="text-right w-3/5 max-md:w-4/5 max-[425px]:text-base max-[375px]:w-11/12 px-6 py-3 bg-verde-escuro rounded text-white text-paragrafos font-paragrafos"
              data-aos="fade-left"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="100"
              data-aos-duration="600"
            >
              Somos uma equipe multidisciplinar especializada, atualizada e
              qualificada, com objetivo de tornar essas crianças capazes de
              desenvolver o máximo do seu potencial e assim, promovendo mais
              autonomia em suas atividades diárias.
            </p>
          </div>

          <div className="flex w-full justify-start">
            <p
              className="text-left w-3/5 max-md:w-4/5 max-[425px]:text-base max-[375px]:w-11/12 px-6 py-3 bg-amarelo rounded text-gray-900 text-paragrafos font-paragrafos font-medium"
              data-aos="fade-right"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="100"
              data-aos-duration="600"
            >
              Propomos um trabalho de qualidade, afim de proporcionar qualidade
              de vida, amor, carinho e dedicação, em um ambiente que traz
              conforto e comodidade para nossas crianças e famílias.
            </p>
          </div>
        </div>
      </div>

      <div className="nossaHistoriaPos h-72 max-xl:h-36"></div>
    </section>
  );
};

export default NossaHistoria;
