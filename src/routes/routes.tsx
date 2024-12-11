import MenuPrincipal from "@/components/common/Menu/MenuPrincipal";
import Link from "next/link";

const RoutesComponent = () => {
  return (
    <div>
      <MenuPrincipal />
      <Link href="/" className="hidden">
        Home
      </Link>
      <Link href="/nosso-espaco" className="hidden">
        Nosso Espaço
      </Link>
      <Link href="/servicos" className="hidden">
        Serviços
      </Link>
      <Link href="/sobre" className="hidden">
        Sobre
      </Link>
      <Link href="/trabalhe-conosco" className="hidden">
        Trabalhe Conosco
      </Link>
      <Link href="/login" className="hidden">
        Login
      </Link>
      <Link href="/login-professional" className="hidden">
        Login Professional
      </Link>
      <Link href="/cadastro" className="hidden">
        Cadastro
      </Link>
    </div>
  );
};

export default RoutesComponent;
