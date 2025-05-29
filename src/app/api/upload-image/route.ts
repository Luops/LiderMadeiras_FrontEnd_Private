import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { mkdirSync, existsSync } from "fs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo recebido." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, file.name.replace(/\s/g, "_"));
  await writeFile(filePath, buffer);

  return NextResponse.json({ imageUrl: `/uploads/${file.name}` });
}
