"use client";
import React from "react";
/*
import { uniqueId } from "lodash";*/

import api from "@/services/api";

type Props = {};

function ProductRegister({}: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    price: "",
    category: "",
    unity: "",
    isPromotion: false,
    promoPrice: "",
    file: null,
  });

  // Ref do file (imagem) do input
  const fileInputRef = React.useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true); // Está carregando o formulário para o backend ao clicar no botão

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("unity", formData.unity);
      formDataToSend.append("isPromotion", formData.isPromotion);
      // Se a promoção estiver marcada, armazene o valor da promoção
      if (formData.isPromotion) {
        formDataToSend.append("promoPrice", formData.promoPrice);
      } else {
        formDataToSend.append("promoPrice", "0");
      }
      formDataToSend.append("file", formData.file);

      // Faça uma chamada para a API do backend com os dados do formulário
      const response = await api.post("/api/product", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante definir o tipo de conteúdo como multipart/form-data
        },
      });
      console.log("Produto criado com sucesso:", response.data);

      setIsSent(true); // Defina isSent como true após o envio bem-sucedido
      handleClearForm(); // Limpe os campos do formulário
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      setError("Erro ao criar produto: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // Se o campo for uma checkbox, armazene o valor da checkbox
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "file") {
      // Se o campo for um arquivo, armazene o arquivo selecionado
      setFormData({
        ...formData,
        [name]: files[0], // Use apenas o primeiro arquivo se houver vários
      });
    } else {
      // Para outros campos de entrada, armazene o valor normalmente
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleClearForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      unity: "",
      isPromotion: false,
      promoPrice: "",
      file: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpe o valor do elemento de entrada de arquivo
    }
  };

  // Limpar o isSent (foi enviado?) após 1 segundos
  React.useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => {
        setIsSent(false);
      }, 3000); // Redefina isSent como false após 1 segundos (1000 milissegundos)
      return () => clearTimeout(timer); // Limpe o timer quando o componente for desmontado
    }
  }, [isSent]);

  return (
    <>
      <section className="w-[50%] flex flex-col items-start gap-4 mt-10 mb-10">
        <h1 className="text-3xl font-bold uppercase drop-shadow-xl">
          Registrar novo produto
        </h1>
        <p className="text-xl font-bold uppercase text-[#FE9022] drop-shadow-xl">
          Preencha o formulário
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="w-[50%] flex flex-col gap-8 items-start justify-center bg-gray-100 py-2"
      >
        {/*Input do título do produto*/}
        <label htmlFor="title" className="w-full border rounded-lg">
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border-b-[3px] border-gray-400 rounded-lg shadow-xl py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-black ease-in-out duration-500"
            placeholder="Nome do produto"
          />
        </label>
        <label htmlFor="description" className="w-full border rounded-lg">
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border-b-[3px] border-gray-400 rounded-lg shadow-xl py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-black ease-in-out duration-500"
            placeholder="Descrição do produto"
          ></textarea>
        </label>

        <article className="w-full flex flex-row justify-between">
          <label htmlFor="price" className="flex items-center gap-3">
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border-b-[3px] border-gray-400 rounded-lg shadow-xl py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-black ease-in-out duration-500"
              placeholder="Preço"
            />
          </label>
          <label
            htmlFor="isPromotion"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              name="isPromotion"
              id="isPromotion"
              checked={formData.isPromotion}
              onChange={handleInputChange}
              className="w-[115px] relative h-[50px] rounded-full border-b-[3px] border-gray-400 bg-gray-300 appearance-none shadow-sm ease-in-out duration-500 checked:bg-[#FE9022] checked:border-gray-400 checked:border-transparent"
            />
            <span
              className={`uppercase font-bold absolute pl-3 text-md ${
                formData.isPromotion ? "text-white" : ""
              } transition-colors`}
            >
              Promoção
            </span>
          </label>
          {/*Se a promoção estiver marcada, exiba o campo de valor da promoção */}
          {formData.isPromotion ? (
            <label htmlFor="promoPrice" className="flex items-center gap-3">
              <input
                type="text"
                name="promoPrice"
                id="promoPrice"
                value={formData.promoPrice}
                onChange={handleInputChange}
                className="border-b-[3px] border-gray-400 rounded-lg shadow-xl py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-black ease-in-out duration-500"
                placeholder="Preço da promoção"
              />
            </label>
          ) : (
            <label htmlFor="promoPrice" className="flex items-center gap-3">
              <input
                type="text"
                name="promoPrice"
                id="promoPrice"
                value={formData.promoPrice}
                onChange={handleInputChange}
                className="bg-gray-300 border-b-[3px] border-gray-400 rounded-lg shadow-xl py-3 px-1 placeholder:text-[rgba(0,0,0,0.5)] focus:outline-0 focus:border-black ease-in-out duration-500"
                placeholder="Preço da promoção"
                disabled
              />
            </label>
          )}
        </article>
        <article className="w-full flex flex-row justify-between gap-5">
          <label htmlFor="category" className="w-full flex items-center">
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full flex items-center gap-3 rounded-lg text-[rgba(0,0,0,0.5)] uppercase shadow-xl py-3 px-1  border-b-[3px] border-gray-400 focus:outline-0 focus:border-black ease-in-out duration-500"
            >
              <option value="">Categoria do produto</option>
              <option value="madeira1">Madeira 1</option>
              <option value="madeira2">Madeira 2</option>
              <option value="madeira3">Madeira 3</option>
            </select>
          </label>
          <label htmlFor="unity" className="w-full flex items-center">
            <select
              name="unity"
              id="unity"
              value={formData.unity}
              onChange={handleInputChange}
              className="w-full flex items-center gap-3 rounded-lg text-[rgba(0,0,0,0.5)] uppercase shadow-xl py-3 px-1  border-b-[3px] border-gray-400 focus:outline-0 focus:border-black ease-in-out duration-500"
            >
              <option value="">Selecione</option>
              <option value="m">Metro</option>
              <option value="m²">Metro quadrado</option>
              <option value="cm">Centimetro</option>
            </select>
          </label>
        </article>
        <label>
          <span className="font-bold">Imagem</span>
          <input
            type="file"
            name="file"
            id="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            className="border border-gray-400 rounded"
          />
        </label>
        {/* Se estiver carregando, exiba um texto indicando que está enviando */}
        {isLoading ? (
          <h3>Enviando...</h3>
        ) : (
          <button
            type="submit"
            disabled={isLoading} // Se estiver carregando, desabilite o botão
            className="font-bold bg-slate-300 px-3 py-1 rounded-sm hover:bg-slate-500 transition-colors ease-in-out duration-500"
          >
            Enviar
          </button>
        )}
      </form>
    </>
  );
}

export default ProductRegister;
