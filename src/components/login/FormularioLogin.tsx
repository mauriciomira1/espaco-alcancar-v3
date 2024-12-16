// Bibliotecas instaladas: zod @hookform/resolvers react-hook-form
"use client";

// CSS
import styles from "./FormularioLogin.module.css";

// Hooks de formulário
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

// Ícones
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Variáveis
import config from "@/app/config/variables";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

// Validação de formulário com Zod
const createUserFormSchema = z.object({
  email: z
    .string()
    .min(1, "Você precisa inserir o seu e-mail.")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  password: z.string().min(6, "Você precisa inserir uma senha."),
});

// Criando um typeof para evitar o erro em 'errors' dentro do return
type loginUserFormData = z.infer<typeof createUserFormSchema>;

const FormularioLogin: React.FC = () => {
  // register (usado para validar os inputs); handleSubmit (usado para enviar o Form); formState (usado para emitir a mensagem do erro)
  const {
    register,
    handleSubmit,
    formState: { errors }, //desestruturando 'errors' para inseri-los na tela em um <span>
  } = useForm<loginUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  // Estado para armazenar a mensagem de erro
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para controlar o estado de carregamento
  const [loading, setLoading] = useState(false);

  // Função que executa a requisição para o login
  const loginUser = async (data: loginUserFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.status === 401) {
        setErrorMessage("Email ou senha incorretos.");
        return;
      }

      if (!response.ok) {
        throw new Error("Falha no login. Verifique suas credenciais.");
      }

      const result = await response.json();
      localStorage.setItem("espaco-alcancar", result.token);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMessage("Erro ao fazer login. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex w-11/12 max-w-7xl md:w-[26rem] max-sm:w-11/12 flex-col items-center justify-center rounded-xl bg-white px-10 py-8 max-sm:px-8 "
      onSubmit={handleSubmit(loginUser)}
    >
      <h2 className="font-titulos text-xl font-bold text-gray-900">
        Bem-vindo
      </h2>

      <p className="mb-5 font-titulos text-xs font-semibold text-verde-claro">
        Faça login para ter acesso aos recursos para pacientes.
      </p>

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
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
        {errorMessage && (
          <div className="mb-1 text-red-500 font-semibold text-sm">
            {errorMessage}
          </div>
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
          <span className={styles.errorMessage}>{errors.password.message}</span>
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

      <div className="flex items-start w-full my-2">
        <div className="flex items-start w-full my-2">
          <button
            type="submit"
            className="mt-4 w-full h-10 bg-verde-claro text-white font-bold rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Entrar"
            )}
          </button>
        </div>
      </div>
      {/*       <a
        className="hover:border-gray-40000 flex w-full items-center justify-center gap-2 rounded border border-gray-300 bg-white py-2 font-text text-sm font-semibold duration-150 hover:bg-gray-200 active:bg-gray-300 mb-3"
        href={`${config.apiBaseUrl}/oauth2/authorization/google`}
      >
        <span className="mr-2">
          <FcGoogle size={24} />
        </span>
        Login com Google
      </a> */}

      <p className="mt-3 cursor-default font-paragrafos text-xs font-semibold text-primaryColor">
        Ainda não tem cadastro?
        <Link
          href="/cadastro"
          className="ml-1 font-bold text-secondaryColor text-verde-claro hover:text-orange-800"
        >
          Cadastre-se aqui.
        </Link>
      </p>
    </form>
  );
};

export default FormularioLogin;
