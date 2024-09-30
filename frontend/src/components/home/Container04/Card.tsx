"use client";
import Image, { StaticImageData } from "next/image";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface CardProps {
  imgSrc: StaticImageData;
  name: string;
  description: string;
  selo: StaticImageData;
}

const Card = ({ imgSrc, name, description, selo }: CardProps) => {
  useEffect(() => {
    AOS.init({ duration: 200 });
  });

  return (
    <div
      className="flex flex-col items-center justify-center bg-cinza-claro rounded-lg py-4 relative w-80 max-md:w-64 max-[425px]:w-56"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="800"
    >
      <div className="absolute -top-8 -left-8 z-10">
        <Image
          src={selo}
          alt="Selo de astronauta"
          width={100}
          className="max-[425px]:w-20"
        />
      </div>
      <div className="relative rounded-md w-11/12">
        <Image
          src={imgSrc}
          alt={name}
          className="rounded-md object-cover h-80 max-md:h-64 max-[425px]:h-52 object-top"
        />
      </div>
      <h2 className="font-titulos text-titulos text-lilas pt-2 max-sm:text-lg">
        {name}
      </h2>
      <h3 className="font-paragrafos text-base text-lilas max-sm:text-base">
        {description}
      </h3>
    </div>
  );
};

export default Card;
