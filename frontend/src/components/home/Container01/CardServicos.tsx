"use client";
// Animação
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const CardServicos = ({ texto }: { texto: string }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <span
      className="px-2 py-1 uppercase rounded border-2 border-pessego text-pessego font-subtitulos text-subtitulos max-md:font-paragrafos max-md:border max-[425px]:text-sm"
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      {texto}
    </span>
  );
};

export default CardServicos;
