import React from "react";

// Icons
import { IoTrashBinSharp, IoPencil } from "react-icons/io5";

type Product = {
  title: string;
  description: string;
  price: string;
  category: string;
  unity: string;
  isPromotion: boolean;
  promoPrice: string;
  url: string;
};

// Formato do preço
function formatProductPrice(price: string): string {
  // Verifique se o preço contém um ponto decimal e duas casas decimais
  if (!/\.\d{2}$/.test(price)) {
    // Se não contiver, adicione um ponto decimal e duas casas decimais
    return `${price}.00`;
  }
  return price;
}

// Formato do preço
function formatProductPromoPrice(promoPrice: string): string {
  // Verifique se o preço contém um ponto decimal e duas casas decimais
  if (!/\.\d{2}$/.test(promoPrice)) {
    // Se não contiver, adicione um ponto decimal e duas casas decimais
    return `${promoPrice}.00`;
  }
  return promoPrice;
}

function ProductView({
  title,
  description,
  price,
  category,
  unity,
  isPromotion,
  promoPrice,
  url,
}: Product) {
  // Formate o preço
  const formattedPrice = formatProductPrice(price);

  // Formate o preço da promoção
  const formattedPromoPrice = formatProductPromoPrice(promoPrice);
  return (
    <>
      <article className="flex flex-col text-start px-2 py-1 gap-3">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <img
              src={url}
              alt={title}
              className="h-[70px] max-w-[80px] bg-contain bg-center"
            />
            <div>
              <h3 className="text-lg font-bold max-w-[280px]">{title}</h3>
              <p className="text-sm text-justify text-[#666666] max-w-[280px]">
                {description}
              </p>
            </div>
          </div>
          {isPromotion && (
            <div className="pr-5">
              <p className="text-2xl font-bold text-end">
                R$ {formattedPromoPrice}
              </p>
              <p className="text-md">R$ {formattedPrice}</p>
            </div>
          )}
          {!isPromotion && (
            <p className="text-2xl font-bold pr-5 text-end">
              R$ {formattedPrice}
            </p>
          )}
        </div>
        {/*Botões de ação*/}
        <div className="flex justify-between">
          {/*Editar e Excluir */}
          <div className="flex gap-5 h-[100%] text-center justify-center">
            <button onClick={() => alert("Excluiu")}>
              <div className="bg-white p-2 rounded-full">
                <IoTrashBinSharp className="text-[20px] text-black hover:text-[#FF6E00] transition-colors ease-in-out duration-500" />
              </div>
            </button>
            <button onClick={() => alert("Editar")}>
              <div className="bg-white p-2 rounded-full">
                <IoPencil className="text-[20px] text-black hover:text-[#FF6E00] transition-colors ease-in-out duration-500" />
              </div>
            </button>
          </div>
          {/*Ver produto*/}
          <button
            className="text-lg font-semibold bg-white px-3 rounded hover:bg-[#FF6E00] hover:text-white transition-colors ease-in-out duration-500"
            onClick={() => alert("Ver")}
          >
            Ver
          </button>
        </div>
      </article>
    </>
  );
}

export default ProductView;
