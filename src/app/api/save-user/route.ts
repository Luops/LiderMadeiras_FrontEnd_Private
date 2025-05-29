// app/api/save-user/route.ts (Next 13+ com App Router)
import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone } = body;

  let numberWithDDDState = phone.trim();
  if (!numberWithDDDState.startsWith("+55")) {
    if (numberWithDDDState.startsWith("55")) {
      numberWithDDDState = "+" + numberWithDDDState;
    } else {
      numberWithDDDState = "+55" + numberWithDDDState;
    }
  }

  let emailLowercase = email.trim().toLowerCase();

  if (!name || !emailLowercase || !numberWithDDDState) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Verifica se já existe usuário com mesmo e-mail ou telefone
  const { data: existingUser } = await supabase
    .from("db_usersPromo")
    .select("id")
    .or(`email.eq.${emailLowercase},phone.eq.${numberWithDDDState}`)
    .limit(1)
    .single();

  if (existingUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Usuário com e-mail ou telefone já cadastrado.",
      },
      { status: 409 }
    );
  }

  try {
    const { error } = await supabase
      .from("db_usersPromo")
      .insert([{ name, email: emailLowercase, phone: numberWithDDDState }]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao salvar no Supabase:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
