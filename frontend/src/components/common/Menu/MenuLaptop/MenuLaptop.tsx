import logoCompacto from "@/../public/common/logo_nome.svg";
import Image from "next/image";
import Link from "next/link";
import BtnMarcarAgora from "./btnMarcarAgora";
import ItemMenu from "./itemMenu";
import ItemMenuModelo2 from "./itemMenuModelo2";

const MenuLaptop = () => {
  return (
    <nav className="bg-white drop-shadow-lg  w-full flex justify-between items-center px-4 h-16">
      <div>
        <Link href="/">
          <Image
            src={logoCompacto}
            alt="Logotipo Espaço Alcançar"
            width={120}
          />
        </Link>
      </div>
      <div className="h-full xl:flex items-center">
        <ul className="flex items-center h-full">
          <ItemMenu href="/" name="Início" />
          <ItemMenu href="/nosso-espaco" name="Nosso espaço" />
          <ItemMenu href="/servicos" name="Serviços" />
          {/*           <ItemMenu href="/duvidas" name="Dúvidas" /> */}
          <ItemMenu href="/sobre" name="Sobre nós" />
          <ItemMenu href="/trabalhe-conosco" name="Trabalhe conosco" />
          <ItemMenuModelo2 href="/login" name="Entrar" />
          <ItemMenuModelo2 href="/cadastro" name="Cadastrar" />
          <BtnMarcarAgora href="https://wa.me/5561994250846" />
        </ul>
      </div>
    </nav>
  );
};

export default MenuLaptop;
