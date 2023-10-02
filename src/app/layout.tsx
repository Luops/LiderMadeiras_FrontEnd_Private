// CSS
import "./globals.css";

// Components
import Header from "@/components/header/Header";
import Head from "./head";

// Provider
import { Providers } from "../store/provider";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <Head />
      <body className="flex flex-col items-center justify-center">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
