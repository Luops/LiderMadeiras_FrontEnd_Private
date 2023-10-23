"use client";
import React from "react";

// Components
import Aside from "@/components/aside/Aside";
import ListProducts from "../../../components/listProducts/ListProducts";
import AddProdForm from "../../../components/addProdForm/AddProdForm";

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
      <main className="w-full h-screen flex">
        <Aside setActiveSection={setActiveSection} />
        <article className="flex-1 flex flex-col items-center">
          {/* Conteudo da pagina */}
          {renderSection()}
        </article>
      </main>
    </>
  );
}

export default Dashboard;
