"use client";
import MenuMobile from "@/components/common/Menu/MenuMobile/MenuMobile";
import MenuLaptop from "@/components/common/Menu/MenuLaptop/MenuLaptop";
import { useEffect, useState } from "react";

const MenuPrincipal = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1080);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="z-50">{isMobile ? <MenuMobile /> : <MenuLaptop />}</div>
  );
};

export default MenuPrincipal;
