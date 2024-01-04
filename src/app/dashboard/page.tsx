"use client";
import React from "react";

// Context
import UserContext from "@/store/provider";

// Components
import AsideDash from "@/components/aside/AsideDash";
import ListProducts from "@/components/listProducts/ListProducts";
import AddProdForm from "@/components/addProdForm/AddProdForm";
import PrivateRoute from "@/components/privateRoute/PrivateRoute";

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
  file: File | null;
};

export default function Dashboard() {
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = React.useState("produtos");

  // Obtendo o contexto para produtos
  const { products }: any = React.useContext(UserContext);

  return (
    <>
      <PrivateRoute>
        <main className="w-full h-screen flex">
          <AsideDash setActiveSection={setActiveSection} />
          <article className="flex-1 flex flex-col items-center">
            {/* Conteudo da pagina */}
            {activeSection === "produtos" ? (
              <ListProducts productsParam={{ ...products }} />
            ) : (
              <AddProdForm />
            )}
          </article>
        </main>
      </PrivateRoute>
    </>
  );
}
