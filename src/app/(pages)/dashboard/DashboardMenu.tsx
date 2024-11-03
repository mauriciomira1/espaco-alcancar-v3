import React from "react";
import { FaFileAlt, FaStar, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi";
import { Link } from "react-router-dom";

interface DashboardMenuProps {
  handleLogout: () => void;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({ handleLogout }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-8 justify-center">
      <Link
        to="/dashboard/fillout"
        className="text-white items-center justify-center flex flex-col p-4 rounded bg-verde-escuro active:bg-verde-claro cursor-pointer duration-150"
      >
        <FaFileAlt size={36} />
        <p className="text-xs mt-1.5">Preenchimento</p>
      </Link>
      <Link
        to="/dashboard/materials"
        className="text-white items-center justify-center flex flex-col p-4 rounded bg-verde-escuro active:bg-verde-claro cursor-pointer duration-150"
      >
        <HiOutlinePaperClip size={36} />
        <p className="text-xs mt-1">Materiais</p>
      </Link>
      <Link
        to="/dashboard/rate"
        className="text-white items-center justify-center flex flex-col p-4 rounded bg-verde-escuro active:bg-verde-claro cursor-pointer duration-150"
      >
        <FaStar size={36} />
        <p className="text-xs mt-1">Avalie-nos</p>
      </Link>
      <Link
        to="/dashboard/profile"
        className="text-white items-center justify-center flex flex-col p-4 rounded bg-verde-escuro active:bg-verde-claro cursor-pointer duration-150"
      >
        <FaUsers size={36} />
        <p className="text-xs mt-1">Dados e Dependentes</p>
      </Link>
      <button
        className="text-white items-center justify-center flex flex-col p-4 rounded bg-gray-500 active:bg-gray-700 cursor-pointer duration-150"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={36} />
        <p className="text-xs mt-1">Logout</p>
      </button>
    </div>
  );
};

export default DashboardMenu;
