"use client";
import React from "react";

// Next Components
import { useRouter } from "next/router";
import { useContext } from "react";

// Context
import UserContext from "@/store/provider";

// Components
import AsideDash from "@/components/aside/AsideDash";
import ListProducts from "../../../components/listProducts/ListProducts";
import AddProdForm from "../../../components/addProdForm/AddProdForm";
import PrivateRoute from "@/components/privateRoute/PrivateRoute";

function Dashboard() {
  // State para controlar a seção ativa
  const [activeSection, setActiveSection] = React.useState("produtos");

  // Renderizar componente de acordo com a seção ativa
  const renderSection = () => {
    switch (activeSection) {
      case "produtos":
        return <ListProducts />;
      case "addProduct":
        return <AddProdForm />;
      default:
        return null;
    }
  };
  return (
    <>
      <PrivateRoute>
        <main className="w-full h-screen flex">
          <AsideDash setActiveSection={setActiveSection} />
          <article className="flex-1 flex flex-col items-center">
            {/* Conteudo da pagina */}
            {renderSection()}
          </article>
        </main>
      </PrivateRoute>
    </>
  );
}

export default Dashboard;
