import Image from "next/image";
import React from "react";

// Images
import Loja from "../images/loja.jpg";

export function HistorySection() {
  return (
    <section id="historia" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative h-[400px] overflow-hidden rounded-lg sm:h-[500px]">
            <Image
              src={Loja}
              alt="História da empresa"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
              Nossa História
            </div>
            <h2 className="mt-4 text-3xl text-center lg:text-start font-bold tracking-tight sm:text-4xl">
              Tradição desde 2010
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground text-justify text-lg lg:text-md">
              <p>
                Atuando desde 2010, nos localizamos na cidade de Gravataí - Rio
                Grande do Sul. Construimos casas em todo nosso estado e em Santa
                Catarina. Trabalhamos com projetos de casas de alvenaria ou
                madeira. Atuamos também na venda de madeiras brutas e
                beneficiadas, entregando para construtoras, lojas de materiais
                de construção e cliente final.
              </p>
              <p>
                Contamos com madeira própria, o que torna muito mais ágil e
                competitivo em termos financeiros. Nosso beneficiamento de
                madeiras garante os melhores preços para quem deseja adquirir a
                casa pronta ou somente o material de construção.
              </p>
            </div>

            <div className="mt-8 text-center">
              <div className="text-5xl font-bold text-amber-700">
                {new Date().getFullYear() - 2010} +
              </div>
              <div className="text-sm text-muted-foreground">
                Anos de experiência
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
