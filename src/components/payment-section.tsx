import Image from "next/image";
import {
  CreditCard,
  Landmark,
  Banknote,
  Receipt,
  Clock,
  ShieldCheck,
  Car,
} from "lucide-react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

// Images
import EloLogo from "../images/elo.svg";
import MasterLogo from "../images/mastercard.svg";
import HiperLogo from "../images/hipercard.svg";
import VisaLogo from "../images/visa.svg";

export function PaymentSection() {
  return (
    <section id="pagamentos" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Métodos de Pagamento
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Oferecemos diversas opções para facilitar sua compra
          </p>
        </div>

        <div className="grid gap-8 min-[680px]:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <CreditCard className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Cartão de Crédito</h3>
            <p className="text-muted-foreground">
              Aceitamos as principais bandeiras de cartões de crédito, com
              parcelamento em até 18x, dependendo do valor da compra.
            </p>
            <div className="mt-4 flex flex-row gap-2 justify-center min-[680px]:justify-start">
              <Image
                src={VisaLogo}
                alt="Visa"
                width={40}
                height={30}
                className="h-12 min-[460px]:h-16 w-12 min-[460px]:w-16 text-amber-700"
              />
              <Image
                src={MasterLogo}
                alt="MasterCard"
                width={40}
                height={30}
                className="h-12 min-[460px]:h-16 w-12 min-[460px]:w-16 text-amber-700"
              />
              <Image
                src={EloLogo}
                alt="Elo"
                width={40}
                height={30}
                className="h-12 min-[460px]:h-16 w-12 min-[460px]:w-16 text-amber-700"
              />
              <Image
                src={HiperLogo}
                alt="HiperCard"
                width={40}
                height={30}
                className="h-12 min-[460px]:h-16 w-12 min-[460px]:w-16 text-amber-700"
              />
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Landmark className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Transferência Bancária</h3>
            <p className="text-muted-foreground">
              Realize transferências bancárias ou PIX para nossa conta.
              Oferecemos desconto especial para pagamentos à vista por este
              método.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Banknote className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Dinheiro</h3>
            <p className="text-muted-foreground">
              Pagamentos em dinheiro são aceitos em nossa loja física, com
              descontos especiais para pagamentos à vista.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Car className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Automóvel</h3>
            <p className="text-muted-foreground">
              Aceitamos seu automóvel como parte do pagamento. Fazemos avaliação
              gratuita e justa do seu veículo para desconto na compra.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <ShieldCheck className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Pagamento Seguro</h3>
            <p className="text-muted-foreground">
              Todos os nossos métodos de pagamento são seguros e protegidos.
              Emitimos nota fiscal para todas as compras.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-lg bg-amber-100 p-6 text-center">
          <h3 className="text-xl font-medium text-amber-800">
            Condições Especiais
          </h3>
          <p className="mt-2 text-amber-700">
            Para compras em grande volume, oferecemos condições especiais de
            pagamento. Entre em contato com nossa equipe para mais informações.
          </p>
        </div>
      </div>
    </section>
  );
}
