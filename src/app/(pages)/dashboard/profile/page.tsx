"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import config from "@/app/config/variables";
import { headers } from "next/headers";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    name: false,
    phone: false,
    address: false,
    city: false,
    complement: false,
    relationship: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("espaco-alcancar");
        const response = await fetch(`${config.apiBaseUrl}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          password: "",
          confirmPassword: "",
          relationship: data.relationship || "",
          address: {
            address: data.address?.address || "",
            city: data.address?.city || "",
            complement: data.address?.complement || "",
          },
          profileType: {
            patient: data.profileType?.patient || false,
            professional: data.profileType?.professional || false,
            admin: data.profileType?.admin || false,
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleUpdate = async (field: string) => {
    if (
      field === "password" &&
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/user/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: (formData as any)[field] }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const updatedData = await response.json();
      setUserData(updatedData);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Erro ao atualizar os dados.");
    }
  };

  const toggleEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const labelClassesName = `font-paragrafos`;
  const paragraphClassesName = `font-paragrafos`;
  const inputClassesName = `font-paragrafos`;

  return (
    <div className="w-full h-screen bg-white p-4">
      <Link
        to="/dashboard"
        className="flex items-center text-verde-escuro mb-4"
      >
        <FaArrowLeft className="mr-1" />
        Voltar
      </Link>
      <form className="space-y-4">
        <div className="flex space-y-1">
          <label htmlFor="name" className={labelClassesName}>
            Nome:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.name ? (
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-common"
              />
            ) : (
              <p className="input-common">{formData.name}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("name")}
              className="button-common"
            >
              <FaPencilAlt />
            </button>
            {isEditing.name && (
              <button
                type="button"
                onClick={() => handleUpdate("name")}
                className="button-common"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="phone" className="label-common">
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
                className="input-common"
              />
            ) : (
              <p className="input-common">{formData.phone}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("phone")}
              className="button-common"
            >
              <FaPencilAlt />
            </button>
            {isEditing.phone && (
              <button
                type="button"
                onClick={() => handleUpdate("phone")}
                className="button-common"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <div className="flex flex-col space-y-1">
            <label htmlFor="address" className="label-common">
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
                  className="input-common"
                />
              ) : (
                <p className="input-common">{formData.address.address}</p>
              )}
              <button
                type="button"
                onClick={() => toggleEdit("address")}
                className="button-common"
              >
                <FaPencilAlt />
              </button>
              {isEditing.address && (
                <button
                  type="button"
                  onClick={() => handleUpdate("address")}
                  className="button-common"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="city" className="label-common">
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
                  className="input-common"
                />
              ) : (
                <p className="input-common">{formData.address.city}</p>
              )}
              <button
                type="button"
                onClick={() => toggleEdit("city")}
                className="button-common"
              >
                <FaPencilAlt />
              </button>
              {isEditing.city && (
                <button
                  type="button"
                  onClick={() => handleUpdate("address")}
                  className="button-common"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="complement" className="label-common">
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
                  className="input-common"
                />
              ) : (
                <p className="input-common">{formData.address.complement}</p>
              )}
              <button
                type="button"
                onClick={() => toggleEdit("complement")}
                className="button-common"
              >
                <FaPencilAlt />
              </button>
              {isEditing.complement && (
                <button
                  type="button"
                  onClick={() => handleUpdate("address")}
                  className="button-common"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="relationship" className="label-common">
            Relacionamento:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.relationship ? (
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="input-common"
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="FATHER">Pai</option>
                <option value="MOTHER">Mãe</option>
                <option value="OTHER">Outro</option>
              </select>
            ) : (
              <p className="input-common">{formData.relationship}</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("relationship")}
              className="button-common"
            >
              <FaPencilAlt />
            </button>
            {isEditing.relationship && (
              <button
                type="button"
                onClick={() => handleUpdate("relationship")}
                className="button-common"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="label-common">
            Senha:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.password ? (
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-common"
              />
            ) : (
              <p className="input-common">******</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("password")}
              className="button-common"
            >
              <FaPencilAlt />
            </button>
            {isEditing.password && (
              <button
                type="button"
                onClick={() => handleUpdate("password")}
                className="button-common"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="confirmPassword" className="label-common">
            Confirmar Senha:
          </label>
          <div className="flex items-center space-x-2">
            {isEditing.confirmPassword ? (
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-common"
              />
            ) : (
              <p className="input-common">******</p>
            )}
            <button
              type="button"
              onClick={() => toggleEdit("confirmPassword")}
              className="button-common"
            >
              <FaPencilAlt />
            </button>
            {isEditing.confirmPassword && (
              <button
                type="button"
                onClick={() => handleUpdate("password")}
                className="button-common"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
