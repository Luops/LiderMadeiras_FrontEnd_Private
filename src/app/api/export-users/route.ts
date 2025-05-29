// app/api/export-users/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Parser } from "json2csv";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from("db_usersPromo").select("*");

  if (error) {
    console.error("Erro ao buscar dados do Supabase:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 }
    );
  }

  try {
    const parser = new Parser({
      fields: ["name", "email", "phone"], // escolha os campos que quiser exportar
    });
    const csv = parser.parse(data);

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
