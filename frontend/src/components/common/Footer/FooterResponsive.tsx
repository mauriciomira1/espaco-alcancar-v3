import GoogleMaps from "./GoogleMaps";
import "./styles.css";

const FooterResponsive = () => {
  return (
    <div className="h-auto w-full">
      <div className="bg-clouds xl:h-[1100px] lg:h-[750px] md:h-[600px] sm:h-[450px] max-[490px]:h-72 max-[375px]:h-56 h-96 w-full -mb-2"></div>
      <footer className="relative w-full bottom-0 flex flex-col items-center justify-end text-white pt-10 bg-verde-escuro">
        <div className="flex gap-4 max-lg:gap-10 items-start justify-evenly w-full xl:w-11/12 max-lg:flex-col max-lg:items-center max-lg:justify-start">
          <div className="w-80 max-[375px]:w-72">
            <h3 className="text-subtitulos font-subtitulos">Onde estamos</h3>
            <div className="h-[1.5px] bg-white rounded-full w-12 my-1"></div>
            <p className="font-paragrafos mb-3">
              Quadra 44, Lt 65, Setor Leste, Gama/DF
            </p>
            <GoogleMaps />
          </div>
          <div className="w-80 max-[375px]:w-72">
            <h3 className="text-subtitulos font-subtitulos">Contato</h3>
            <div className="h-[1.5px] bg-white rounded-full w-12 my-1"></div>
            <p className="font-paragrafos">
              Telefone / WhatsApp: (61) 99425-0846
              <br />
              atendimento@espacoalcancar.com.br
            </p>
          </div>
          <div className="w-80 max-[375px]:w-72">
            <h3 className="text-subtitulos font-subtitulos">
              Horário de funcionamento
            </h3>
            <div className="h-[1.5px] bg-white rounded-full w-12 my-1"></div>
            <p className="font-paragrafos">
              Segunda a Sexta: 8h00 às 12h00 e 14h00 às 18h00
              <br />
              Sábado: 8h00 às 12h00 e 14h00 às 17h00
            </p>
          </div>
        </div>
        <div className="pt-16 mb-6 flex justify-between items-center w-11/12 bg-verde-escuro max-sm:flex-col max-sm:gap-2">
          <p className="font-subtitulos text-xs">
            Espaço Alcançar - Todos os direitos reservados
          </p>
          <a
            href="https://www.instagram.com/mauriciomira1/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-lilas font-subtitulos text-xs duration-100 hover:text-verde-claro"
          >
            Desenvolvido por Maurício Miranda
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FooterResponsive;
