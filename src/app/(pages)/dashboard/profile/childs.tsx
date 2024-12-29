"use client";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaCheck, FaTrash } from "react-icons/fa";
import config from "@/app/config/variables";
import { ChildDefaultResponse } from "@/interfaces/ChildInterfaces";

interface ChildsProps {
  token: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Add timezone offset to get correct local date
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + timezoneOffset);

  return adjustedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
};

const Childs = ({ token }: ChildsProps) => {
  const [children, setChildren] = useState<ChildDefaultResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({ visible: false, message: "", type: "success" });
  const [newDependent, setNewDependent] = useState({
    name: "",
    birth: "",
    gender: "FEMALE",
  });
  const sortedChildren = children.sort((a, b) => a.name.localeCompare(b.name));

  const fetchChildrenData = async () => {
    try {
      if (!token) {
        console.error("Token não disponível");
        setError("Você precisa estar logado para acessar esta página.");
        return;
      }

      const response = await fetch(`${config.apiBaseUrl}/user/children/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Erro HTTP! status: ${response.status}`);
        setError(`Erro ao buscar dependentes: ${response.statusText}`);
        return;
      }

      const childrenData: ChildDefaultResponse[] = await response.json();
      setChildren(childrenData);

      // Inicializa o formData com os dados das crianças
      const initialFormData: { [key: string]: any } = {};
      childrenData.forEach((child) => {
        initialFormData[`name-${child.id}`] = child.name;
        initialFormData[`birth-${child.id}`] = child.birth;
        // Adicione outros campos conforme necessário
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Erro ao buscar dependentes:", error);
      setError("Erro ao buscar dependentes");
    }
  };

  useEffect(() => {
    fetchChildrenData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddDependent = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/user/children/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDependent),
      });

      if (response.ok) {
        setNotification({
          visible: true,
          message: "Dependente adicionado com sucesso!",
          type: "success",
        });
        setIsModalOpen(false);
        fetchChildrenData(); // Atualiza a lista de dependentes
      } else {
        setNotification({
          visible: true,
          message: "Erro ao adicionar dependente.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        visible: true,
        message: "Erro ao adicionar dependente.",
        type: "error",
      });
    }
  };

  const handleRemoveDependent = async (childId: string) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/user/children/remove`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(childId),
        }
      );

      if (response.ok) {
        setNotification({
          visible: true,
          message: "Dependente removido com sucesso!",
          type: "success",
        });
        fetchChildrenData(); // Atualiza a lista de dependentes
      } else {
        setNotification({
          visible: true,
          message: "Erro ao remover dependente.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        visible: true,
        message: "Erro ao remover dependente.",
        type: "error",
      });
    }
  };

  const handleDependentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDependent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (childId: string, field: string) => {
    const childIndex = children.findIndex((child) => child.id === childId);
    if (childIndex === -1) {
      console.error("Child not found");
      return;
    }

    const updatedChildData = {
      id: childId,
      name: formData[`name-${childId}`] || children[childIndex].name,
      birth: formData[`birth-${childId}`] || children[childIndex].birth,
      gender: formData[`gender-${childId}`] || children[childIndex].gender,
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/user/children/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedChildData),
      });

      if (!response.ok) {
        throw new Error("Failed to update child data");
      }

      if (response.ok) {
        setIsFetch(!isFetch);
      }

      const updatedChild = await response.json();

      setChildren((prevChildren) =>
        prevChildren.map((child) =>
          child.id === updatedChild.id ? updatedChild : child
        )
      );
      setIsEditing((prevState) => ({
        ...prevState,
        [`${childId}-${field}`]: false,
      }));

      // Atualiza o formData com os novos dados
      setFormData((prevData) => ({
        ...prevData,
        [`name-${childId}`]: updatedChild.name,
        [`birth-${childId}`]: updatedChild.birth,
        [`gender-${childId}`]: updatedChild,
      }));

      /*       const updatedFormData = { ...formData };
      updatedFormData[`name-${childId}`] = updatedChild.name; */
    } catch (error) {
      console.error("Error updating child data:", error);
      setError("Failed to update child data: " + (error as Error).message);
    }
  };

  const toggleEdit = (childId: string, field: string) => {
    setIsEditing((prev) => ({
      ...prev,
      [`${childId}-${field}`]: !prev[`${childId}-${field}`],
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const labelClassesName = `font-subtitulos text-sm`;
  const paragraphClassesName = `font-paragrafos pb-1 text-sm`;
  const inputClassesName = `font-paragrafos text-sm bg-gray-200 rounded-md border-[1px] border-gray-400 px-2 py-0.5`;
  const divClassesName = `flex space-y-1 items-center gap-1`;
  const pencilClassesName = `text-gray-500 text-xs`;
  const saveBtnClassesName = `bg-verde-escuro text-white h-6 font-paragrafos text-xs rounded-md px-2 py-0.5`;

  return (
    <div className="mt-7">
      <h2 className="rounded-md px-2 py-1.5 bg-verde-claro text-white font-subtitulos">
        Dependentes
      </h2>
      <div className="mt-1">
        {children.length > 0 ? (
          sortedChildren.map((child) => (
            <ul key={child.id}>
              <li
                key={child.id}
                className="relative rounded-md border-[1px] px-2 py-1 border-verde-claro mb-1.5"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveDependent(child.id)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <FaTrash />
                </button>
                <div className={divClassesName}>
                  <label
                    htmlFor={`name-${child.id}`}
                    className={labelClassesName}
                  >
                    Nome:
                  </label>
                  <div className="flex space-x-2">
                    {isEditing[`${child.id}-name`] ? (
                      <input
                        type="text"
                        id={`name-${child.id}`}
                        name={`name-${child.id}`}
                        value={formData[`name-${child.id}`] || ""}
                        onChange={handleChange}
                        className={inputClassesName}
                      />
                    ) : (
                      <p className={paragraphClassesName} key={child.id}>
                        {child.name}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleEdit(child.id, "name")}
                      className={pencilClassesName}
                    >
                      <FaPencilAlt />
                    </button>
                    {isEditing[`${child.id}-name`] && (
                      <button
                        type="button"
                        onClick={() => handleUpdate(child.id, "name")}
                        className={saveBtnClassesName}
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </div>
                <div className={divClassesName}>
                  <label
                    htmlFor={`birth-${child.id}`}
                    className={labelClassesName}
                  >
                    Data de Nascimento:
                  </label>
                  <div className="flex space-x-2">
                    {isEditing[`${child.id}-birth`] ? (
                      <input
                        type="date"
                        id={`birth-${child.id}`}
                        name={`birth-${child.id}`}
                        value={formData[`birth-${child.id}`] || child.birth}
                        onChange={handleChange}
                        className={inputClassesName}
                      />
                    ) : (
                      <p className={paragraphClassesName}>
                        {formatDate(child.birth)}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleEdit(child.id, "birth")}
                      className={pencilClassesName}
                    >
                      <FaPencilAlt />
                    </button>
                    {isEditing[`${child.id}-birth`] && (
                      <button
                        type="button"
                        onClick={() => handleUpdate(child.id, "birth")}
                        className={saveBtnClassesName}
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </div>
                <div className={divClassesName}>
                  <label
                    htmlFor={`gender-${child.id}`}
                    className={labelClassesName}
                  >
                    Gênero:
                  </label>
                  <div className="flex space-x-2">
                    {isEditing[`${child.id}-gender`] ? (
                      <select
                        id={`gender-${child.id}`}
                        name={`gender-${child.id}`}
                        value={formData[`gender-${child.id}`] || child.gender}
                        onChange={handleChange}
                        className={inputClassesName}
                      >
                        <option value="MALE">Masculino</option>
                        <option value="FEMALE">Feminino</option>
                        <option value="OTHER">Outro</option>
                      </select>
                    ) : (
                      <p className={paragraphClassesName}>
                        {child.gender == "FEMALE" ? "Feminino" : "Masculino"}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleEdit(child.id, "gender")}
                      className={pencilClassesName}
                    >
                      <FaPencilAlt />
                    </button>
                    {isEditing[`${child.id}-gender`] && (
                      <button
                        type="button"
                        onClick={() => handleUpdate(child.id, "gender")}
                        className={saveBtnClassesName}
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          ))
        ) : (
          <p className="text-sm font-paragrafos">
            Sem dependentes cadastrados.
          </p>
        )}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white w-full max-w-4xl p-6 rounded-md shadow-md shadow-slate-600 mx-5">
            <h2 className="font-bold mb-6 text-center font-subtitulos rounded-md bg-verde-claro text-white py-2">
              Adicionar Dependente
            </h2>
            <div className="mb-4 flex items-center gap-2 w-full">
              <label className={labelClassesName} htmlFor="name">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newDependent.name}
                onChange={handleDependentChange}
                className={inputClassesName}
              />
            </div>
            <div className="mb-4 flex items-center gap-2 w-full">
              <label className={labelClassesName} htmlFor="birth">
                D. de Nasc.:
              </label>
              <input
                type="date"
                id="birth"
                name="birth"
                value={newDependent.birth}
                onChange={handleDependentChange}
                className={inputClassesName}
              />
            </div>
            <div className="mb-4 flex items-center gap-2 w-full">
              <label className={labelClassesName} htmlFor="gender">
                Gênero:
              </label>
              <select
                id="gender"
                name="gender"
                value={newDependent.gender}
                onChange={handleDependentChange}
                className={inputClassesName}
              >
                <option value="FEMALE">Feminino</option>
                <option value="MALE">Masculino</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddDependent}
                className="text-white px-4 py-2 rounded-md bg-verde-escuro"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="bg-pessego rounded-md px-2 mt-1 py-1 max-md:w-full text-white font-subtitulos"
        onClick={() => setIsModalOpen(true)}
      >
        Adicionar Dependente
      </button>
    </div>
  );
};

export default Childs;
