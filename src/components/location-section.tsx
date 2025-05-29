import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";

export function LocationSection() {
  return (
    <section id="localizacao" className="bg-amber-50 py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nossa Localização
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Visite nossa loja e conheça nossos produtos
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="relative h-full w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.4596663583816!2d-51.0369661!3d-29.9086662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197316e418047f%3A0xaa4d6b3239d31ad8!2sRS-020%2C%203919%20-%20Ne%C3%B3polis%2C%20Gravata%C3%AD%20-%20RS%2C%2094100!5e0!3m2!1spt-BR!2sbr!4v1748271114217!5m2!1spt-BR!2sbr"
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-amber-100 p-3">
                <MapPin className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Endereço</h3>
                <p className="mt-2 text-muted-foreground">
                  RS-020, 3919 - Neópolis, Gravataí - RS, 94100-250.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-amber-100 p-3">
                <Clock className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  Horário de Funcionamento
                </h3>
                <div className="mt-2 grid gap-1 text-muted-foreground">
                  <p>Segunda a Sexta: 8h30 às 18h</p>
                  <p>Sábado: 9h às 16h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-amber-100 p-3">
                <Phone className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Telefones</h3>
                <div className="mt-2 grid gap-1 text-muted-foreground">
                  <Link
                    href={
                      "https://api.whatsapp.com/send/?phone=5551984602351&text&type=phone_number&app_absent=0"
                    }
                    target="_blank"
                  >
                    WhatsApp: (51) 98460-2351
                  </Link>
                  <Link
                    href={
                      "https://api.whatsapp.com/send/?phone=5551984778212&text&type=phone_number&app_absent=0"
                    }
                    target="_blank"
                  >
                    WhatsApp: (51) 98477-8212
                  </Link>
                  <p>Loja: (51) 3080-2474</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-amber-100 p-4 text-amber-800">
              <p className="font-medium">Dica:</p>
              <p className="mt-1">
                Estamos localizados próximo ao viaduto da RS-118 com a RS-020.
                Somos a <span className="font-bold">primeira loja</span> depois
                do viaduto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
