import { Url } from "next/dist/shared/lib/router/router";
import { Link } from "react-router-dom";

interface ItemMenuProps {
  to: string;
  name: string;
}

const ItemMenu = ({ to, name }: ItemMenuProps) => {
  return (
    <li className="h-8 ms-1.5 px-3 rounded-md border-verde-claro border hover:border-verde-escuro hover:bg-verde-escuro hover:text-white font-subtitulos flex items-center justify-center gap-1 text-verde-escuro bg-transparent hover:cursor-pointer duration-100">
      <Link to={to} className="py-6 uppercase">
        {name}
      </Link>
    </li>
  );
};

export default ItemMenu;
