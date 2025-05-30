import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("file");

  if (!fileName) {
    return NextResponse.json(
      { error: "Arquivo não especificado." },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase.storage
      .from("uploadslider")
      .remove([fileName]); // ou se estiver em pasta: [`slider/${fileName}`]

    if (error) {
      console.error("Erro ao deletar arquivo:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Arquivo deletado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar arquivo." },
      { status: 500 }
    );
  }
}
