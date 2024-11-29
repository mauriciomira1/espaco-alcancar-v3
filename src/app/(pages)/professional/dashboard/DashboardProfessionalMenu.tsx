import DashboardItem01 from "@/components/common/Dashboard/DashboardItem01";
import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const DashboardProfessionalMenu: React.FC = () => {
  return (
    <nav>
      <DashboardItem01
        text="Perfil Sensorial"
        urlTo="/professional/sensory-profile"
        icon={<IoNewspaperOutline size={36} />}
      />
      <DashboardItem01
        icon={<FaUsers size={36} />}
        text="Dados e Dependentes"
        urlTo="/professional/profile"
      />
    </nav>
  );
};

export default DashboardProfessionalMenu;
