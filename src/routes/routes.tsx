import Link from "next/link";
import Home from "@/app/page";
import Login from "@/app/(pages)/login/page";
import Dashboard from "@/app/(pages)/dashboard/page";
import MenuPrincipal from "@/components/common/Menu/MenuPrincipal";
import Cadastro from "@/app/(pages)/cadastro/page";
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
import SensoryProfileDetails from "@/app/(pages)/professional/sensory-profile/(sensoryProfileDetails)/[id]";

const RoutesComponent = () => {
  return (
    <div>
      <MenuPrincipal />
      {/* Adicione links de navegação aqui, se necessário */}
      <Link href="/">Home</Link>
      <Link href="/nosso-espaco">Nosso Espaço</Link>
      <Link href="/servicos">Serviços</Link>
      <Link href="/sobre">Sobre</Link>
      <Link href="/trabalhe-conosco">Trabalhe Conosco</Link>
      <Link href="/login">Login</Link>
      <Link href="/login-professional">Login Professional</Link>
      <Link href="/cadastro">Cadastro</Link>
      {/* Adicione mais links conforme necessário */}
    </div>
  );
};

export default RoutesComponent;
