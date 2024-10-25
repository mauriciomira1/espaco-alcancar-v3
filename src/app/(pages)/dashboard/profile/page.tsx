"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import config from "@/app/config/variables";

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/user/me`);
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
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-paragrafos">
            Nome:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleUpdate("name")}
              className="p-2"
            >
              <FaPencilAlt />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="phone" className="text-sm font-paragrafos">
            Telefone:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleUpdate("phone")}
              className="p-2"
            >
              <FaPencilAlt />
            </button>
          </div>
        </div>
        <div className="border-2 border-gray-200 p-3 rounded-md">
          <div className="flex flex-col space-y-1">
            <label htmlFor="address" className="text-sm font-paragrafos">
              Endereço:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="address"
                name="address.address"
                value={formData.address.address}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleUpdate("address")}
                className="p-2"
              >
                <FaPencilAlt />
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="city" className="text-sm font-paragrafos">
              Cidade:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleUpdate("address")}
                className="p-2"
              >
                <FaPencilAlt />
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="complement" className="text-sm font-paragrafos">
              Complemento:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="complement"
                name="address.complement"
                value={formData.address.complement}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleUpdate("address")}
                className="p-2"
              >
                <FaPencilAlt />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="relationship" className="text-sm font-paragrafos">
            Relacionamento:
          </label>
          <div className="flex items-center space-x-2">
            <select
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="FATHER">Pai</option>
              <option value="MOTHER">Mãe</option>
              <option value="OTHER">Outro</option>
            </select>
            <button
              type="button"
              onClick={() => handleUpdate("relationship")}
              className="p-2"
            >
              <FaPencilAlt />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-paragrafos">
            Senha:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-paragrafos">
            Confirmar Senha:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleUpdate("password")}
              className="p-2"
            >
              <FaPencilAlt />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
