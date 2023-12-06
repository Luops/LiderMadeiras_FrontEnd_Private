import React from "react";

type Props = {};

function SectionAbout({}: Props) {
  return (
    <section className="w-full h-[100dvh] flex flex-col justify-center items-center text-center mt-20 bg-gradient-to-r from-stone-900 to-neutral-800">
      <h3 className="text-[3.75rem] leading-[1] text-white font-[700]">Sobre</h3>
    </section>
  );
}

export default SectionAbout;
