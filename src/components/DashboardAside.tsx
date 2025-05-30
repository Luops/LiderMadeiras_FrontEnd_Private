"use client";

import React from "react";
import Link from "next/link";
import {
  LogOut,
  User,
  FileText,
  Home as HomeIcon,
  ChevronRight,
  Upload,
  Send,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import UploadImage from "./UploadImage";
import SendMessageForm from "./SendMessageForm";

export function DashboardAside() {
  // Usuario logado
  const { user, logout } = useAuth();

  if (!user) return null;

  // State modal upload
  const [isModalUploadOpen, setIsModalUploadOpen] = React.useState(false);

  // Aside
  const [hasMounted, setHasMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // Responsividade aside
  // Fecha o aside automaticamente se a tela for redimensionada acima de md
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize(); // chama no carregamento
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!hasMounted || !user) return null;

  // Função para baixar o CSV
  const handleExport = async () => {
    try {
      const res = await fetch("/api/export-phones");

      if (!res.ok) {
        throw new Error("Erro ao exportar CSV");
      }

      const csv = await res.text();

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "contatos.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar CSV:", error);
    }
  };

  return (
    <>
      {/* Botão toggle (só em telas < md) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[70px] left-4 z-30 bg-amber-400 p-2 rounded-full shadow hover:bg-amber-500 transition"
      >
        <ChevronRight
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Overlay em mobile (clicar fora fecha) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ASIDE */}
      <aside
        className={`
          fixed top-14 left-0 z-30
          h-screen w-64 bg-amber-50 border-r border-amber-300 px-2 py-6 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <p className="mb-12 text-sm text-amber-700">{user.email}</p>

        <nav className="flex flex-col gap-4 text-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden fixed top-[50px] right-4 z-30  px-4 py-2 rounded-full hover:bg-amber-200 transition font-bold"
          >
            X
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-amber-800 hover:bg-amber-200 transition"
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/contatos"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-amber-800 hover:bg-amber-200 transition"
          >
            <User className="h-5 w-5" />
            Contatos
          </Link>

          {/* Opção de upload */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-3 px-4 py-2 rounded-md text-amber-800 hover:bg-amber-200 transition">
                <Upload className="h-5 w-5" />
                Upload de Imagem
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload de Imagem</DialogTitle>
                <DialogDescription>
                  Aqui você pode salvar uma imagem para ser usada nas mensagens
                  do WhatsApp.
                </DialogDescription>

                {/* Coloque aqui o componente de upload ou um form simples */}
                <UploadImage />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/*Opcao mandar mensagem */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-3 px-4 py-2 rounded-md text-amber-800 hover:bg-amber-200 transition">
                <Send className="h-5 w-5" />
                Enviar Mensagem
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar Mensagem</DialogTitle>
                <DialogDescription>
                  Escreva sua mensagem de texto ou imagem e envie para os
                  números informados.
                </DialogDescription>

                {/* Coloque aqui o componente de criacao de mensagem */}
                <SendMessageForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <button
            onClick={handleExport}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-amber-800 hover:bg-amber-200 transition"
            type="button"
          >
            <FileText className="h-5 w-5" />
            Exportar WhatsApp CSV
          </button>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 mt-4 rounded-md text-red-600 hover:bg-red-100 transition"
          type="button"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </aside>
    </>
  );
}
