"use client";

import React, { useState } from "react";

export default function SendMessageForm() {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"text" | "image">("text");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/send-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers, message, type, imageUrl }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ message: "Erro ao enviar mensagens." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <textarea
        placeholder="Números de WhatsApp (um por linha)"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        className="border p-2 rounded h-24 resize-none"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as "text" | "image")}
        className="border p-2 rounded"
      >
        <option value="text">Texto</option>
        <option value="image">Imagem</option>
      </select>

      {type === "text" ? (
        <textarea
          placeholder="Mensagem de texto"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded h-24 resize-none"
          required
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="URL da imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Legenda da imagem (opcional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded h-24 resize-none"
          />
        </>
      )}

      <button
        type="submit"
        className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 transition"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar Mensagem"}
      </button>

      {result && (
        <div className="mt-2 text-sm">
          <strong>Status:</strong> {result.message}
        </div>
      )}
    </form>
  );
}
