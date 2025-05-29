import axios from "axios";
import qs from "qs";
import { NextResponse } from "next/server";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    const { numbers, message, type = "text", imageUrl } = await request.json();

    if (!numbers || (type === "text" && !message) || (type === "image" && !imageUrl)) {
      return NextResponse.json(
        { message: "Preencha os campos corretamente." },
        { status: 400 }
      );
    }

    const phoneList = numbers
      .split("\n")
      .map((num: string) => num.trim())
      .filter(Boolean);

    const results = [];

    for (const phone of phoneList) {
      try {
        const data =
          type === "image"
            ? qs.stringify({
                token: process.env.ULTRAMSG_TOKEN!,
                to: phone,
                image: imageUrl,
                caption: message || "",
              })
            : qs.stringify({
                token: process.env.ULTRAMSG_TOKEN!,
                to: phone,
                body: message,
              });

        const endpoint =
          type === "image"
            ? `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/image`
            : `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`;

        const response = await axios.post(endpoint, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        results.push({ phone, status: response.data.status || "enviado" });
      } catch (error) {
        console.error("Erro ao enviar para", phone, error);
        results.push({ phone, status: "erro" });
      }

      // Aguarda 4 segundos antes de enviar para o próximo número
      await sleep(4000);
    }

    return NextResponse.json({ message: "Mensagens enviadas.", results });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro interno no servidor", error: error.message },
      { status: 500 }
    );
  }
}
