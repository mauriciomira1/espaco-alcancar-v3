import React from "react";
import { FaFileAlt, FaStar, FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi";

interface MenuMobileDashboardProps {
  handleLogout: () => void;
}

const MenuMobileDashboard: React.FC<MenuMobileDashboardProps> = ({
  handleLogout,
}) => {
  return (
    <div className="bg-verde-escuro fixed bottom-0 left-0 right-0 flex justify-around p-4 border-t border-gray-200 shadow-t shadow-md min-[1080px]:hidden">
      <button className="text-white items-center justify-center flex flex-col">
        <FaFileAlt size={24} />
        <p className="text-xs">Atividades</p>
      </button>
      <button className="text-white items-center justify-center flex flex-col">
        <HiOutlinePaperClip size={24} />
        <p className="text-xs">Materiais</p>
      </button>
      <button className="text-white items-center justify-center flex flex-col">
        <FaStar size={24} />
        <p className="text-xs">Avaliação</p>
      </button>
      <button className="text-white items-center justify-center flex flex-col">
        <FaUser size={24} />
        <p className="text-xs">Meus Dados</p>
      </button>
      <button
        className="text-white items-center justify-center flex flex-col"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={24} />
        <p className="text-xs">Logout</p>
      </button>
    </div>
  );
};

export default MenuMobileDashboard;
