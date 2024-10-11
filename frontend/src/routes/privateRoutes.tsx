import { FC } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  Component: React.ComponentType;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ Component }) => {
  const session = localStorage.getItem("espaco-alcancar") || "null";

  // Remover ou comentar esta linha em produção
  console.log(session);

  return session && session !== "null" ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
