import "./globals.css";

import Capa from "@/components/home/Capa/Capa";
import Container01 from "@/components/home/Container01/Container01";
import Container02 from "@/components/home/Container02/Container02";
import Container03 from "@/components/home/Container03/Container03";
import Container04 from "@/components/home/Container04/Container04";
import Container05 from "@/components/home/Container05/Container05";

export default function Home() {
  return (
    <main>
      <Capa />
      <Container01 />
      <Container02 />
      <Container03 />
      <Container04 />
      <Container05 />
    </main>
  );
}
