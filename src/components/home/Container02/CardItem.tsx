import Image, { StaticImageData } from "next/image";
import React from "react";

const CardItem = ({
  photo,
  description,
}: {
  photo: StaticImageData;
  description: string;
}) => {
  return (
    <li className="splide__slide">
      <Image
        src={photo}
        alt={description}
        className="w-full h-full object-cover"
      />
    </li>
  );
};

export default CardItem;
