import { ReactNode } from "react";

const ItemListaServicosLaptop = ({
  titulo,
  descricao,
}: {
  titulo: string | ReactNode;
  descricao: string;
}) => {
  return (
    <div className="px-4 py-4 w-[700px] bg-white rounded-md max-lg:w-[400px]">
      <h2 className="text-pessego font-subtitulos text-subtitulos pb-4">
        {titulo}
      </h2>
      <p className="text-base font-semibold font-paragrafos text-verde-claro pb-32">
        {descricao}
      </p>
    </div>
  );
};

export default ItemListaServicosLaptop;
