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

  // Encontre a quantidade máxima de itens na lista de produtos
  const maxItemsProd = Math.max(productsNotInPromotion.length);
  // Defina a altura do contêiner flexível pai com base na altura máxima da lista de produtos
  const calculateHeightProd = () => {
    if (maxItemsProd == 1) {
      return `${maxItemsProd * 210}px`;
    } else if (maxItemsProd >= 2) {
      return `${maxItemsProd * 170}px`;
    } else {
      return "0px";
    }
  };

  // Encontre a quantidade máxima de itens na lista de produtos
  const maxItemsPromo = Math.max(productsInPromotion.length);
  // Defina a altura do contêiner flexível pai com base na altura máxima da lista de promoção
  const calculateHeightPromo = () => {
    if (maxItemsPromo == 1) {
      return `${maxItemsPromo * 210}px`;
    } else if (maxItemsPromo >= 2) {
      return `${maxItemsPromo * 170}px`;
    } else {
      return "0px";
    }
  };

  // Altura do contêiner pai com base no número máximo de itens
  const containerHeightProd = calculateHeightProd();

  // Altura do contêiner pai com base no número máximo de itens
  const containerHeightPromo = calculateHeightPromo();

  console.log(products);
  return (
    <>
      <section className="flex gap-3 ml-[235px]">
        <article
          className="flex flex-col w-[500px] bg-[#ededed] rounded-[10px_10px_10px_10px] shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)]"
          style={{ height: containerHeightProd }}
        >
          <h3 className="w-100 text-3xl font-bold text-white py-3 text-center rounded-[10px_10px_0px_0px] bg-gradient-to-r from-[#FE9022] to-orange-500">
            Produtos
          </h3>
          {/*Retornar produtos que não sao promoções*/}
          {productsNotInPromotion.map((product: any) => (
            <ProductView key={product.id} {...product} />
          ))}
        </article>
        <article
          className="flex flex-col w-[500px] bg-[#ededed] rounded-[10px_10px_10px_10px] shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)]"
          style={{ height: containerHeightPromo }}
        >
          <h3 className="w-100 text-3xl font-bold text-white py-3 text-center rounded-[10px_10px_0px_0px] bg-gradient-to-r from-[#FE9022] to-orange-500">
            Produtos em Promoção
          </h3>
          {/*Retornar produtos que sao promoções*/}
          {productsInPromotion.map((product: any) => (
            <ProductView key={product._id} {...product} />
          ))}
        </article>
      </section>
    </>
  );
};

export default ListProducts;
