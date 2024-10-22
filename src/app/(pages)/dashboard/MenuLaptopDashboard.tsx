import React from "react";
import { FaFileAlt, FaStar, FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi";

interface MenuLaptopDashboardProps {
  handleLogout: () => void;
}

const MenuLaptopDashboard: React.FC<MenuLaptopDashboardProps> = ({
  handleLogout,
}) => {
  return (
    <div className="hidden min-[1080px]:flex fixed top-[4rem] pt-10 left-0 h-full bg-verde-escuro flex-col px-4 border-l border-gray-200 shadow-r shadow-md shadow-slate-400">
      <button className="text-white items-center justify-center flex flex-col mb-4 my-3">
        <FaFileAlt size={24} />
        <p className="text-xs">Atividades</p>
      </button>
      <button className="text-white items-center justify-center flex flex-col mb-4 my-3">
        <HiOutlinePaperClip size={24} />
        <p className="text-xs">Materiais</p>
      </button>
      <button className="text-white items-center justify-center flex flex-col mb-4 my-3">
        <FaStar size={24} />
        <p className="text-xs">Avaliação</p>
      </button>
      <button className="text-white items-center justify-center flex flex-col mb-4 my-3">
        <FaUser size={24} />
        <p className="text-xs">Meus Dados</p>
      </button>
      <button
        className="text-white items-center justify-center flex flex-col my-3"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={24} />
        <p className="text-xs">Logout</p>
      </button>
    </div>
  );
};

export default MenuLaptopDashboard;
