import React from "react";

// Components
import ShowAlertDelete from "@/components/modals/ShowAlertDelete";

// Icons
import { IoTrashBinSharp, IoPencil } from "react-icons/io5";

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
};

// Formato do preço normal
function formatProductPrice(price: string): string {
  // Converte o preço para um número de ponto flutuante
  const priceAsFloat = parseFloat(price);

  // Verifica se o preço é um número
  if (!isNaN(priceAsFloat)) {
    // Formata o preço com duas casas decimais
    let formattedPrice = priceAsFloat.toFixed(2);

    // Remove as casas decimais se forem zero
    formattedPrice = formattedPrice.replace(/\.00$/, "");

    return formattedPrice;
  }

  // Retorna o preço original se não for um número
  return price;
}

// Formato do preço da promoção
function formatProductPromoPrice(promoPrice: string): string {
  // Converte o preço da promoção para um número de ponto flutuante
  const promoPriceAsFloat = parseFloat(promoPrice);

  // Verifica se o preço da promoção é um número
  if (!isNaN(promoPriceAsFloat)) {
    // Formata o preço da promoção com duas casas decimais
    let formattedPromoPrice = promoPriceAsFloat.toFixed(2);

    // Remove as casas decimais se forem zero
    formattedPromoPrice = formattedPromoPrice.replace(/\.00$/, "");

    return formattedPromoPrice;
  }

  // Retorna o preço da promoção original se não for um número
  return promoPrice;
}

// Transforma o primeiro caractere de uma string em maiúsculo
function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Transforma o primeiro caractere de uma string após um ponto em minúsculo
function capitalizeAfterPeriod(text) {
  return text.replace(
    /\. [a-z]/g,
    (match) => `. ${match.charAt(2).toUpperCase()}`
  );
}
function formatDescription(text) {
  const firstUpperCase = capitalizeFirstLetter(text);
  const result = capitalizeAfterPeriod(firstUpperCase);
  return result;
}

function ProductView({
  _id,
  title,
  description,
  price,
  category,
  unity,
  isPromotion,
  promoPrice,
  url,
}: Product) {
  // State do modal de apagar
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  // Formate o preço
  const formattedPrice = formatProductPrice(price);

  // Formate o preço da promoção
  const formattedPromoPrice = formatProductPromoPrice(promoPrice);

  // Limite máximo de caracteres para title e description
  const maxTitleLength = 20; // Defina o valor desejado
  const maxDescriptionLength = 50; // Defina o valor desejado

  // Corte o título se ele exceder o limite e transforme a primeira letra maiuscula
  const truncatedTitle =
    title.length > maxTitleLength
      ? `${capitalizeFirstLetter(title.slice(0, maxTitleLength))}...`
      : capitalizeFirstLetter(title);

  // Corte a descrição se ela exceder o limite e transforme a primeira letra maiuscula + primeira letra após ponto
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? `${formatDescription(description.slice(0, maxDescriptionLength))}...`
      : formatDescription(description);

  console.log(_id);

  return (
    <>
      {showDeleteModal && (
        <ShowAlertDelete
          setShowDeleteModal={setShowDeleteModal}
          title={title}
          _id={_id}
        />
      )}
      <article className="flex flex-col text-start py-1 mx-2 gap-3 border-b border-[#fe902273] !h-[130px]">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <img
              src={url}
              alt={title}
              className="h-[70px] aspect-square bg-contain bg-center shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)] rounded-lg"
            />
            <div className="max-w-[250px]">
              <h3 className="text-md font-bold line-clamp-1">
                {truncatedTitle}
              </h3>
              <p className="text-sm text-justify text-[#666666] overflow-hidden break-words line-clamp-2">
                {truncatedDescription}
              </p>
            </div>
          </div>
          {isPromotion && (
            <div className="pr-5">
              <p className="text-xl font-bold text-end">
                R$ {formattedPromoPrice}
              </p>
              <p className="text-md">R$ {formattedPrice}</p>
            </div>
          )}
          {!isPromotion && (
            <p className="text-xl font-bold pr-5 text-end">
              R$ {formattedPrice}
            </p>
          )}
        </div>
        {/*Botões de ação*/}
        <div className="flex justify-between">
          {/*Editar e Excluir */}
          <div className="flex gap-5 h-[100%] text-center justify-center">
            <button onClick={() => setShowDeleteModal(true)}>
              <div className="bg-white p-2 rounded-full shadow-[0px_0px_9px_1px_#1b191929]">
                <IoTrashBinSharp className="text-[20px] text-black hover:text-[#FF6E00] transition-colors ease-in-out duration-500" />
              </div>
            </button>
            <button onClick={() => alert("Editar")}>
              <div className="bg-white p-2 rounded-full shadow-[0px_0px_9px_1px_#1b191929]">
                <IoPencil className="text-[20px] text-black hover:text-[#FF6E00] transition-colors ease-in-out duration-500" />
              </div>
            </button>
          </div>
          {/*Ver produto*/}
          <button
            className="text-lg font-semibold bg-white px-3 rounded hover:bg-[#FF6E00] hover:text-white transition-colors ease-in-out duration-500 shadow-[0px_0px_9px_1px_#1b191929]"
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
