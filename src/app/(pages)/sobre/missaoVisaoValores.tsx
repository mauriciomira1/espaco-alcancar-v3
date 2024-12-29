"use client";
import Image from "next/image";
import astronautaCoracao from "@/../public/common/astronauta_foguete.svg";

// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const MissaoVisaoValores = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-full flex justify-center pt-10 max-sm:pt-0 pb-20">
      <div className="flex max-w-[1440px] justify-center flex-col items-center mx-6">
        <Image
          src={astronautaCoracao}
          alt="Astrouanta no foguete"
          width={250}
          height={250}
          quality={100}
          className="max-2xl:h-[300px] max-lg:h-72 max-md:h-72 max-[630px]:h-64 max-[425px]:h-56 h-[350px]"
          data-aos="fade-up-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="600"
          data-aos-delay="200"
        />
        <div className="gap-5 flex justify-center items-start w-full max-sm:flex-col max-sm:items-center">
          <div
            className="px-3 py-3 text-white rounded-xl w-1/3 max-sm:w-full bg-amarelo flex flex-col items-center"
            data-aos="fade-down"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="100"
            data-aos-duration="600"
          >
            <h2 className="font-titulos text-titulos uppercase max-md:text-subtitulos">
              Missão
            </h2>
            <p className="font-paragrafos text-paragrafos text-left max-lg:text-base">
              Realizar intervenções de excelência com crianças, por meio de
              métodos de tratamentos inovadores e com comprovação científica,
              fortalecendo famílias e construindo futuros.
            </p>
          </div>
          <div
            className="px-3 py-3 text-white rounded-xl w-1/3 max-sm:w-full bg-lilas flex flex-col items-center"
            data-aos="fade-down"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="300"
            data-aos-duration="600"
          >
            <h2 className="font-titulos text-titulos uppercase max-md:text-subtitulos">
              Visão
            </h2>
            <p className="font-paragrafos text-paragrafos text-left max-lg:text-base">
              O Espaço Alcançar será um Centro Terapêutico Multidisciplinar
              reconhecido pela excelência dos seus serviços prestados.
              Comprometido com a melhoria da qualidade de vida dos pacientes e
              ser referência nas áreas de atuação
            </p>
          </div>
          <div
            className="px-3 py-3 text-white rounded-xl w-1/3 max-sm:w-full bg-verde-claro flex flex-col items-center"
            data-aos="fade-down"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="500"
            data-aos-duration="600"
          >
            <h2 className="font-titulos text-titulos uppercase max-md:text-subtitulos">
              Valores
            </h2>
            <p className="font-paragrafos text-paragrafos text-left max-lg:text-base">
              Visão integrada da assistência à saúde e qualidade de vida com
              efetivo trabalho em equipe: profissionais, escola e família.
              Formação profissional continuada, acompanhando os avanços
              acadêmicos e científicos da atualidade Inclusão social Respeito à
              diversidade Transformar limitações em progressos Busca de
              resultados com base em empatia e felicidade
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissaoVisaoValores;
