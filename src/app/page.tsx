"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Truck,
  Building,
  Shield,
  Instagram,
  Facebook,
} from "lucide-react";

// Context
import { useAuth } from "../context/AuthContext";

import { Button } from "./../components/ui/button";
import { ContactForm } from "./../components/contact-form";
import { ProductCard } from "./../components/product-card";
import { Footer } from "./../components/footer";
import { HistorySection } from "./../components/history-section";
import { LocationSection } from "./../components/location-section";
import { PaymentSection } from "./../components/payment-section";
import PromoSection from "../components/promo-section";

// Images
import ImageHome from "../images/modern-wooden-house-construction.png";
import ImageHouse from "../images/wooden-house-construction.png";
import ImageWoods from "../images/construction-timber-lumber.png";
import ImageDeck from "../images/deck-eucalipto-tratado-02.jpg";
import ImageDoor from "../images/IMG_5515.jpg";

export default function Home() {
  return (
    <div className="w-full flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src={ImageHome}
            alt="Construção de casa de madeira"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative z-10 flex h-full flex-col items-start justify-center px-2 sm:px-4 text-white md:px-6">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-center sm:text-start">
              Construindo sonhos com assertividade e tradição
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-100 sm:text-xl text-center sm:text-start">
              Especialistas em construção de casas e fornecimento de madeiras
              para seus projetos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 mx-auto justify-center md:mx-0">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-amber-800 font-bold"
                onClick={(e: any) => {
                  e.preventDefault();
                  document
                    .getElementById("produtos")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Nossos Produtos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-gray-200 font-bold"
                onClick={(e: any) => {
                  e.preventDefault();
                  document
                    .getElementById("contato")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-amber-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Building className="h-6 w-6 text-amber-800" />
              </div>
              <h3 className="mb-2 text-xl font-medium">
                Construções assertivas
              </h3>
              <p className="text-muted-foreground">
                Casas construídas com madeiras próprias, no seu estilo, no seu
                prazo.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Shield className="h-6 w-6 text-amber-800" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Madeira Certificada</h3>
              <p className="text-muted-foreground">
                Trabalhamos apenas com madeiras de origem legal e sustentável.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Truck className="h-6 w-6 text-amber-800" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Entrega Garantida</h3>
              <p className="text-muted-foreground">
                Entregamos madeiras em toda a região metropolitana e litoral
                norte, com pontualidade e segurança.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Clock className="h-6 w-6 text-amber-800" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Prazos Respeitados</h3>
              <p className="text-muted-foreground">
                Compromisso com o cronograma estabelecido em contrato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Nossos Produtos
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Conheça nossa linha completa de produtos e serviços
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              title="Construção de Casas"
              description="Projetos personalizados de casas de madeira, alvenaria ou mistas, adaptados às suas necessidades."
              imageSrc={ImageHouse.src}
            />
            <ProductCard
              title="Madeiras para Construção"
              description="Vigas, caibros, ripas, tábuas e outros materiais essenciais para sua obra."
              imageSrc={ImageWoods.src}
            />
            <ProductCard
              title="Madeiras para Acabamento"
              description="Assoalhos, forros, decks e revestimentos para dar o toque final ao seu projeto."
              imageSrc={ImageDeck.src}
            />
            <ProductCard
              title="Abertuas"
              description="Aberturas de madeira como portas e janelas, com diversos modelos e acabamentos."
              imageSrc={ImageDoor.src}
            />
          </div>
        </div>
      </section>

      <PromoSection />

      {/* História da Empresa */}
      <HistorySection />

      {/* Localização */}
      <LocationSection />

      {/* Métodos de Pagamento */}
      <PaymentSection />

      {/* Contato */}
      <section id="contato" className="!w-full bg-amber-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="!w-full gap-10 lg:grid lg:grid-cols-2">
            <div className="w-full">
              <h2 className="text-center lg:text-start text-3xl font-bold tracking-tight sm:text-4xl">
                Entre em Contato
              </h2>
              <p className="!w-full mt-4 max-[640px]:text-justify text-lg text-muted-foreground">
                Estamos prontos para atender suas necessidades. Entre em contato
                conosco para tirar dúvidas, solicitar orçamentos ou agendar uma
                visita.
              </p>

              <div className="w-full mt-8 space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-6 w-6 text-amber-700" />
                  <div>
                    <h3 className="font-medium">Endereço</h3>
                    <p className="text-muted-foreground">
                      RS-020, 3919 - Neópolis, Gravataí - RS, 94100-250
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-3 h-6 w-6 text-amber-700" />
                  <div>
                    <h3 className="font-medium">WhatsApp</h3>
                    <p className="text-muted-foreground">
                      <Link
                        href={
                          "https://api.whatsapp.com/send/?phone=5551984602351&text&type=phone_number&app_absent=0"
                        }
                        target="_blank"
                      >
                        (51) 98460-2351
                      </Link>{" "}
                      /{" "}
                      <Link
                        href={
                          "https://api.whatsapp.com/send/?phone=5551984778212&text&type=phone_number&app_absent=0"
                        }
                        target="_blank"
                      >
                        (51) 98477-8212
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-6 w-6 text-amber-700" />
                  <div>
                    <h3 className="font-medium">Telefone</h3>
                    <h3 className="text-muted-foreground">(51) 3080-2474</h3>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-3 h-6 w-6 text-amber-700" />
                  <div>
                    <h3 className="font-medium">E-mail</h3>
                    <p className="text-muted-foreground">
                      lidermadeirasgravatai@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-3 h-6 w-6 text-amber-700" />
                  <div>
                    <h3 className="font-medium">Horário de Funcionamento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 8h30 às 18h | Sábado: 9h às 14h
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Instagram className="mr-3 h-6 w-6 text-amber-700" />
                  <div className="">
                    <h3 className="font-medium">Instagram</h3>
                    <Link
                      href={"https://www.instagram.com/lidermadeirasgravatai/"}
                      target="_blank"
                      className="text-muted-foreground"
                    >
                      @lidermadeirasgravatai
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <Facebook className="mr-3 h-6 w-6 text-amber-700" />
                  <div className="">
                    <h3 className="font-medium">Facebook</h3>
                    <Link
                      href={"https://www.facebook.com/LiderMadeirasGravatai"}
                      target="_blank"
                      className="text-muted-foreground"
                    >
                      Lider Madeiras
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
