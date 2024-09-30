"use client";
import Image from "next/image";
import Title from "../../common/Title/Title";
import Card from "./Card";

// Imagens
import CissyPhoto from "@/../public/equipe/6.jpg";
import HellenPhoto from "@/../public/equipe/5.jpg";
import MarcusPhoto from "@/../public/equipe/4.jpg";
import AlinePhoto from "@/../public/equipe/13.jpg";
import BeatrizPhoto from "@/../public/equipe/18.jpg";
import CarolinaPhoto from "@/../public/equipe/3.jpg";
import FernandaPhoto from "@/../public/equipe/17.jpg";
import GustavoPhoto from "@/../public/equipe/15.jpg";
import JessicaPhoto from "@/../public/equipe/16.jpg";
import KarinePhoto from "@/../public/equipe/1.jpg";
import LilianePhoto from "@/../public/equipe/19.jpg";
import RafaelaPhoto from "@/../public/equipe/2.jpg";
import LigiaPhoto from "@/../public/equipe/11.jpg";
import LilianPhoto from "@/../public/equipe/12.jpg";
import PolyanaPhoto from "@/../public/equipe/9.jpg";
import RaissaPhoto from "@/../public/equipe/8.jpg";
import VitorPhoto from "@/../public/equipe/14.jpg";
import ReinaldoPhoto from "@/../public/equipe/7.jpg";
import RubiPhoto from "@/../public/equipe/10.jpg";
import ThaisPhoto from "@/../public/equipe/21.jpg";
import KymPhoto from "@/../public/equipe/22.jpg";
import DavidPhoto from "@/../public/equipe/20.jpg";

// Vetores
import astronautaBaloes from "@/../public/home/atronauta_baloes.svg";
import selo01 from "@/../public/etiquetas/etiqueta_01.svg";
import selo02 from "@/../public/etiquetas/etiqueta_02.svg";
import selo03 from "@/../public/etiquetas/etiqueta_03.svg";
import selo04 from "@/../public/etiquetas/etiqueta_04.svg";

// Animação
import { useEffect, useState } from "react";

const Container04 = () => {
  const [position, setPosition] = useState(6);

  useEffect(() => {
    setInterval(() => {
      setPosition((prevPosition) => (prevPosition === 6 ? -6 : 6));
    }, 1500);
  }, []);

  return (
    <div className="flex justify-center pt-32 w-full">
      <div className="max-w-[1440px] w-full">
        <div className="relative">
          <Image
            src={astronautaBaloes}
            alt="Astronauta segurando balões"
            width={400}
            className="absolute -top-80 left-64 max-xl:w-72 max-xl:-top-60 max-xl:left-72 max-lg:left-40 max-md:left-10 max-md:-top-56 max-[425px]:w-48 max-[425px]:-top-36 max-[425px]:left-0 duration-[1200ms]"
            style={{ marginTop: `${position}px` }}
          />
          <Title title="Nossos astronautas" color="text-white" />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 pt-10 mx-10">
          <Card
            imgSrc={CissyPhoto}
            name="Cissy Tinazi"
            description="Terapeuta Ocupacional"
            selo={selo01}
          />

          <Card
            imgSrc={HellenPhoto}
            name="Hellen Lima"
            description="Fonoaudióloga"
            selo={selo03}
          />

          <Card
            imgSrc={BeatrizPhoto}
            name="Beatriz Perissê"
            description="Fisioterapeuta"
            selo={selo01}
          />
          <Card
            imgSrc={CarolinaPhoto}
            name="Carolina Pires"
            description="Psicóloga"
            selo={selo02}
          />
          <Card
            imgSrc={FernandaPhoto}
            name="Fernanda Martins"
            description="Terapeuta Ocupacional"
            selo={selo03}
          />

          <Card
            imgSrc={JessicaPhoto}
            name="Jéssica Carvalho"
            description="Fisioterapeuta"
            selo={selo04}
          />
          <Card
            imgSrc={KarinePhoto}
            name="Karine Silva"
            description="Neuropsicóloga"
            selo={selo01}
          />
          <Card
            imgSrc={KymPhoto}
            name="Kymbelie Hemilli"
            description="Fonoaudióloga"
            selo={selo04}
          />
          <Card
            imgSrc={LilianePhoto}
            name="Liliane Ribeiro"
            description="Osteopata"
            selo={selo03}
          />

          <Card
            imgSrc={LilianPhoto}
            name="Lilian Corgozinho"
            description="Musicoterapeuta e Psicopedagoga"
            selo={selo02}
          />

          <Card
            imgSrc={PolyanaPhoto}
            name="Polyana Freitas"
            description="Enfermeira"
            selo={selo01}
          />
          <Card
            imgSrc={RaissaPhoto}
            name="Raissa de Sá"
            description="Nutricionista"
            selo={selo04}
          />
          <Card
            imgSrc={RubiPhoto}
            name="Rubi Santos"
            description="Psicóloga infantil"
            selo={selo02}
          />
          <Card
            imgSrc={ThaisPhoto}
            name="Thaís Sousa"
            description="Fisioterapeuta"
            selo={selo01}
          />
          <Card
            imgSrc={AlinePhoto}
            name="Dra. Aline Morais"
            description="Alergista & Imunologista"
            selo={selo02}
          />
          <Card
            imgSrc={DavidPhoto}
            name="Dr. David Uchoa"
            description="Médico Geneticista"
            selo={selo01}
          />
          <Card
            imgSrc={GustavoPhoto}
            name="Dr. Gustavo Flauber"
            description="Psiquiatra infantil e adulto"
            selo={selo03}
          />
          <Card
            imgSrc={LigiaPhoto}
            name="Dra. Lígia Silva"
            description="Homeopata"
            selo={selo01}
          />
          <Card
            imgSrc={MarcusPhoto}
            name="Dr. Marcus Petindá"
            description="Pediatra & Hebiatra"
            selo={selo02}
          />
          <Card
            imgSrc={RafaelaPhoto}
            name="Dra. Rafaela Perissê"
            description="Clínica Geral"
            selo={selo04}
          />
          <Card
            imgSrc={ReinaldoPhoto}
            name="Dr. Reinaldo Neves"
            description="Cirurgião Pediátrico"
            selo={selo01}
          />
          <Card
            imgSrc={VitorPhoto}
            name="Dr. Vítor Pinheiro"
            description="Alergista & Imunologista"
            selo={selo03}
          />
        </div>
      </div>
    </div>
  );
};

export default Container04;
