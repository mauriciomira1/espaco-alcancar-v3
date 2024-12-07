"use client";
import config from "@/app/config/variables";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Notification from "../../dashboard/profile/notification";
import { FaArrowLeft, FaCheck, FaPencilAlt } from "react-icons/fa";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  phone: string;
  birth: string;
  registerNumber: string;
  occupation: string;
};

interface ProfileType {
  patient: boolean;
  professional: boolean;
  admin: boolean;
}

interface ProfessionalDashboardResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  active: boolean;
  birth: string;
  registerNumber: string;
  occupation: string;
  profileType: ProfileType;
}

const ProfessionalProfilePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    birth: "",
    registerNumber: "",
    occupation: "",
  });
  const [professionalData, setProfessionalData] =
    useState<ProfessionalDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({ visible: false, message: "", type: "success" });

  const router = useRouter();
  const token = localStorage.getItem("professional-espaco-alcancar");

  const fieldLabels = {
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    birth: "Data de Nascimento",
    registerNumber: "Registro no Conselho",
    occupation: "Ocupação",
  };

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        if (!token) {
          setError("Token não encontrado");
          router.push("/login-professional");
          return;
        }

        const response = await fetch(`${config.apiBaseUrl}/professional/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          router.push("/login-professional");
          setError("Token inválido");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          setError(
            "Erro ao buscar dados do profissional: " + errorData.message
          );
          return;
        }

        const data: ProfessionalDashboardResponse = await response.json();
        setProfessionalData(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          birth: data.birth || "",
          registerNumber: data.registerNumber || "",
          occupation: data.occupation || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setError("Failed to fetch user data: " + (error as Error).message);
      }
    };

    if (token) {
      fetchProfessionalData();
    } else {
      router.push("/login");
    }
  }, [token, router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (field: keyof typeof fieldLabels) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/professional/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birth: formData.birth,
          registerNumber: formData.registerNumber,
          occupation: formData.occupation,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedData: ProfessionalDashboardResponse = await response.json();
      setProfessionalData(updatedData);
      setIsEditing((prevState) => ({
        ...prevState,
        [field]: false,
      }));
      setNotification({
        visible: true,
        message: `O dado de ${fieldLabels[field]} foi atualizado`,
        type: "success",
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      setNotification({
        visible: true,
        message: "Erro ao atualizar os dados.",
        type: "error",
      });
    }
  };

  const toggleEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const labelClassesName = `font-subtitulos text-sm whitespace-nowrap`;
  const paragraphClassesName = `font-paragrafos pb-1 text-sm`;
  const inputClassesName = `font-paragrafos text-sm bg-gray-200 rounded-md border-[1px] border-gray-400 px-2 py-0.5 w-full`;
  const divClassesName = `flex space-y-1 items-center gap-1`;
  const pencilClassesName = `text-gray-500 text-xs`;
  const saveBtnClassesName = `bg-verde-escuro text-white h-6 font-paragrafos text-xs rounded-md px-2 py-0.5`;

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="w-full h-screen bg-white p-4">
      <Link
        href="/professional/dashboard"
        className="flex items-center justify-center bg-verde-escuro text-white mb-8 w-20 rounded-md p-1"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <form className="space-y-2">
        {/* Nome do profissional */}
        <div className={divClassesName}>
          <label htmlFor="name" className={labelClassesName}>
            Nome:
          </label>
          <div className="flex space-x-2">
            {isEditing.name ? (
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>{formData.name}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("name")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.name && (
              <button
                type="button"
                onClick={() => handleUpdate("name")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>

        {/* N° de telefone */}
        <div className={divClassesName}>
          <label htmlFor="phone" className={labelClassesName}>
            Telefone:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.phone ? (
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>{formData.phone}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("phone")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.phone && (
              <button
                type="button"
                onClick={() => handleUpdate("phone")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>

        {/* Data de Nascimento */}
        <div className={divClassesName}>
          <label htmlFor="birth" className={labelClassesName}>
            D. Nasc.:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.birth ? (
              <input
                type="date"
                id="birth"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>
                {formatDate(formData.birth)}
              </p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("birth")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.birth && (
              <button
                type="button"
                onClick={() => handleUpdate("birth")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>

        {/* N° de registro */}
        <div className={divClassesName}>
          <label htmlFor="registerNumber" className={labelClassesName}>
            N° de Registro:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.registerNumber ? (
              <input
                type="text"
                id="registerNumber"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>{formData.registerNumber}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("registerNumber")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.registerNumber && (
              <button
                type="button"
                onClick={() => handleUpdate("registerNumber")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>

        {/* Área de atuação */}
        <div className={divClassesName}>
          <label htmlFor="occupation" className={labelClassesName}>
            Área de atuação:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.occupation ? (
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>{formData.occupation}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("occupation")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.occupation && (
              <button
                type="button"
                onClick={() => handleUpdate("occupation")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Notificação de "alteração com sucesso" */}
      {notification.visible && (
        <Notification
          message={notification.message}
          duration={2000}
          onClose={() =>
            setNotification({ visible: false, message: "", type: "success" })
          }
          type={notification.type}
        />
      )}
    </div>
  );
};

export default ProfessionalProfilePage;
