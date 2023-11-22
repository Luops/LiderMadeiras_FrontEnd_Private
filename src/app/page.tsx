"use client";

import React from "react";

// Provider
import UserContext from "@/store/provider";

// Component do Next
import Image from "next/image";

// Components

// Images
import ImageOneBanner from "../img/Buzios-Quartzo-6-Reguas-450X450mm.png-1024x1024.png";
import ImageHouseBanner from "../img/casa.png";
import ImageTwoBanner from "../img/teca.png";
import ProductComponent from "@/components/product/ProductComponent";

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

export default function Home({
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
}: Product) {
  // Pegar os produtos do contexto
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
      <main className="w-full flex flex-col items-center justify-center antialiased px-40 mb-5 gap-3">
        {/*Container focando na promoção Lider */}
        <section className="w-full flex justify-evenly items-center py-5 bg-gradient-to-r from-blue-400 to-blue-800">
          {/*Texto do container de promoções*/}
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-bold text-4xl max-w-[350px] text-center drop-shadow-lg">
              Promoções{" "}
              <span className="uppercase bg-gradient-to-r from-[#FE9022] to-orange-500 bg-clip-text text-transparent">
                Lider
              </span>
              !
            </h2>
            <p className="text-md max-w-[350px] mt-4 text-[#ffffffad] text-center drop-shadow-lg">
              Descubra as nossas promoções
            </p>
            <p className="text-[#f8f81df9] mt-[-15px] font-bold text-4xl text-center max-w-[350px] drop-shadow-lg">
              Descontos em até <span className="text-6xl underline">25%</span>
            </p>
          </div>
          {/*Imagens*/}
          <div className="flex items-center justify-center">
            <Image
              src={ImageOneBanner}
              alt="Banner"
              className="w-[200px] h-[150px] aspect-auto drop-shadow-2xl mr-[-130px] mb-2"
            />
            <Image
              src={ImageHouseBanner}
              alt="House"
              className="w-[420px] drop-shadow-2xl z-10"
            />
            <Image
              src={ImageTwoBanner}
              alt="Banner"
              className="w-[200px] h-[150px] aspect-auto drop-shadow-2xl rotate-180 ml-[-50px] mb-2"
            />
          </div>
        </section>
        {/*Slide com as promoções*/}
        {productsInPromotion.map((product: any) => (
          <ProductComponent key={product._id} {...product} product={products} />
        ))}
      </main>
    </>
  );
}
