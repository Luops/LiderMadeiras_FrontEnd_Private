// app/api/export-phones/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Parser } from "json2csv";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from("db_usersPromo").select("phone");

  if (error) {
    console.error("Erro ao buscar dados do Supabase:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 }
    );
  }

  try {
    // Adiciona o formato especial no número
    const formattedData = data.map((item) => ({
      ...item,
      phone: `="${item.phone}"`, // força o Excel a manter o +
    }));
    const parser = new Parser({
      fields: ["phone"], // escolha os campos que quiser exportar
    });
    const csv = parser.parse(formattedData);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=usuarios.csv",
      },
    });
  } catch (err) {
    console.error("Erro ao gerar CSV:", err);
    return NextResponse.json({ error: "Erro ao gerar CSV" }, { status: 500 });
  }
}
