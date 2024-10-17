import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const loading = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#2D1C40] to-[#39719A] flex items-center justify-center">
      <div className="animate-spin-fast text-6xl text-pessego">
        <AiOutlineLoading />
      </div>
    </div>
  );
};

export default loading;
