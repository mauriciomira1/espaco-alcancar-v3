import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";

interface ItemMenuProps {
  to: string;
  name: string;
}

const ItemMenu = ({ to, name }: ItemMenuProps) => {
  return (
    <li className="h-8 ms-1.5 px-3 rounded-md text-sm hover:border-verde-claro border hover:bg-white border-verde-escuro bg-verde-escuro text-white font-subtitulos flex-row items-center justify-center hover:text-verde-escuro bg-transparent hover:cursor-pointer duration-100">
      <Link
        href={to}
        className="uppercase flex flex-row items-center justify-center py-[5px]"
      >
        <FaRegCircleUser size={18} className="mr-2" />
        {name}
      </Link>
    </li>
  );
};

export default ItemMenu;
