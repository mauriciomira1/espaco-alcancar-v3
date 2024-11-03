import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import config from "@/app/config/variables";

interface Child {
  id: number;
  name: string;
  birth: string;
  gender: string;
}

interface ChildsProps {
  token: string;
}

const Childs: React.FC<ChildsProps> = ({ token }) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const response = await fetch(
          `${config.apiBaseUrl}/user/children/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          console.error("Erro ao buscar dependentes");
          setError("Erro ao buscar dependentes");
          return;
        }

        const childrenData = await response.json();
        setChildren(childrenData);
      } catch (error) {
        console.error("Erro ao buscar dependentes:", error);
        setError("Failed to fetch children data: " + (error as Error).message);
      }
    };

    fetchChildrenData();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (childId: number, field: string) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/user/children/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: childId,
          [field]: formData[field],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update child data");
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
    } catch (error) {
      console.error("Error updating child data:", error);
      setError("Failed to update child data: " + (error as Error).message);
    }
  };

  const toggleEdit = (childId: number, field: string) => {
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
    <div>
      <h2>Dependentes</h2>
      {children.length > 0 ? (
        <ul>
          {children.map((child) => (
            <li key={child.id}>
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
                      value={formData[`name-${child.id}`] || child.name}
                      onChange={handleChange}
                      className={inputClassesName}
                    />
                  ) : (
                    <p className={paragraphClassesName}>{child.name}</p>
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
                      type="text"
                      id={`birth-${child.id}`}
                      name={`birth-${child.id}`}
                      value={formData[`birth-${child.id}`] || child.birth}
                      onChange={handleChange}
                      className={inputClassesName}
                    />
                  ) : (
                    <p className={paragraphClassesName}>{child.birth}</p>
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
                    <input
                      type="text"
                      id={`gender-${child.id}`}
                      name={`gender-${child.id}`}
                      value={formData[`gender-${child.id}`] || child.gender}
                      onChange={handleChange}
                      className={inputClassesName}
                    />
                  ) : (
                    <p className={paragraphClassesName}>{child.gender}</p>
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
          ))}
        </ul>
      ) : (
        <p>Sem dependentes cadastrados.</p>
      )}
    </div>
  );
};

export default Childs;
