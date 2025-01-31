"use client";

import Link from "next/link";

interface ItemMenuProps {
  to: string;
  name: string;
}

const ItemMenu = ({ to, name }: ItemMenuProps) => {
  return (
    <li className="h-full px-3 mb-1 hover:border-b-[6px] text-sm font-subtitulos border-pessego flex flex-wrap items-center justify-center gap-1 text-verde-escuro hover:text-pessego hover:cursor-pointer duration-100">
      <Link href={to} className="py-6 uppercase">
        {name}
      </Link>
    </li>
  );
};

export default ItemMenu;
