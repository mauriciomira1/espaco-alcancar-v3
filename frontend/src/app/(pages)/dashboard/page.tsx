"use client";
import { useEffect, useState } from "react";

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
  password: string; // Cuidado ao manipular senhas
  children: any[]; // Você pode definir uma interface específica para os filhos, se necessário
  gender: string; // Pode ser tipado como um enum se você tiver valores fixos
  address: Address;
  profileType: ProfileType;
}

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("espaco-alcancar");

  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const response = await fetch("/me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response failed");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
  }, [token]);

  return (
    <div className="flex items-center justify-center mx-4">
      <h1>Minha dashboard</h1>
      <p>Meu nome é: {user.name}</p>
      <p>Meu email é: </p>
    </div>
  );
};

export default Dashboard;
