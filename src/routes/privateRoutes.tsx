import { FC } from "react";
import { useRouter } from "next/router";

interface PrivateRoutesProps {
  Component: React.ComponentType;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ Component }) => {
  const session =
    localStorage.getItem("espaco-alcancar") ||
    localStorage.getItem("professional-espaco-alcancar") ||
    "null";

  const router = useRouter();

  if (!session || session === "null") {
    router.push("/login");
    return null;
  }

  return <Component />;
};

export default PrivateRoutes;
