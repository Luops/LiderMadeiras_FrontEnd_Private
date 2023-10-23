import React from "react";

// Provider
import UserContext from "@/store/provider";
import ProductView from "./productView/ProductView";

type Props = {};

const ListProducts = (props: Props) => {
  const { products }: any = React.useContext(UserContext);

  // Retornar produtos que sao promoções
  const productsInPromotion = products.filter(
    (product: any) => product.isPromotion
  );

  // Retornar produtos que não sao promoções
  const productsNotInPromotion = products.filter(
    (product: any) => !product.isPromotion
  );
  return (
    <>
      <section className="flex gap-3 ml-[235px]">
        <article className="flex flex-col w-[500px] bg-[#ededed] rounded-[10px_10px_0px_0px]">
          <h3 className="w-100 text-3xl font-bold text-white py-3 text-center rounded-[10px_10px_0px_0px] bg-gradient-to-r from-[#FE9022] to-orange-500">
            Produtos
          </h3>
          {/*Retornar produtos que não sao promoções*/}
          {productsNotInPromotion.map((product: any) => (
            <ProductView key={product.id} {...product} />
          ))}
        </article>
        <article className="flex flex-col w-[500px] bg-[#ededed] rounded-[10px_10px_0px_0px]">
          <h3 className="w-100 text-3xl font-bold text-white py-3 text-center rounded-[10px_10px_0px_0px] bg-gradient-to-r from-[#FE9022] to-orange-500">
            Produtos em Promoção
          </h3>
          {/*Retornar produtos que sao promoções*/}
          {productsInPromotion.map((product: any) => (
            <ProductView key={product.id} {...product} />
          ))}
        </article>
      </section>
    </>
  );
};

export default ListProducts;
