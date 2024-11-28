import { FC } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  Component: React.ComponentType;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ Component }) => {
  const session =
    localStorage.getItem("espaco-alcancar") ||
    localStorage.getItem("professional-espaco-alcancar") ||
    "null";

  return session && session !== "null" ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
