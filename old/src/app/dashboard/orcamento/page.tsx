"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  nameComplete: z
    .string()
    .min(8, { message: "O nome deve ter no mínimo 8 caracteres." })
    .max(100),
  email: z
    .string()
    .min(10, { message: "O email deve ter no mínimo 10 caracteres." })
    .max(100),
  phone: z
    .string()
    .min(8, { message: "O telefone deve ter no mínimo 8 caracteres." })
    .max(100),
});

// Shadcn UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Icons
import { Eye, EyeOff } from "lucide-react";

// Images
import LiderLogo from "@/img/liderLogo.png";

import { jsPDF } from "jspdf";

type Props = {};

function Orcamento({}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameComplete: "",
      email: "",
      phone: "",
    },
  });

  // Botão criar
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  console.log(LiderLogo);

  // Função de criar usuário
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Gerar o PDF com os dados do formulário

    // URL da imagem na pasta public
    const imgURL = "/img/liderLogo.png";
    try {
      const doc = new jsPDF();

      // Carregar a imagem como Base64
      const imgResponse = await fetch(imgURL);
      if (!imgResponse.ok) {
        throw new Error("Falha ao carregar a imagem. Verifique o caminho.");
      }
      const imgBlob = await imgResponse.blob(); // Aguarde a conversão em Blob
      const imgBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imgBlob);
      });
      // Remova o prefixo "data:image/png;base64,"
      const imgBase64Content = imgBase64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      // Configurar fonte e cores
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);

      // Cabeçalho
      doc.text("Orçamento Detalhado", 105, 20, { align: "center" });
      doc.setDrawColor(0, 123, 255); // Cor azul para a linha
      doc.setLineWidth(1.5);
      doc.line(10, 25, 200, 25); // Linha de separação

      // Adicionar uma imagem (se houver)
      const imgWidth = 30; // Largura da imagem
      const imgHeight = 20; // Altura da imagem
      doc.addImage(imgBase64Content, "PNG", 10, 10, imgWidth, imgHeight);

      // Configurar fonte e estilos para conteúdo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      // Adicionar conteúdo do formulário com espaçamento entre as linhas
      const startY = 40; // Posição inicial
      const lineSpacing = 10; // Espaçamento entre as linhas

      doc.text(`Nome Completo: ${values.nameComplete}`, 20, startY);
      doc.text(`Email: ${values.email}`, 20, startY + lineSpacing);
      doc.text(`Telefone: ${values.phone}`, 20, startY + lineSpacing * 2);

      // Rodapé
      const pageHeight = doc.internal.pageSize.height;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text("Documento gerado automaticamente", 105, pageHeight - 10, {
        align: "center",
      });

      // Salvar o PDF
      doc.save(`orcamento_${values.nameComplete}.pdf`);

      setIsSubmitting(false);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  }

  return (
    <main className="flex w-full items-center justify-center max-[640px]:px-0 px-10 py-6">
      <div className="max-[640px]:w-full flex flex-col items-center py-4 max-[640px]:px-2 px-[4rem] min-[640px]:bg-white max-[640px]:shadow-none shadow-lg max-[640px]:border-none border">
        <h3 className="leading-9 tracking-tight font-bold text-[2rem] w-full max-[640px]:text-center">
          Formulário de orçamento
        </h3>
        <p className="leading-7 tracking-tight font-[300] text-[0.8rem] w-full mt-3 text-gray-400 max-[640px]:text-center">
          Preencha abaixo o formulário para realizar um orçamento.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full mt-10"
          >
            <div className="w-full flex gap-3">
              <FormField
                control={form.control}
                name="nameComplete"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-[500] leading-6 tracking-wide">
                      Nome Completo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[500] leading-6 tracking-wide">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-[500] leading-6 tracking-wide">
                    Número de telefone
                  </FormLabel>
                  <p className="text-[0.8rem] text-gray-400">
                    Com DDD: 51999999999
                  </p>
                  <FormControl>
                    <Input placeholder="" {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full py-6 text-md bg-green-600">
              {isSubmitting ? "Criando..." : "Criar orçamento"}
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full py-6 text-md"
            >
              Voltar
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Orcamento;
