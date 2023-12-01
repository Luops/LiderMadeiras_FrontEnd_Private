"use client";

import React from "react";

// Provider
import UserContext from "@/store/provider";

// Services
import { getProductsByCategory } from "@/services/get-products";

// Component do Next
import Image from "next/image";

// Data
import { categories } from "./data/data";

// Components
import ProductComponent from "@/components/product/ProductComponent";

// Images
import ImageOneBanner from "../img/Buzios-Quartzo-6-Reguas-450X450mm.png-1024x1024.png";
import ImageHouseBanner from "../img/casa.png";
import ImageTwoBanner from "../img/teca.png";

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

  // State para selecionar o input de promoção
  const [showPromotion, setShowPromotion] = React.useState(false);

  const [productsCategory, setProductsCategory] = React.useState<Product[]>([]);

  // State para selecionar o input de categoria
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  // Função para buscar produtos com base nas categorias e na opção de promoção
  const fetchProducts = async () => {
    try {
      let productsData;

      if (selectedCategories.length === 0) {
        // Se nenhuma categoria estiver selecionada, buscar todos os produtos
        productsData = await getProductsByCategory({
          category: "all",
          isPromotion: showPromotion ? "true" : "false",
        });
      } else {
        // Se houver categorias selecionadas, buscar por elas
        productsData = await getProductsByCategory({
          category: selectedCategories,
          isPromotion: showPromotion ? "true" : "false",
        });
      }

      if (productsData) {
        setProductsCategory(productsData);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Chamada à API ao montar o componente para buscar produtos padrão
  React.useEffect(() => {
    fetchProducts();
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para manipular a seleção/desseleção das categorias
  const handleCategoryChange = async (category: string) => {
    const { value } = category; // Obtém apenas o valor da categoria selecionada

    let updatedCategories = [];

    // Verifica se a categoria já está selecionada
    if (selectedCategories.includes(value)) {
      // Se já estiver selecionada, remove ela
      updatedCategories = selectedCategories.filter((item) => item !== value);
    } else {
      // Se a categoria não estiver selecionada, verifique se há alguma categoria selecionada atualmente
      // Se houver, remova-a antes de adicionar a nova categoria
      updatedCategories =
        selectedCategories.length > 0
          ? [value]
          : [...selectedCategories, value];
    }

    setSelectedCategories(updatedCategories);

    try {
      let productsData;

      if (!showPromotion) {
        // Se a opção de promoção estiver desativada, buscar produtos de acordo com a categoria selecionada
        if (updatedCategories.length === 0) {
          // Se não houver nenhuma categoria selecionada, buscar todos os produtos
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "false",
          });
        } else {
          // Se houver categorias selecionadas, buscar por categoria
          productsData = await getProductsByCategory({
            category: updatedCategories,
            isPromotion: "false",
          });
        }
      } else {
        // Se a opção de promoção estiver ativada, buscar produtos em promoção de acordo com a categoria selecionada
        if (updatedCategories.length === 0) {
          // Se não houver nenhuma categoria selecionada, buscar todos os produtos em promoção
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "true",
          });
        } else {
          // Verifica se a opção de promoção foi marcada após a seleção de uma categoria
          // Se sim, mantém a busca pelos produtos selecionados
          const selectedPromotion =
            selectedCategories.length > 0 ? "true" : "false";

          productsData = await getProductsByCategory({
            category: updatedCategories,
            isPromotion: selectedPromotion,
          });
        }
      }

      if (productsData) {
        setProductsCategory(productsData);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para obter o nome da categoria formatado removendo o '_'
  const getCategoryName = (category) => {
    return category.replace(/_/g, " ");
  };

  // Função para manipular a seleção/desseleção da opção de promoção
  const handlePromotionChange = async () => {
    const updatedPromotion = !showPromotion;

    setShowPromotion(updatedPromotion);

    try {
      let productsData;

      if (updatedPromotion) {
        if (selectedCategories.length === 0) {
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "true",
          });
        } else {
          productsData = await getProductsByCategory({
            category: selectedCategories,
            isPromotion: "true",
          });
        }
      } else {
        // Se a opção de promoção estiver desmarcada
        if (selectedCategories.length === 0) {
          // Se nenhum filtro de categoria estiver selecionado, buscar todos os produtos
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "false", // Buscar todos os produtos (em promoção ou não)
          });
        } else {
          // Se houver categorias selecionadas, buscar por elas
          productsData = await getProductsByCategory({
            category: selectedCategories,
            isPromotion: "false", // Buscar todos os produtos (em promoção ou não)
          });
        }
      }
      if (productsData) {
        setProductsCategory(productsData);
      }
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  console.log(selectedCategories);
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
        {/*Produtos*/}
        <section className="w-full flex items-start justify-between">
          {/*Lista de filtros*/}
          <div className="w-[250px] flex flex-col text-start">
            {/*Preço (promoção ou não) */}
            <div className="flex flex-col">
              <h3 className="text-lg font-inder font-bold">Preço</h3>
              <label htmlFor="" className="flex items-center mt-3">
                <input
                  type="checkbox"
                  checked={showPromotion}
                  onChange={handlePromotionChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#717171] ml-2">
                  Em Promoção!
                </span>
              </label>
            </div>
            {/*Preço (promoção ou não) */}
            <div className="flex flex-col mt-5">
              <h3 className="text-lg font-inder font-bold">Categoria</h3>
              {categories.map((category: string) => (
                <label key={category} className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.value)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-[#717171] ml-2">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full flex items-start justify-center gap-2">
            {/*Container de produtos*/}
            {productsCategory.length !== 0 ? (
              <>
                {productsCategory.map((product: Product) => (
                  <ProductComponent key={product._id} {...product} />
                ))}
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center mt-10">
                <h3 className="text-lg font-inder font-bold">
                  Nenhum resultado de{" "}
                  {selectedCategories.map((category) =>
                    getCategoryName(category)
                  )}{" "}
                  encontrado.
                </h3>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
