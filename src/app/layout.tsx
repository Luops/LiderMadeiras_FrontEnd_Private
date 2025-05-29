"use client";

import type { Metadata } from "next";
import "./globals.css";
import Head from "./head";

import { AuthProvider } from "../context/AuthContext";

// Components
import { Header } from "../components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Head />
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
