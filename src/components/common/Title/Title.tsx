import React from "react";

const Title = ({ title, color }: { title: string; color?: string }) => {
  return (
    <div className="py-6 flex flex-col items-center">
      <h1
        className={`uppercase text-titulos font-titulos ${
          color ? color : "text-verde-escuro"
        } pb-2 max-[425px]:text-lg`}
      >
        {title}
      </h1>
      <hr
        className="border-none bg-amarelo h-[2px] w-24 rounded-full"
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="100"
      />
    </div>
  );
};

export default Title;
