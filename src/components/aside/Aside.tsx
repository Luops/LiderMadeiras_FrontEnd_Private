"use client";
import React from "react";

const Aside = ({ setActiveSection }) => {
  return (
    <>
      <aside className="fixed flex flex-col w-1/5 min-w-[200px] h-full max-[855px]:hidden border-r-[1px]">
        <p className="text-lg font-semibold text-start mt-5 py-2 px-5">
          Eliana Rios
        </p>

        <button
          className="py-2 px-5 text-black text-sm text-start font-semibold hover:bg-[#dfdfdf] transition-colors ease-in-out duration-500"
          onClick={() => setActiveSection("produtos")}
        >
          Produtos
        </button>
        <button
          className="py-2 px-5 text-black text-sm text-start font-semibold hover:bg-[#dfdfdf] transition-colors ease-in-out duration-500"
          onClick={() => setActiveSection("addProduct")}
        >
          Adicionar Produto
        </button>
      </aside>
    </>
  );
};

export default Aside;
