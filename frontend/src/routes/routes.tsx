import { Routes, Route } from "react-router-dom";
import Home from "@/app/page";
import Login from "@/app/(pages)/login/page";
import Dashboard from "@/app/(pages)/dashboard/page";
import Private from "./privateRoutes";
import MenuPrincipal from "@/components/common/Menu/MenuPrincipal";
import NossasRedesSociais from "@/components/common/NossasRedesSociais/NossasRedesSociais";
import FooterResponsive from "@/components/common/Footer/FooterResponsive";
import Cadastro from "@/app/(pages)/cadastro/page";

const RoutesComponent = () => {
  return (
    <div>
      <MenuPrincipal />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Private Component={Dashboard} />} />
      </Routes>
      <NossasRedesSociais />
      <FooterResponsive />
    </div>
  );
};

export default RoutesComponent;
