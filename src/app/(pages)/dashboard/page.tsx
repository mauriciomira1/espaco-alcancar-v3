"use client";
import config from "@/app/config/variables";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Interfaces para tipar a resposta
interface Address {
  address: string;
  city: string;
  complement: string;
}

interface ProfileType {
  patient: boolean;
  professional: boolean;
  admin: boolean;
}

interface UserDashboardResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  children: any[]; // Definir uma interface específica para os filhos, se necessário
  gender: "MALE" | "FEMALE";
  address: Address;
  profileType: ProfileType;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserDashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("espaco-alcancar");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Token not found");
        setError("Token not found");
        return;
      }

      console.log("Fetching user data with token:", token);

      try {
        const response = await fetch(`${config.apiBaseUrl}/user/me`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          navigate("/login");
          console.error("Token inválido");
          setError("Token inválido");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          setError("Failed to fetch user data: " + errorData.message);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError("Failed to fetch user data: " + (error as Error).message);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mx-4">
      <h1>Minha dashboard</h1>
      <p>Meu nome é: {user.name}</p>
      <p>Meu email é: {user.email}</p>
    </div>
  );
};

export default Dashboard;
