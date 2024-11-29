"use client"
import config from '@/app/config/variables';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [professionalData, setProfessionalData] = useState<ProfessionalDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({ visible: false, message: "", type: "success" });

  const navigate = useNavigate();
  const token = localStorage.getItem("professional-espaco-alcancar");

/*   const fieldLabels = {
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    birth: "Data de Nascimento",
    registerNumber: "Registro no Conselho",
    occupation: "Ocupação",
  }; */

  useEffect(() => {
    const fetchProfessionalData = async () => {
      try {
        if (!token) {
          setError("Token não encontrado");
          navigate("/login-professional");
          return;
        }

        const response = await fetch(`${config.apiBaseUrl}/professional/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
      })

      if(response.status !== 200) {
        navigate("/login-professional");
        setError("Token inválido");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setError("Erro ao buscar dados do profissional: " + errorData.message);
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
    }

    fetchProfessionalData();
  }, [token, navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/professional/me`, {
    } catch (error) {
      
    }
  };

  return (
   

  );
};

export default ProfessionalProfilePage;