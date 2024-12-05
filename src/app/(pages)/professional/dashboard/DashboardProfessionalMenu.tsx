import DashboardItem01 from "@/components/common/Dashboard/DashboardItem01";
import React from "react";
import { FaRegUser, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";

interface DashboardMenuProps {
  handleLogout: () => void;
}

const DashboardProfessionalMenu: React.FC<DashboardMenuProps> = ({
  handleLogout,
}) => {
  return (
    <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-8 px-2 justify-center">
      <DashboardItem01
        title="Perfil Sensorial"
        description="Disponibilize o perfil para seus pacientes preencherem"
        urlTo="/professional/sensory-profile"
        icon={<IoNewspaperOutline size={36} />}
      />
      <DashboardItem01
        icon={<FaRegUser size={32} />}
        title="Meus Dados"
        description="Visualize e Atualize seus dados pessoais"
        urlTo="/professional/profile"
      />
      <button
        className="text-white items-center justify-center flex flex-col p-4 rounded bg-gray-400 active:bg-gray-700 cursor-pointer duration-150"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={36} />
        <p className="text-xs mt-1">Logout</p>
      </button>
    </nav>
  );
};

export default DashboardProfessionalMenu;
