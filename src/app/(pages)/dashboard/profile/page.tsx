"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaPencilAlt } from "react-icons/fa";
import config from "@/app/config/variables";
import Notification from "./notification";
import Childs from "./childs";

type FormData = {
  name: string;
  email: string;
  phone: string;
  relationship: string;
  address: {
    address: string;
    city: string;
    complement: string;
  };
  profileType: {
    patient: boolean;
    professional: boolean;
    admin: boolean;
  };
};

interface UserDashboardResponse {
  name: string;
  email: string;
  phone: string;
  relationship: string;
  address: {
    address: string;
    city: string;
    complement: string;
  };
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    relationship: "",
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
  });

  const [userData, setUserData] = useState<UserDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({ visible: false, message: "", type: "success" });

  const navigate = useNavigate();
  const token = localStorage.getItem("espaco-alcancar");

  const relationshipOptions = {
    FATHER: "Pai",
    MOTHER: "Mãe",
    OTHER: "Outro",
  };

  const fieldLabels = {
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    relationship: "Relacionamento",
    address: "Endereço",
    city: "Cidade",
    complement: "Complemento",
    patient: "Paciente",
    professional: "Profissional",
    admin: "Admin",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("Token não encontrado");
          setError("Token não encontrado");
          navigate("/login");
          return;
        }

        const userResponse = await fetch(`${config.apiBaseUrl}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.status !== 200) {
          navigate("/login");
          return;
        }

        const userData = await userResponse.json();
        setUserData(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          relationship: userData.relationship || "",
          address: {
            address: userData.address?.address || "",
            city: userData.address?.city || "",
            complement: userData.address?.complement || "",
          },
          profileType: {
            patient: userData.profileType?.patient || false,
            professional: userData.profileType?.professional || false,
            admin: userData.profileType?.admin || false,
          },
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setError("Failed to fetch user data: " + (error as Error).message);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (field: keyof typeof fieldLabels) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/user/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("espaco-alcancar")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          relationship: formData.relationship,
          address: {
            address: formData.address.address,
            city: formData.address.city,
            complement: formData.address.complement,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const updatedData = await response.json();
      setUserData(updatedData);
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

  const labelClassesName = `font-subtitulos text-sm`;
  const paragraphClassesName = `font-paragrafos pb-1 text-sm`;
  const inputClassesName = `font-paragrafos text-sm bg-gray-200 rounded-md border-[1px] border-gray-400 px-2 py-0.5`;
  const divClassesName = `flex space-y-1 items-center gap-1`;
  const pencilClassesName = `text-gray-500 text-xs`;
  const saveBtnClassesName = `bg-verde-escuro text-white h-6 font-paragrafos text-xs rounded-md px-2 py-0.5`;

  return (
    <div className="w-full h-screen bg-white p-4">
      <Link
        to="/dashboard"
        className="flex items-center justify-center bg-verde-escuro text-white mb-8 w-20 rounded-md p-1"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <form className="space-y-2">
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
        <div className={divClassesName}>
          <label htmlFor="city" className={labelClassesName}>
            Cidade:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.city ? (
              <input
                type="text"
                id="city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>{formData.address.city}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("city")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.city && (
              <button
                type="button"
                onClick={() => handleUpdate("city")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>
        <div className={divClassesName}>
          <label htmlFor="address" className={labelClassesName}>
            Endereço:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.address ? (
              <input
                type="text"
                id="address"
                name="address.address"
                value={formData.address.address}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>{formData.address.address}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("address")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.address && (
              <button
                type="button"
                onClick={() => handleUpdate("address")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>
        <div className={divClassesName}>
          <label htmlFor="complement" className={labelClassesName}>
            Complemento:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.complement ? (
              <input
                type="text"
                id="complement"
                name="address.complement"
                value={formData.address.complement}
                onChange={handleChange}
                className={inputClassesName}
              />
            ) : (
              <p className={paragraphClassesName}>
                {formData.address.complement}
              </p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("complement")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.complement && (
              <button
                type="button"
                onClick={() => handleUpdate("complement")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>
        <div className={divClassesName}>
          <label htmlFor="relationship" className={labelClassesName}>
            Relacionamento:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.relationship ? (
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className={inputClassesName}
              >
                {Object.entries(relationshipOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            ) : (
              <p className={paragraphClassesName}>
                {relationshipOptions[
                  formData.relationship as keyof typeof relationshipOptions
                ] || formData.relationship}
              </p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("relationship")}
              className={pencilClassesName}
            >
              <FaPencilAlt />
            </button>
            {isEditing.relationship && (
              <button
                type="button"
                onClick={() => handleUpdate("relationship")}
                className={saveBtnClassesName}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>
      </form>
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
      <Childs token={token!} />
    </div>
  );
};

export default Profile;
