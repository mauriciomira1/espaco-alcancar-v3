import { Routes, Route } from "react-router-dom";
import Home from "@/app/page";
import Login from "@/app/(pages)/login/page";
import Dashboard from "@/app/(pages)/dashboard/page";
import MenuPrincipal from "@/components/common/Menu/MenuPrincipal";
import NossasRedesSociais from "@/components/common/NossasRedesSociais/NossasRedesSociais";
import FooterResponsive from "@/components/common/Footer/FooterResponsive";
import Cadastro from "@/app/(pages)/cadastro/page";
import PrivateRoutes from "./privateRoutes";
import NossoEspaco from "@/app/(pages)/nosso-espaco/page";
import Servicos from "@/app/(pages)/servicos/page";
import Sobre from "@/app/(pages)/sobre/page";
import TrabalheConosco from "@/app/(pages)/trabalhe-conosco/page";

const RoutesComponent = () => {
  return (
    <div>
      <MenuPrincipal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosso-espaco" element={<NossoEspaco />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={<PrivateRoutes Component={Dashboard} />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
      {/* <NossasRedesSociais />
      <FooterResponsive /> */}
    </div>
  );
};

export default RoutesComponent;
