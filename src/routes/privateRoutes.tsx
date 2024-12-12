import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PrivateRoutesProps {
  Component: React.ComponentType;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ Component }) => {
  const [session, setSession] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedSession =
      localStorage.getItem("espaco-alcancar") ||
      localStorage.getItem("professional-espaco-alcancar") ||
      "null";
    setSession(storedSession);
  }, []);

  useEffect(() => {
    if (!session || session === "null") {
      router.push("/login");
    }
  }, [session, router]);

  if (!session || session === "null") {
    return null;
  }

  return <Component />;
};

export default PrivateRoutes;
