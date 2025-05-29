// components/WhatsAppSender.tsx
"use client";

import { useState } from "react";

export function WhatsAppSender() {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState("");

  const handleSend = async () => {
    setSending(true);
    const res = await fetch("/api/send-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers, message }),
    });

    const data = await res.json();
    setResult(data.message || "Mensagens enviadas!");
    setSending(false);
  };

  return (
    <div className="space-y-4 p-4">
      <textarea
        rows={5}
        placeholder="Números (um por linha):"
        className="w-full border p-2 rounded"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
      />
      <textarea
        rows={4}
        placeholder="Mensagem"
        className="w-full border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        disabled={sending}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {sending ? "Enviando..." : "Enviar Mensagem"}
      </button>
      {result && <p>{result}</p>}
    </div>
  );
}
