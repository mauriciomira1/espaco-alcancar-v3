// @ts-ignore
import { SplideSlide } from "@splidejs/react-splide";
import Image, { StaticImageData } from "next/image";

const ItemCarrossel = ({
  foto,
  altFoto,
  descricao,
}: {
  foto: StaticImageData;
  altFoto: string;
  descricao: string;
}) => {
  return (
    <SplideSlide>
      <div className="relative max-[500px]:flex max-[500px]:flex-col max-[500px]:items-center  max-[500px]:pb-20 max-[400px]:pb-28">
        <Image
          src={foto}
          alt={altFoto}
          width={800}
          className="w-full rounded-sm"
          objectFit="cover"
        />
        <p className="absolute z-10 bottom-0 left-0 px-2 py-2 mx-4 my-5 bg-[#ffffff73] rounded font-paragrafos text-verde-escuro max-[700px]:text-xs max-[500px]:-bottom-4 max-[500px]:-left-4 max-[500px]:w-full max-[500px]:bg-white max-[500px]:text-verde-claro">
          {descricao}
        </p>
      </div>
    </SplideSlide>
  );
};

export default ItemCarrossel;
