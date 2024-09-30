const ItemMobile = ({
  titulo,
  descricao,
}: {
  titulo: string;
  descricao: string;
}) => {
  return (
    <div className="bg-white px-4 max-[450px]:px-2 pt-4 pb-6 rounded-md flex flex-col items-center min-h-[350px]">
      <h2 className="uppercase font-paragrafos px-4 py-1 border mt-2 border-pessego rounded-md text-pessego max-[450px]:text-sm">
        {titulo}
      </h2>
      <div className="h-[1.5px] bg-gray-200 w-10/12 rounded-full my-5"></div>
      <p className="font-paragrafos text-base text-verde-escuro text-justify w-10/12 px-2 max-[450px]:text-sm max-[450px]:w-full max-[450px]:text-left">
        {descricao}
      </p>
    </div>
  );
};

export default ItemMobile;
