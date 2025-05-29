"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { useAuth } from "../context/AuthContext";

// Images
import LiderLogo from "../images/liderLogo.webp";

export function Header() {
  const { user, loading } = useAuth();
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "#", private: false },
    { name: "Produtos", href: "#produtos", private: false },
    { name: "Promoções", href: "#promo", private: false },
    { name: "Sobre Nós", href: "#historia", private: false },
    { name: "Localização", href: "#localizacao", private: false },
    { name: "Pagamentos", href: "#pagamentos", private: false },
    { name: "Contato", href: "#contato", private: false },
    { name: "Dashboard", href: "/dashboard", private: true },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Se já está na home
    if (pathname === "/") {
      e.preventDefault();

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerHeight = 64;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      // Se está em outra rota (ex: /dashboard), redireciona para a home com o hash
      e.preventDefault();
      router.push(`/${href}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={LiderLogo}
            alt="Logo Construtora"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold uppercase font-['Montserrat']">
            Lider Madeiras
          </span>
        </Link>
        <div className="ml-auto hidden lg:flex flex-col items-center">
          {user && (
            <div className="w-full flex items-center justify-end">
              <p>Bem-vindo, {user.email}</p>{" "}
              <Button
                onClick={logout}
                className="bg-transparent hover:bg-gray-200 text-black font-bold h-fit w-fit ml-2"
              >
                Sair
              </Button>
            </div>
          )}

          <nav className="lg:flex gap-6 ">
            {navLinks.map((link) => {
              const isPrivateAndNoUser = link.private && !user;
              if (isPrivateAndNoUser) return null;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-amber-700"
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      handleSmoothScroll(e, link.href);
                    }
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="ml-auto lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="!h-8 !w-8" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col gap-2 w-[300px] sm:w-[400px]"
            >
              {user && (
                <div className="w-full flex flex-col items-start justify-start">
                  <p className="font-semibold">Bem-vindo, {user.email}</p>{" "}
                  <Button
                    onClick={logout}
                    className="bg-transparent hover:bg-transparent text-black font-bold h-fit w-fit -ml-4"
                  >
                    Sair
                  </Button>
                </div>
              )}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isPrivateAndNoUser = link.private && !user;
                  if (isPrivateAndNoUser) return null;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-amber-700"
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          handleSmoothScroll(e, link.href);
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* 
        <div className="ml-4 hidden lg:flex">
          <Button className="bg-amber-700 hover:bg-amber-800">
            Solicitar Orçamento
          </Button>
        </div>*/}
      </div>
    </header>
  );
}
