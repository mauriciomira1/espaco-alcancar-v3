// Bibliotecas instaladas: zod @hookform/resolvers react-hook-form
"use client";

// CSS
import styles from "./FormularioCadastro.module.css";

// Hooks do next
import { useState } from "react";

// Ícones
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Hooks de formulário
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import config from "@/app/config/variables";
import { useRouter } from "next/navigation";
import { Link } from "react-router-dom";

// Validação de formulário com Zod
const createUserFormSchema = z
  .object({
    fullname: z
      .string()
      .min(12, "O nome deve ter pelo menos 12 caracteres.")
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
      .min(1, "Você precisa inserir o seu e-mail.")
      .email("Formato de e-mail inválido")
      .toLowerCase(),
    phone: z
      .string()
      .min(1, "Você precisa inserir um número de celular.")
      .refine((phone) => phone.length === 14, {
        message: "Insira um número válido com DDD. Por exemplo: (61)12345-1234",
      }),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string(),
    relationship: z.enum(["FATHER", "MOTHER", "OTHER"], {
      errorMap: () => ({
        message: "Você precisa selecionar um grau de parentesco.",
      }),
    }),
  })
  // Verificando se o campo e senha e 'confirme a senha' são coincidentes
  .refine((val) => val.password === val.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

// Criando um typeof para evitar o erro em 'errors' dentro do return
type createUserFormData = z.infer<typeof createUserFormSchema>;

const FormularioCadastro = () => {
  const router = useRouter();

  // register (usado para validar os inputs); handleSubmit (usado para enviar o Form); formState (usado para emitir a mensagem do erro)
  const {
    register,
    handleSubmit,
    formState: { errors }, //desestruturando 'errors' para inseri-los na tela em um <span>
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  // Estado para armazenar a mensagem de erro
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado para controlar a exibição da mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState(false);

  // Função que executa a requisição para o cadastro
  const createUser = async (data: createUserFormData) => {
    const payload = {
      name: data.fullname,
      email: data.email,
      phone: data.phone.replace(/\D/g, ""), // Remover formatação do telefone
      password: data.password,
      relationship: data.relationship,
      address: {
        address: "Área Especial 01",
        city: "Gama/DF",
        complement: "601D, Flex Gama",
      },
      profileType: {
        patient: true,
        professional: false,
        admin: false,
      },
    };

    console.log("Payload: ", payload);
    try {
      const response = await fetch(`http://localhost:8080/user/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullname,
          email: data.email,
          phone: data.phone,
          password: data.password,
          relationship: data.relationship,
          address: {
            address: "",
            city: "",
            complement: "",
          },
          profileType: {
            patient: true,
            professional: false,
            admin: false,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Falha no cadastro. Tente novamente."
        );
        return;
      }

      const userId = await response.json();
      console.log("Cadastro bem-sucedido:", userId);

      // Redirecionar o usuário para a página de login
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      setErrorMessage("Erro ao fazer cadastro. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      {successMessage ? (
        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white px-10 py-8">
          <h2 className="font-titulos text-xl font-bold text-gray-900">
            Conta criada com sucesso. Faça login.
          </h2>
        </div>
      ) : (
        <form
          className="flex w-11/12 max-w-7xl flex-col items-center justify-center rounded-xl bg-white px-10 py-8 max-sm:px-8 md:w-[26rem]"
          onSubmit={handleSubmit(createUser)}
        >
          <h2 className="font-titulos text-xl font-bold text-gray-900">
            Bem-vindo
          </h2>

          <p className="mb-5 font-titulos text-xs font-semibold text-verde-claro">
            Cadastre-se para ter acesso aos recursos para pacientes.
          </p>

          {/*       <button
        className="hover:border-gray-40000 flex w-11/12 items-center justify-center gap-2 rounded border border-gray-300 bg-white px-2 py-1.5 font-titulos text-sm font-semibold duration-150 hover:bg-gray-200 active:bg-gray-300"
        onClick={handleLoginWithGoogle}
      >
        <span className="text-lg">
          <FcGoogle />
        </span>
        Cadastrar com Google
      </button> */}

          <div className="flex flex-col my-1.5 mt-4 w-full">
            <label
              htmlFor="fullname"
              className="font-titulos text-xs text-primaryColor font-bold"
            >
              Nome completo
            </label>
            <input
              id="fullname"
              type="text"
              className="text-sm border-gray-300 focus:outline-blue-600 px-1.5 contrast-more:border-primaryColor w-full h-8 bg-white border rounded hover:bg-gray-100 hover:border-gray-400 duration-150"
              {...register("fullname")}
            />
            {errors.fullname && (
              <span className={styles.errorMessage}>
                {errors.fullname.message}
              </span>
            )}
          </div>

          <div className="flex flex-col my-1.5 w-full">
            <label
              htmlFor="email"
              className="font-titulos text-xs text-primaryColor font-bold"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="text-sm border-gray-300 focus:outline-blue-600 px-1.5 contrast-more:border-primaryColor w-full h-8 bg-white border rounded hover:bg-gray-100 hover:border-gray-400 duration-150"
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col my-1.5 w-full">
            <label
              htmlFor="phone"
              className="font-titulos text-xs text-primaryColor font-bold"
            >
              Celular
            </label>
            <input
              id="phone"
              type="text"
              maxLength={14}
              className="text-sm border-gray-300 focus:outline-blue-600 px-1.5 contrast-more:border-primaryColor w-full h-8 bg-white border rounded hover:bg-gray-100 hover:border-gray-400 duration-150"
              {...register("phone")}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                const formattedValue = value
                  .replace(/^(\d{2})(\d)/g, "($1)$2")
                  .replace(/(\d)(\d{4})$/, "$1-$2");
                e.target.value = formattedValue;
              }}
              onBeforeInput={(e) => {
                const inputEvent = e as unknown as InputEvent;
                if (!/[0-9]/.test(inputEvent.data || "")) {
                  inputEvent.preventDefault();
                }
              }}
            />
            {errors.phone && (
              <span className={styles.errorMessage}>
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="flex flex-col my-1.5 w-full">
            <label
              htmlFor="relationship"
              className="font-titulos text-xs text-primaryColor font-bold"
            >
              Grau de Parentesco
            </label>
            <select
              id="relationship"
              className="font-titulos text-xs text-primaryColor font-bold border-gray-300 border rounded-sm p-1.5"
              {...register("relationship")}
              required
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="FATHER">Pai</option>
              <option value="MOTHER">Mãe</option>
              <option value="OTHER">Outro</option>
            </select>
            {errors.relationship && (
              <span className={styles.errorMessage}>
                {errors.relationship.message}
              </span>
            )}
          </div>

          <div className="flex flex-col my-1.5 w-full relative">
            <label
              htmlFor="password"
              className="font-titulos text-xs text-primaryColor font-bold"
            >
              Senha
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="on"
              className="text-sm border-gray-300 focus:outline-blue-600 px-1.5 contrast-more:border-primaryColor w-full h-8 bg-white border rounded hover:bg-gray-100 hover:border-gray-400 duration-150"
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
            <button
              type="button"
              className="absolute pt-4 right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEye color="#9D9D9D" />
              ) : (
                <FaEyeSlash color="#9D9D9D" />
              )}
            </button>
          </div>

          <div className="flex flex-col my-1.5 w-full relative">
            <label
              htmlFor="confirmPassword"
              className="font-titulos text-xs text-primaryColor font-bold"
            >
              Confirme a Senha
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="on"
              className="text-sm border-gray-300 focus:outline-blue-600 px-1.5 contrast-more:border-primaryColor w-full h-8 bg-white border rounded hover:bg-gray-100 hover:border-gray-400 duration-150"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </span>
            )}
            <button
              type="button"
              className="absolute pt-4 right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEye color="#9D9D9D" />
              ) : (
                <FaEyeSlash color="#9D9D9D" />
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="mb-1 text-red-500 font-semibold text-sm">
              {errorMessage}
            </div>
          )}

          <div className="flex items-start w-full my-2">
            <button
              type="submit"
              className="font-titulos text-xs font-semibold text-white bg-verde-claro rounded py-2 px-6 hover:bg-verde-escuro duration-150 active:bg-sky-950"
            >
              Cadastrar
            </button>
          </div>
          <p className="mt-3 cursor-default font-paragrafos text-sm font-semibold text-primaryColor">
            Já tem uma conta?
            <Link
              to="/login"
              className="ml-1 font-bold text-secondaryColor hover:text-orange-800"
            >
              Faça login aqui
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default FormularioCadastro;
