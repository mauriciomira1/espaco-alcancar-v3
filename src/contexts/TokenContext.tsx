"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface TokenContextProps {
  tokenChecked: boolean;
  setTokenChecked: (checked: boolean) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokenChecked, setTokenChecked] = useState(false);

  return (
    <TokenContext.Provider value={{ tokenChecked, setTokenChecked }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
