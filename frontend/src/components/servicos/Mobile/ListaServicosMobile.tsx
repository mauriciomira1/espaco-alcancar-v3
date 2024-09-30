"use client";
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import "./listaServicosMobile.css";
import ItemMobile from "./ItemMobile";

const ListaServicosMobile = () => {
  return (
    <div className="md:hidden w-full">
      <Splide
        hasTrack={false}
        aria-label="..."
        options={{
          rewind: true,
          gap: 30,
          pagination: false,
        }}
      >
        <div className="custom-wrapper">
          <SplideTrack>
            <SplideSlide>
              <ItemMobile
                titulo="Alergia e Imunologia"
                descricao="Nossos especialistas em Alergia e Imunologia, se dedicam ao estudo e tratamento de doenças alérgicas e problemas relacionados ao sistema imunológico em crianças. Nosso trabalho envolve o diagnóstico e a terapia de condições como asma, rinite alérgica, alergias alimentares e de pele, imunodeficiências primárias e secundárias, entre outros sintomas relacionados."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Cirurgia Pediátrica"
                descricao="Nossos cirurgiões pediátricos são responsáveis pelo cuidado cirúrgico de recém-nascidos, lactentes, crianças e adolescentes. O trabalho abrange uma ampla gama de consultas, acompanhamentos e encaminhamentos, desde correções simples até cirurgias complexas, que visam garantir a saúde e o bem-estar de nossos pequenos pacientes."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Dermatologia"
                descricao="Como dermatologistas pediátricos, cuidamos da saúde da pele, cabelos e unhas das crianças. Nossa especialidade abrange o diagnóstico e tratamento de mais de 3.000 doenças diferentes que afetam a pele das crianças, incluindo eczema, psoríase, câncer de pele e acne."
              />
            </SplideSlide>

            <SplideSlide>
              <ItemMobile
                titulo="Fisioterapia"
                descricao="Nossos fisioterapeutas trabalham para restaurar a mobilidade e a função em crianças que foram afetadas por lesões, doenças ou condições que afetam o sistema musculoesquelético. Utilizamos uma variedade de técnicas, incluindo exercícios terapêuticos, manipulação manual e uso de equipamentos especializados para ajudar nossos pequenos pacientes a alcançar seus objetivos de reabilitação."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Fonoaudiologia"
                descricao="Nossos fonoaudiólogos ajudam principalmente crianças com dificuldades de comunicação. Trabalhamos com uma variedade de condições que afetam a fala, a linguagem, a voz e a deglutição. Nosso objetivo é melhorar a capacidade da criança de se comunicar efetivamente e comer de maneira segura e eficaz."
              />
            </SplideSlide>

            <SplideSlide>
              <ItemMobile
                titulo="Hebiatria"
                descricao="Nossos hebiatras são especializados no atendimento a adolescentes. Eles lidam com uma ampla gama de questões, desde o desenvolvimento físico e emocional até problemas de saúde específicos dessa faixa etária. Eles estão preparados para oferecer um atendimento acolhedor e compreensivo, ajudando os adolescentes a navegar por essa fase complexa da vida."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Homeopatia"
                descricao="Nossos homeopatas são especializados em uma abordagem holística e individualizada para o tratamento. Eles utilizam medicamentos homeopáticos que visam estimular a capacidade natural do corpo de se curar, considerando a pessoa como um todo - corpo, mente e espírito"
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Musicoterapia"
                descricao="Nossos terapeutas usam a música como ferramenta terapêutica para ajudar crianças a expressar sentimentos, melhorar habilidades motoras e cognitivas, e promover o bem-estar emocional e social. Eles planejam e implementam sessões de musicoterapia que são personalizadas para atender às necessidades individuais de cada criança."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Arteterapia"
                descricao="Nossos terapeutas usam a arteterapia para ajudar as crianças a expressar emoções de maneira não verbal. Através de atividades como pintura e desenho, as crianças exploram sentimentos, desenvolvem autoconsciência e lidam com o estresse. Esta abordagem lúdica e criativa promove a cura e o crescimento emocional."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Neuropediatria"
                descricao="Nossos neuropediatras são especializados no diagnóstico e tratamento de doenças neurológicas em crianças. Eles lidam com uma variedade de condições, incluindo epilepsia, paralisia cerebral, distúrbios do movimento, doenças neuromusculares e muito mais. Eles trabalham em estreita colaboração com outros especialistas para fornecer um cuidado abrangente e coordenado."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Nutrição"
                descricao="Nossos nutricionistas são especializados na avaliação das necessidades nutricionais das crianças e no fornecimento de orientações dietéticas personalizadas. Eles trabalham com crianças e suas famílias para promover hábitos alimentares saudáveis e prevenir ou tratar problemas nutricionais."
              />
            </SplideSlide>
            {/*             <SplideSlide>
              <ItemMobile
                titulo="Ortopedia"
                descricao="Nossos ortopedistas são especializados no diagnóstico e tratamento de doenças e lesões do sistema musculoesquelético em crianças. Eles lidam com uma variedade de condições, desde deformidades congênitas e lesões esportivas até doenças ósseas e articulares."
              />
            </SplideSlide> */}
            <SplideSlide>
              <ItemMobile
                titulo="Osteopatia"
                descricao="Nossos osteopatas usam uma abordagem holística para o cuidado da saúde das crianças. Eles se concentram no tratamento do corpo como um todo, usando manipulações manuais do sistema musculoesquelético para aliviar a dor, melhorar a função e promover a saúde geral."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Pediatria"
                descricao="Nossos pediatras são médicos especializados no cuidado de saúde de recém-nascidos, lactentes, crianças e adolescentes. Seu trabalho abrange desde a prevenção e o tratamento de doenças comuns da infância até o acompanhamento do crescimento e desenvolvimento adequados."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Psicologia"
                descricao="Nossos psicólogos são especializados em entender, prevenir e tratar os problemas emocionais, sociais e de desenvolvimento das crianças. Eles usam uma variedade de técnicas terapêuticas para ajudar as crianças a lidar com questões como ansiedade, depressão, transtornos do espectro autista, dificuldades de aprendizagem e comportamento."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Neuropsicologia"
                descricao="Nossos neuropsicólogos aplicam a neuropsicologia para entender como o cérebro e o comportamento estão relacionados. Esta ciência ajuda a identificar, diagnosticar e tratar condições neurológicas em crianças, melhorando sua qualidade de vida e desempenho cognitivo."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Neuropsicopedagogia"
                descricao="Nossos especialistas em neuropsicopedagogia trabalham para compreender a relação entre o cérebro, o aprendizado e o comportamento. Eles utilizam essa compreensão para desenvolver estratégias de ensino individualizadas que ajudam as crianças a superar desafios de aprendizado e alcançar seu potencial máximo."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Psiquiatria"
                descricao="Nossos psiquiatras são médicos que se especializam no diagnóstico e tratamento de transtornos mentais em crianças. Eles têm uma compreensão profunda das doenças mentais e como elas afetam as crianças, e podem prescrever medicamentos quando necessário."
              />
            </SplideSlide>
            <SplideSlide>
              <ItemMobile
                titulo="Terapia Ocupacional"
                descricao="Nossos terapeutas ocupacionais pediátricos ajudam as crianças a desenvolver as habilidades necessárias para realizar as atividades diárias. Eles trabalham com crianças que têm uma variedade de condições, incluindo atrasos no desenvolvimento, deficiências físicas e problemas sensoriais."
              />
            </SplideSlide>
          </SplideTrack>

          {/*           <div className="splide__arrows" /> */}
        </div>
      </Splide>
    </div>
  );
};

export default ListaServicosMobile;
