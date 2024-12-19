import DashboardItem01 from "@/components/common/Dashboard/DashboardItem01";
import React from "react";
import { FaFileAlt, FaStar, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { HiOutlinePaperClip } from "react-icons/hi";

interface DashboardMenuProps {
  handleLogout: () => void;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({ handleLogout }) => {
  return (
    <nav className="grid grid-cols-2 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-8 justify-center">
      <DashboardItem01
        icon={<FaFileAlt size={36} />}
        title="Preenchimento"
        urlTo="/dashboard/fillout"
      />

      <DashboardItem01
        icon={<HiOutlinePaperClip size={36} />}
        title="Materiais"
        urlTo="/dashboard/materials"
      />

      <DashboardItem01
        icon={<FaStar size={36} />}
        title="Avalie-nos"
        urlTo="/dashboard/rate"
      />

      <DashboardItem01
        icon={<FaUsers size={36} />}
        title="Dados e Dependentes"
        urlTo="/dashboard/profile"
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

export default DashboardMenu;
