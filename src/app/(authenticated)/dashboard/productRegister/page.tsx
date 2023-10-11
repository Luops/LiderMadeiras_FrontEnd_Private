"use client";
import React from "react";

// Components
import AddProdForm from "@/components/AddProdForm/AddProdForm";

function ProductRegister() {

  return (
    <>
      <section className="w-[50%] flex flex-col items-start gap-4 mt-10 mb-10">
        <h2 className="text-4xl font-bold uppercase drop-shadow-xl">
          Registrar novo produto
        </h2>
        <p className="text-xl font-bold uppercase text-[#FE9022] drop-shadow-xl">
          Preencha o formulário
        </p>
      </section>

      <AddProdForm />
    </>
  );
}

export default ProductRegister;
