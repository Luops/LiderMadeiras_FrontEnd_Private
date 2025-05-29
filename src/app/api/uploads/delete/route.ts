import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("file");

  if (!fileName) {
    return NextResponse.json({ error: "Arquivo não especificado." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "uploads", fileName);

  try {
    fs.unlinkSync(filePath);
    return NextResponse.json({ message: "Arquivo deletado com sucesso." });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar arquivo." }, { status: 500 });
  }
}
