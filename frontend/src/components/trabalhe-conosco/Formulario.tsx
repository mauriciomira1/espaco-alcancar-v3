/* const Formulario = () => {
  return (
    <form>
      <label htmlFor="nome">Nome</label>
      <br />
      <input type="text" id="nome" required />
      <br />
      <hr />

      <label htmlFor="email">E-mail</label>
      <br />
      <input type="email" name="" value="<EMAIL>" />
      <br />
      <hr />

      <label htmlFor="telefone">Telefone/Whatsapp</label>
      <br />
      <input
        type="tel"
        pattern="[0-9]{2}[9][1-9]{8}"
        placeholder="(xx) xxxxxx -
      xxx"
      />
      <br />
      <hr />

      <textarea rows={5} cols={30} required>
        Escreva aqui sua mensagem...
      </textarea>

      <button className="btn btn--primary">Enviar Mensagem</button>
    </form>
  );
}; */
"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./formulario.css";
import { ChangeEvent, useState } from "react";

/* interface DataProps {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
} */

const schema = z.object({
  nome: z
    .string()
    .min(1, { message: "O nome é obrigatório." })
    // Transformando primeira letra do Nome e Sobrenome em maiúscula ao enviar dados
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .email({ message: "E-mail inválido." })
    .min(1, "Você precisa inserir o seu e-mail.")
    .toLowerCase(),
  telefone: z
    .string()
    .refine((value) => /^\(\d{2}\) \d{5}-\d{4}$/.test(value), {
      message: "Informe um número de telefone no formato (XX) XXXXX-XXXX",
    }),
  profissao: z.string().min(1, { message: "Informe sua profissão" }),
  curriculo: z.any(),
});

// Criando um typeof para evitar o erro em 'errors' dentro do return
type criarCandidatoFormData = z.infer<typeof schema>;

const Formulario = () => {
  const [telefone, setTelefone] = useState("");
  // Formatando número durante digitação para: (XX) XXXXX-XXXX
  const formatarTelefone = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    setTelefone(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<criarCandidatoFormData>({
    resolver: zodResolver(schema),
  });

  const candidato = (user: any) => console.log(user);

  return (
    <>
      <form
        onSubmit={handleSubmit(candidato)}
        className="flex flex-col px-5 bg-pessego rounded-2xl font-paragrafos gap-4 items-start w-full py-16"
        style={{ boxShadow: "inset -2px 0px 3px 3px rgba(0,0,0,0.1)" }}
      >
        <h1 className="text-white font-destaque text-destaque">
          Faça parte da nossa equipe!
        </h1>
        <div className="flex flex-col w-full">
          <label htmlFor="nome" className="text-xs text-white">
            Nome completo:
          </label>
          <input
            {...register("nome")}
            className="focus:ring-0 focus:outline-verde-claro rounded w-full px-2 py-1.5 text-sm"
            placeholder="Seu nome completo"
          />
          {errors?.nome && <span>{errors.nome.message}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="email" className="text-xs text-white">
            E-mail (opcional):
          </label>
          <input
            {...register("email")}
            className="focus:ring-0 focus:outline-verde-claro rounded w-full px-2 py-1.5 text-sm"
            placeholder="meu@email.com.br"
          />
          {errors?.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="telefone" className="text-xs text-white">
            Telefone/Whatsapp (opcional):
          </label>
          <input
            {...register("telefone")}
            className="focus:ring-0 focus:outline-verde-claro rounded w-full px-2 py-1.5 text-sm"
            placeholder="(XX) XXXXX-XXXX"
            onChange={formatarTelefone}
            value={telefone}
          />
          {errors?.telefone && <span>{errors.telefone.message}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="profissao" className="text-xs text-white">
            Profissão
          </label>
          <input
            {...register("profissao")}
            className="focus:ring-0 focus:outline-verde-claro rounded w-full px-2 py-1.5 text-sm"
            placeholder="Insira sua profissão"
          />
          {errors?.profissao && <span>{errors.profissao.message}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="curriculo" className="text-xs text-white">
            Envie seu currículo em PDF:
          </label>
          <input
            type="file"
            name="curriculo"
            id="curriculo"
            className="text-sm"
          />
        </div>

        <input
          type="submit"
          className="bg-white text-pessego px-8 py-1 rounded-md font-titulos hover:opacity-80 duration-100 active:opacity-60"
          value="Enviar"
        />
      </form>
    </>
  );
};
export default Formulario;
