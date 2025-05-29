import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  try {
    const files = fs.readdirSync(uploadsDir);
    const images = files.map((file) => ({
      name: file,
      url: `/uploads/${file}`,
    }));

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao listar imagens." }, { status: 500 });
  }
}
