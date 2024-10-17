import { BsWhatsapp } from "react-icons/bs";

const Agende = () => {
  return (
    <a
      className="flex gap-4 items-center px-3 py-1 bg-white my-10 text-pessego rounded font-titulos text-titulos max-md:text-subtitulos max-[425px]:text-subtitulos max-[425px]:mb-8 hover:bg-rosa-suave active:bg-lilas duration-150 max-[410px]:text-base max-[305px]:px-2 max-[305px]:text-sm"
      href="https://wa.me/5561994250846"
    >
      Agende sua consulta agora
      <span className="text-3xl max-[425px]:text-lg">
        <BsWhatsapp />
      </span>
    </a>
  );
};

export default Agende;
