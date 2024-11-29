import { Routes, Route } from "react-router-dom";
import Home from "@/app/page";
import Login from "@/app/(pages)/login/page";
import Dashboard from "@/app/(pages)/dashboard/page";
import MenuPrincipal from "@/components/common/Menu/MenuPrincipal";
import Cadastro from "@/app/(pages)/cadastro/page";
import PrivateRoutes from "./privateRoutes";
import NossoEspaco from "@/app/(pages)/nosso-espaco/page";
import Servicos from "@/app/(pages)/servicos/page";
import Sobre from "@/app/(pages)/sobre/page";
import TrabalheConosco from "@/app/(pages)/trabalhe-conosco/page";
import Rate from "@/app/(pages)/dashboard/rate/page";
import Profile from "@/app/(pages)/dashboard/profile/page";
import Materials from "@/app/(pages)/dashboard/materials/page";
import Fillout from "@/app/(pages)/dashboard/fillout/page";
import ProfessionalLogin from "@/app/(pages)/login-professional/page";
import ProfessionalDashboardPage from "@/app/(pages)/professional/dashboard/page";
import SensoryProfilePage from "@/app/(pages)/professional/sensory-profile/page";
import ProfessionalProfilePage from "@/app/(pages)/professional/profile/page";

const RoutesComponent = () => {
  return (
    <div>
      <MenuPrincipal />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/nosso-espaco" element={<NossoEspaco />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-professional" element={<ProfessionalLogin />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Rotas privadas */}
        <Route
          path="/dashboard/*"
          element={<PrivateRoutes Component={Dashboard} />}
        />
        <Route
          path="/professional/dashboard"
          element={<PrivateRoutes Component={ProfessionalDashboardPage} />}
        />
        <Route
          path="/professional/profile"
          element={<PrivateRoutes Component={ProfessionalProfilePage} />}
        />
        <Route
          path="/professional/sensory-profile"
          element={<PrivateRoutes Component={SensoryProfilePage} />}
        />
        <Route
          path="/dashboard/fillout"
          element={<PrivateRoutes Component={Fillout} />}
        />
        <Route
          path="/dashboard/rate"
          element={<PrivateRoutes Component={Rate} />}
        />
        <Route
          path="/dashboard/profile"
          element={<PrivateRoutes Component={Profile} />}
        />
        <Route
          path="/dashboard/materials"
          element={<PrivateRoutes Component={Materials} />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default RoutesComponent;
