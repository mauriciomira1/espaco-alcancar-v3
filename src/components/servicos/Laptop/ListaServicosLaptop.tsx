"use client";
import { useState } from "react";
import ItemListaServicosLaptop from "./itemListaServicosLaptop";
import "./listaservicoslaptop.css";
import { BiSolidLeftArrow } from "react-icons/bi";

const ListaServicosLaptop = () => {
  const [idAtivo, setIdAtivo] = useState("generico");
  const abrirJanela = (id: string) => {
    setIdAtivo(id);
  };

  return (
    <div className="flex gap-5 w-max-[1440px] max-md:hidden">
      <ul
        id="lista"
        className="flex flex-col justify-center items-center py-5 px-2 bg-white text-verde-claro font-subtitulos w-72 rounded-md"
      >
        <li
          onMouseEnter={() => abrirJanela("alergia")}
          onClick={() => abrirJanela("alergia")}
        >
          Alergia e Imunologia
        </li>
        <li
          onMouseEnter={() => abrirJanela("cirurgia")}
          onClick={() => abrirJanela("cirurgia")}
        >
          Cirurgia Pediátrica
        </li>
        <li
          onMouseEnter={() => abrirJanela("dermatologia")}
          onClick={() => abrirJanela("dermatologia")}
        >
          Dermatologia
        </li>
        <li
          onMouseEnter={() => abrirJanela("fisioterapia")}
          onClick={() => abrirJanela("fisioterapia")}
        >
          Fisioterapia
        </li>
        <li
          onMouseEnter={() => abrirJanela("fonoaudiologia")}
          onClick={() => abrirJanela("fonoaudiologia")}
        >
          Fonoaudiologia
        </li>
        <li
          onMouseEnter={() => abrirJanela("hebiatria")}
          onClick={() => abrirJanela("hebiatria")}
        >
          Hebiatria
        </li>
        <li
          onMouseEnter={() => abrirJanela("homeopatia")}
          onClick={() => abrirJanela("homeopatia")}
        >
          Homeopatia
        </li>
        <li
          onMouseEnter={() => abrirJanela("musicoterapia")}
          onClick={() => abrirJanela("musicoterapia")}
        >
          Musicoterapia
        </li>
        <li
          onMouseEnter={() => abrirJanela("neuropediatria")}
          onClick={() => abrirJanela("neuropediatria")}
        >
          Neuropediatria
        </li>
        <li
          onMouseEnter={() => abrirJanela("nutricao")}
          onClick={() => abrirJanela("nutricao")}
        >
          Nutrição
        </li>
        {/*         <li onMouseEnter={() => abrirJanela("ortopedia")}>Ortopedia</li>
         */}{" "}
        <li onMouseEnter={() => abrirJanela("osteopatia")}>Osteopatia</li>
        <li onMouseEnter={() => abrirJanela("pediatria")}>Pediatria</li>
        <li onMouseEnter={() => abrirJanela("psicologia")}>Psicologia</li>
        <li onMouseEnter={() => abrirJanela("neuropsicologia")}>
          Neuropsicologia
        </li>
        <li onMouseEnter={() => abrirJanela("neuropsicopedagogia")}>
          Neuropsicopedagogia
        </li>
        <li onMouseEnter={() => abrirJanela("psiquiatria")}>Psiquiatria</li>
        <li onMouseEnter={() => abrirJanela("terapia")}>Terapia Ocupacional</li>
      </ul>
      <div className={idAtivo !== "generico" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo={
            <span className="flex gap-5 items-center">
              <BiSolidLeftArrow /> Conheça os serviços do Espaço Alcançar
            </span>
          }
          descricao="Selecione uma área e conheça um pouco das áreas de atuação dos nossos profissionais. Dúvidas? Envie mensagem ou ligue para nós. Será sempre um prazer falar com você."
        />
      </div>
      <div className={idAtivo !== "alergia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Alergia e Imunologia"
          descricao="Nossos especialistas em Alergia e Imunologia, se dedicam ao estudo e tratamento de doenças alérgicas e problemas relacionados ao sistema imunológico em crianças. Nosso trabalho envolve o diagnóstico e a terapia de condições como asma, rinite alérgica, alergias alimentares e de pele, imunodeficiências primárias e secundárias, entre outros sintomas relacionados."
        />
      </div>
      <div className={idAtivo !== "cirurgia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Cirurgia Pediátrica"
          descricao="Nossos cirurgiões pediátricos são responsáveis pelo cuidado cirúrgico de recém-nascidos, lactentes, crianças e adolescentes. O trabalho abrange uma ampla gama de consultas, acompanhamentos e encaminhamentos, desde correções simples até cirurgias complexas, que visam garantir a saúde e o bem-estar de nossos pequenos pacientes."
        />
      </div>
      <div className={idAtivo !== "dermatologia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Dermatologia"
          descricao="Como dermatologistas pediátricos, cuidamos da saúde da pele, cabelos e unhas das crianças. Nossa especialidade abrange o diagnóstico e tratamento de mais de 3.000 doenças diferentes que afetam a pele das crianças, incluindo eczema, psoríase, câncer de pele e acne."
        />
      </div>
      <div className={idAtivo !== "fisioterapia" ? `hidden` : ""}>
        {" "}
        <ItemListaServicosLaptop
          titulo="Fisioterapia"
          descricao="Nossos fisioterapeutas trabalham para restaurar a mobilidade e a função em crianças que foram afetadas por lesões, doenças ou condições que afetam o sistema musculoesquelético. Utilizamos uma variedade de técnicas, incluindo exercícios terapêuticos, manipulação manual e uso de equipamentos especializados para ajudar nossos pequenos pacientes a alcançar seus objetivos de reabilitação."
        />
      </div>
      <div className={idAtivo !== "fonoaudiologia" ? `hidden` : ""}>
        {" "}
        <ItemListaServicosLaptop
          titulo="Fonoaudiologia"
          descricao="Nossos fonoaudiólogos ajudam principalmente crianças com dificuldades de comunicação. Trabalhamos com uma variedade de condições que afetam a fala, a linguagem, a voz e a deglutição. Nosso objetivo é melhorar a capacidade da criança de se comunicar efetivamente e comer de maneira segura e eficaz."
        />
      </div>
      <div className={idAtivo !== "hebiatria" ? `hidden` : ""}>
        {" "}
        <ItemListaServicosLaptop
          titulo="Hebiatria"
          descricao="Nossos hebiatras são especializados no atendimento a adolescentes. Eles lidam com uma ampla gama de questões, desde o desenvolvimento físico e emocional até problemas de saúde específicos dessa faixa etária. Eles estão preparados para oferecer um atendimento acolhedor e compreensivo, ajudando os adolescentes a navegar por essa fase complexa da vida."
        />
      </div>
      <div className={idAtivo !== "homeopatia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Homeopatia"
          descricao="Nossos homeopatas são especializados em uma abordagem holística e individualizada para o tratamento. Eles utilizam medicamentos homeopáticos que visam estimular a capacidade natural do corpo de se curar, considerando a pessoa como um todo - corpo, mente e espírito"
        />
      </div>
      <div className={idAtivo !== "musicoterapia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Musicoterapia"
          descricao="Nossos terapeutas usam a música como ferramenta terapêutica para ajudar crianças a expressar sentimentos, melhorar habilidades motoras e cognitivas, e promover o bem-estar emocional e social. Eles planejam e implementam sessões de musicoterapia que são personalizadas para atender às necessidades individuais de cada criança."
        />
      </div>
      <div className={idAtivo !== "arteterapia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Musicoterapia"
          descricao="Nossos terapeutas usam a arte-terapia para ajudar as crianças a expressar emoções de maneira não verbal. Através de atividades como pintura e desenho, as crianças exploram sentimentos, desenvolvem autoconsciência e lidam com o estresse. Esta abordagem lúdica e criativa promove a cura e o crescimento emocional."
        />
      </div>
      <div className={idAtivo !== "neuropediatria" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Neuropediatria"
          descricao="Nossos neuropediatras são especializados no diagnóstico e tratamento de doenças neurológicas em crianças. Eles lidam com uma variedade de condições, incluindo epilepsia, paralisia cerebral, distúrbios do movimento, doenças neuromusculares e muito mais. Eles trabalham em estreita colaboração com outros especialistas para fornecer um cuidado abrangente e coordenado."
        />
      </div>
      <div className={idAtivo !== "nutricao" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Nutrição"
          descricao="Nossos nutricionistas são especializados na avaliação das necessidades nutricionais das crianças e no fornecimento de orientações dietéticas personalizadas. Eles trabalham com crianças e suas famílias para promover hábitos alimentares saudáveis e prevenir ou tratar problemas nutricionais."
        />
      </div>
      {/*       <div className={idAtivo !== "ortopedia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Ortopedia"
          descricao="Nossos ortopedistas são especializados no diagnóstico e tratamento de doenças e lesões do sistema musculoesquelético em crianças. Eles lidam com uma variedade de condições, desde deformidades congênitas e lesões esportivas até doenças ósseas e articulares."
        />
      </div> */}
      <div className={idAtivo !== "osteopatia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Osteopatia"
          descricao="Nossos osteopatas usam uma abordagem holística para o cuidado da saúde das crianças. Eles se concentram no tratamento do corpo como um todo, usando manipulações manuais do sistema musculoesquelético para aliviar a dor, melhorar a função e promover a saúde geral."
        />
      </div>
      <div className={idAtivo !== "pediatria" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Pediatria"
          descricao="Nossos pediatras são médicos especializados no cuidado de saúde de recém-nascidos, lactentes, crianças e adolescentes. Seu trabalho abrange desde a prevenção e o tratamento de doenças comuns da infância até o acompanhamento do crescimento e desenvolvimento adequados."
        />
      </div>
      <div className={idAtivo !== "psicologia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Psicologia"
          descricao="Nossos psicólogos são especializados em entender, prevenir e tratar os problemas emocionais, sociais e de desenvolvimento das crianças. Eles usam uma variedade de técnicas terapêuticas para ajudar as crianças a lidar com questões como ansiedade, depressão, transtornos do espectro autista, dificuldades de aprendizagem e comportamento."
        />
      </div>
      <div className={idAtivo !== "neuropsicologia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Neuropsicologia"
          descricao="Nossos profissionais aplicam a neuropsicologia para entender como o cérebro e o comportamento estão relacionados. Esta ciência ajuda a identificar, diagnosticar e tratar condições neurológicas em crianças, melhorando sua qualidade de vida e desempenho cognitivo."
        />
      </div>
      <div className={idAtivo !== "neuropsicopedagogia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Neuropsicopedagogia"
          descricao="Nossos especialistas em neuropsicopedagogia trabalham para compreender a relação entre o cérebro, o aprendizado e o comportamento. Eles utilizam essa compreensão para desenvolver estratégias de ensino individualizadas que ajudam as crianças a superar desafios de aprendizado e alcançar seu potencial máximo."
        />
      </div>
      <div className={idAtivo !== "psiquiatria" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Psiquiatria"
          descricao="Nossos psiquiatras são médicos que se especializam no diagnóstico e tratamento de transtornos mentais em crianças. Eles têm uma compreensão profunda das doenças mentais e como elas afetam as crianças, e podem prescrever medicamentos quando necessário."
        />
      </div>
      <div className={idAtivo !== "terapia" ? `hidden` : ""}>
        <ItemListaServicosLaptop
          titulo="Terapia Ocupacional"
          descricao="Nossos terapeutas ocupacionais pediátricos ajudam as crianças a desenvolver as habilidades necessárias para realizar as atividades diárias. Eles trabalham com crianças que têm uma variedade de condições, incluindo atrasos no desenvolvimento, deficiências físicas e problemas sensoriais."
        />
      </div>
    </div>
  );
};

export default ListaServicosLaptop;
