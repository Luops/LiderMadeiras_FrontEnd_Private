import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  try {
    // Lista arquivos no bucket uploads
    const { data, error } = await supabase.storage.from("uploadslider").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error("Erro ao listar imagens:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Mapeia para formato esperado pelo frontend
    const images = data.map((file) => ({
      name: file.name,
      url: supabase.storage.from("uploadslider").getPublicUrl(`${file.name}`).data.publicUrl,
    }));

    return NextResponse.json(images);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
