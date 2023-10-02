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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center bg-gray-100 px-5 py-2"
      >
        <label htmlFor="title" className="flex items-center gap-3">
          <span className="font-bold">Título:</span>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border border-gray-400 rounded"
          />
        </label>
        <label htmlFor="description" className="flex items-center gap-3">
          <span className="font-bold">Descrição:</span>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-400 rounded"
          />
        </label>
        <label htmlFor="price" className="flex items-center gap-3">
          <span className="font-bold">Preço:</span>
          <input
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className="border border-gray-400 rounded"
          />
        </label>
        <label htmlFor="category" className="flex items-center gap-3">
          <span className="font-bold">Categoria do produto:</span>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="madeira1">Madeira 1</option>
            <option value="madeira2">Madeira 2</option>
            <option value="madeira3">Madeira 3</option>
          </select>
        </label>
        <label htmlFor="unity" className="flex items-center gap-3">
          <span className="font-bold">Unidade de medida:</span>
          <select
            name="unity"
            id="unity"
            value={formData.unity}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="m">Metro</option>
            <option value="m²">Metro quadrado</option>
            <option value="cm">Centimetro</option>
          </select>
        </label>
        <label htmlFor="isPromotion" className="flex items-center gap-3">
          <span className="font-bold">É promoção?</span>
          <input
            type="checkbox"
            name="isPromotion"
            id="isPromotion"
            checked={formData.isPromotion}
            onChange={handleInputChange}
          />
        </label>
        {/* Se a promoção estiver marcada, armazene o valor da promoção */}
        {formData.isPromotion && (
          <label htmlFor="promoPrice" className="flex items-center gap-3">
            <span className="font-bold">Valor da promoção:</span>
            <input
              type="text"
              name="promoPrice"
              id="promoPrice"
              value={formData.promoPrice}
              onChange={handleInputChange}
              className="border border-gray-400 rounded"
            />
          </label>
        )}
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
