"use client";
import React from "react";

// Components
import AddProdForm from "@/components/addProdForm/AddProdForm";

function ProductRegister() {
  return (
    <>
      <section className="w-[50%] max-[1024px]:w-[80%] flex flex-col items-start gap-4 mt-10 mb-10">
        <h2 className="text-6xl max-[420px]:text-4xl font-bold uppercase drop-shadow-xl">
          Registrar novo produto
        </h2>
        <p className="text-xl max-[420px]:text-sm font-bold uppercase text-[#FE9022] drop-shadow-xl">
          Preencha o formulário
        </p>
      </section>

      {/*Formulário */}
      <AddProdForm />
    </>
  );
}

export default ProductRegister;
