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

// Transforma o primeiro caractere de uma string em maiúsculo
function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

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

  // Função para formatar o preço
  const formatPrice = (price: number) => {
    // Verificar se price é um número
    if (typeof price !== "number" || isNaN(price)) {
      return "0,00"; // ou outro valor padrão que você queira retornar se price não for um número
    }
    // Converte o número para uma string com duas casas decimais
    let formattedPrice = price.toFixed(2);

    // Substitui o ponto por vírgula
    formattedPrice = formattedPrice.replace(".", ",");

    // Adiciona zeros após a vírgula se necessário
    if (!formattedPrice.includes(",")) {
      formattedPrice += ",00";
    } else if (formattedPrice.split(",")[1].length === 1) {
      formattedPrice += "00"; // Adiciona zeros se houver apenas um dígito após a vírgula
    }

    return formattedPrice;
  };
  // Formatar o preço
  const formattedPrice = formatPrice(price);

  // Função para formatar o preço da promocão
  const formatPromoPrice = (promoPrice: number) => {
    // Verificar se price é um número
    if (typeof promoPrice !== "number" || isNaN(promoPrice)) {
      return "0,00"; // ou outro valor padrão que você queira retornar se price não for um número
    }
    // Converte o número para uma string com duas casas decimais
    let formattedPromoPrice = promoPrice.toFixed(2);

    // Substitui o ponto por vírgula
    formattedPromoPrice = formattedPromoPrice.replace(".", ",");

    // Adiciona zeros após a vírgula se necessário
    if (!formattedPromoPrice.includes(",")) {
      formattedPromoPrice += ",00";
    } else if (formattedPromoPrice.split(",")[1].length === 1) {
      formattedPromoPrice += "00"; // Adiciona zeros se houver apenas um dígito após a vírgula
    }

    return formattedPromoPrice;
  };
  // Formatar o preço
  const formattedPromoPrice = formatPromoPrice(promoPrice);

  // Limite máximo de caracteres para title e description
  const maxTitleLength = 30; // Defina o valor desejado

  // Corte o título se ele exceder o limite e transforme a primeira letra maiuscula
  const truncatedTitle =
    title && title.length > maxTitleLength
      ? `${capitalizeFirstLetter(title.slice(0, maxTitleLength))}...`
      : title && capitalizeFirstLetter(title);

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

      <article className="relative h-[300px] w-[240px] border border-slate-200 rounded-lg shadow-md py-2 px-1">
        <picture className="w-full h-2/3 flex items-center justify-center aspect-video bg-center">
          <img
            src={url}
            alt={truncatedTitle}
            className="w-full border border-slate-300 rounded-lg shadow-2xl"
          />
        </picture>
        <h3 className="text-center text-sm text-[#373737dd]">{truncatedTitle}</h3>
        {isPromotion ? (
          <div className="flex flex-col mt-3">
            <p className="text-center text-sm drop-shadow-lg">
              De: R$ {formattedPrice}
            </p>
            <p className="text-center text-lg font-bold drop-shadow-lg bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
              Por: R$ {formattedPromoPrice}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-center text-lg font-bold drop-shadow-lg bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
            R$ {formattedPrice}
          </p>
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
