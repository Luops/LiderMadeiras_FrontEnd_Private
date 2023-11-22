import React from "react";

// Provider
import UserContext from "@/store/provider";

// Components
import ShowProductDetails from "../modals/ShowProductDetails";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  unity: string;
  isPromotion: boolean;
  promoPrice: string;
  url: string;
  file: string;
};

const ProductComponent = ({
  _id,
  title,
  description,
  price,
  category,
  unity,
  isPromotion,
  promoPrice,
  url,
  file,
}: Product) => {
  // Pegar os produtos do contexto
  const { products }: any = React.useContext(UserContext);

  // State de detalhes do produto
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <>
      {/* Mostrar o modal de detalhes do produto */}
      {showDetails && (
        <ShowProductDetails
          _id={_id}
          title={title}
          description={description}
          price={price}
          category={category}
          unity={unity}
          isPromotion={isPromotion}
          promoPrice={promoPrice}
          url={url}
          file={file}
          setShowDetails={setShowDetails}
        />
      )}

      <article className="relative h-[300px] w-[240px] bg-slate-200 border border-slate-300 rounded-lg shadow-2xl py-2 px-1">
        <picture className="w-full h-2/3 flex items-center justify-center aspect-video bg-center">
          <img
            src={url}
            alt={title}
            className="w-full border border-slate-300 rounded-lg shadow-2xl"
          />
        </picture>
        <h3 className="text-center text-sm text-[#373737dd]">{title}</h3>
        {isPromotion && (
          <div className="flex flex-col mt-3">
            <p className="text-center text-sm drop-shadow-lg">De: R$ {price}</p>
            <p className="text-center text-lg font-bold drop-shadow-lg bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
              Por: R$ {promoPrice}
            </p>
          </div>
        )}
        <button
          onClick={() => setShowDetails(true)}
          className="absolute w-full h-full top-0 opacity-0"
        ></button>
      </article>
    </>
  );
};

export default ProductComponent;
