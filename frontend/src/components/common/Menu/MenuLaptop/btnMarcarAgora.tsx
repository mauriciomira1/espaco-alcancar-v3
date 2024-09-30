import { BsArrowRight } from "react-icons/bs";

const BtnMarcarAgora = ({ href }: { href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full ml-2 uppercase font-subtitulos bg-pessego text-white px-4 py-1 flex gap-2 items-center hover:bg-verde-claro active:bg-verde-escuro duration-100"
    >
      Marcar agora <BsArrowRight />
    </a>
  );
};

export default BtnMarcarAgora;
