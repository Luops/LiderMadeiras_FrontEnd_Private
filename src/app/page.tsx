"use client";

import React from "react";

// Components
import SectionBannerPromo from "@/components/SectionBannerPromo/SectionBannerPromo";
import SectionProducts from "@/components/SectionProducts/SectionProducts";
import SectionAbout from "@/components/SectionAbout/SectionAbout";

export default function Home() {
  return (
    <>
      <main className="w-full flex flex-col items-center justify-center antialiased mb-5">
        {/*Sobre*/}
        <SectionAbout />
        {/*Container focando na promoção Lider */}
        <SectionBannerPromo />
        {/*Produtos e Lista de Categorias*/}
        <SectionProducts />
      </main>
    </>
  );
}
