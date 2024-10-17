"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";

// Fotos do carrossel
import Photo01 from "@/../public/home/fotos-clinica/1.jpg";
import Photo02 from "@/../public/home/fotos-clinica/2.jpg";
import Photo03 from "@/../public/home/fotos-clinica/3.jpg";
import Photo04 from "@/../public/home/fotos-clinica/4.jpg";
import Photo05 from "@/../public/home/fotos-clinica/5.jpg";
import Photo06 from "@/../public/home/fotos-clinica/6.jpg";
import Photo07 from "@/../public/home/fotos-clinica/7.jpg";
import Photo08 from "@/../public/home/fotos-clinica/8.jpg";
import Photo09 from "@/../public/home/fotos-clinica/9.jpg";
import Photo10 from "@/../public/home/fotos-clinica/10.jpg";
import Photo11 from "@/../public/home/fotos-clinica/11.jpg";
import ItemCarrossel from "./ItemCarrossel";

const Carrossel = () => {
  return (
    <Splide
      aria-label="Conheça as salas e espaços da clínica"
      options={{
        rewind: true,
        autoHeight: true,
        focus: 0,
        gap: "2rem",
      }}
    >
      <ItemCarrossel
        foto={Photo01}
        altFoto="Clínica temática"
        descricao="O Espaço Alcançar carrega a temática de astronauta, com o slogan Mire as Estrelas, para mostrar aos nossos pacientes que o limite é do tamanho dos seus sonhos. Voem alto e sejam grandes."
      />
      <ItemCarrossel
        foto={Photo02}
        altFoto="Sala interativa"
        descricao="Sala interativa com diversos recuros inovadores, utilizando luzes, sons e outros efeitos sonoros e visuais."
      />
      <ItemCarrossel
        foto={Photo03}
        altFoto="Sala de consultoria para os pais"
        descricao="Uma aconchegante sala para consulta de pais e amamentação."
      />
      <ItemCarrossel
        foto={Photo04}
        altFoto="Consultório 02"
        descricao="Consultórios arejados, climatizados e temáticos, carregando o tema da clínica."
      />
      <ItemCarrossel
        foto={Photo05}
        altFoto="Atividade de vida diária"
        descricao="Atividades de vida diária também são tratadas no Espaço Alcançar."
      />
      <ItemCarrossel
        foto={Photo06}
        altFoto="Sala de descanso dos pais/responsáveis"
        descricao="Uma sala climatizada que possui TV, poltronas bem confortáveis, WiFi e mesa para notebook. Tudo pensado para um conforto completo dos pais enquanto aguarda-se os filhos que estão em atendimento."
      />
      <ItemCarrossel
        foto={Photo07}
        altFoto="Recursos em Terapia Ocupacional"
        descricao="Diversos recursos em Terapia Ocupacional tais como balanço, tirolesa, escalada, piscina de bolinhas, malha sensorial e com integração sensorial."
      />
      <ItemCarrossel
        foto={Photo08}
        altFoto="Sanitários"
        descricao="Banheiros sempre limpos e cheirosos."
      />
      <ItemCarrossel foto={Photo09} altFoto="Recepção" descricao="" />
      <ItemCarrossel
        foto={Photo10}
        altFoto="Sala para terapia snoezelen"
        descricao="Sala interativa com diversos recuros inovadores, utilizando luzes, sons e outros efeitos sonoros e visuais."
      />
      <ItemCarrossel
        foto={Photo11}
        altFoto="Escalada"
        descricao="O avanço do seu filho começa aqui no Espaço Alcançar. Venha fazer uma visita e conheça nosso espaço e recursos."
      />
    </Splide>
  );
};

export default Carrossel;

// Uma sala com TV, poltronas bem confortáveis, WiFi e mesa para notebook. Tudo pensado para um conforto completo dos pais enquanto aguarda-se os filhos que estão em atendimento.
