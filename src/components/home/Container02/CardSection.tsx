/* import "@splidejs/splide/dist/css/splide.min.css"; */
"use client";
import "@splidejs/splide/css";
import Photo01 from "@/../public/home/fotos-clinica/1.jpg";
import Photo02 from "@/../public/home/fotos-clinica/2.jpg";
import Photo03 from "@/../public/home/fotos-clinica/3.jpg";
import Photo04 from "@/../public/home/fotos-clinica/4.jpg";
import Photo05 from "@/../public/home/fotos-clinica/5.jpg";
import Photo06 from "@/../public/home/fotos-clinica/6.jpg";
import Photo07 from "@/../public/home/fotos-clinica/7.jpg";
import Photo08 from "@/../public/home/fotos-clinica/8.jpg";
import Photo09 from "@/../public/home/fotos-clinica/9.jpg";
import Photo10 from "@/../public/home/fotos-clinica/10.jpg";
import Photo11 from "@/../public/home/fotos-clinica/11.jpg";
import Splide from "@splidejs/splide";
import { useEffect } from "react";
import CardItem from "./CardItem";

const CardSection = () => {
  useEffect(() => {
    new Splide("#image-carousel", {
      heightRatio: 0.5,
      rewind: true,
    }).mount();
  }, []);

  return (
    <section
      id="image-carousel"
      className="splide w-full"
      aria-label="Imagens da clínica"
    >
      <div className="splide__track">
        <ul className="splide__list">
          <CardItem photo={Photo01} description="Mire as estrelas" />
          <CardItem photo={Photo02} description="Interação" />
          <CardItem photo={Photo03} description="Amamentação" />
          <CardItem photo={Photo04} description="Consultório" />
          <CardItem photo={Photo05} description="Atividade de vida diária" />
          <CardItem photo={Photo06} description="Sala de descanso dos pais" />
          <CardItem photo={Photo07} description="Sala de Terapia Ocupacional" />
          <CardItem photo={Photo08} description="Banheiros" />
          <CardItem photo={Photo09} description="Recepção" />
          <CardItem photo={Photo10} description="Interatividade" />
          <CardItem photo={Photo11} description="Escalada" />
        </ul>
      </div>
    </section>
  );
};

export default CardSection;
