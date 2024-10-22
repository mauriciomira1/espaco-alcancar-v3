import FooterResponsive from "@/components/common/Footer/FooterResponsive";
import NossasRedesSociais from "@/components/common/NossasRedesSociais/NossasRedesSociais";
import Carrossel from "@/components/nosso-espaco/Carrossel";

const NossoEspaco = () => {
  return (
    <>
      <section>
        <Carrossel />
      </section>
      <NossasRedesSociais />
      <FooterResponsive />
    </>
  );
};

export default NossoEspaco;
