import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message, receberPromos } =
      await request.json();

    console.log("Recebido:", { name, email, phone, subject, message });

    const transporter = nodemailer.createTransport({
      service: "gmail", // Use o serviço do Gmail
      auth: {
        user: "lidermadeirasgravatai@gmail.com", // Seu e-mail Gmail
        pass: "lsnr xtig loec qmcf", // Sua senha de app do Gmail
      },
    });

    const mailOptions = {
      from: "Lider Madeiras <lidermadeirasgravatai@gmail.com>",
      to: "lidermadeirasgravatai@gmail.com",
      replyTo: email,
      subject: `Novo Contato - Nome: ${name}, Assunto: ${subject}`,
      html: `
        <div>
          <h2>Nova dúvida</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Mensagem:</strong> ${message}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info);

    return NextResponse.json({
      success: true,
      message: "Email enviado com sucesso!",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro interno na API:", error.message, error.stack);
    } else {
      console.error("Erro interno na API:", error);
    }
    return NextResponse.json(
      { success: false, message: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}
