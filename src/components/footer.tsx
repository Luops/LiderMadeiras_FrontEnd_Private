import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// Images
import LiderLogo from "../images/liderLogo.webp";

export function Footer() {
  const handleSmoothScoll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
  };
  return (
    <footer className="bg-amber-900 text-white">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src={LiderLogo}
                alt="Logo Construtora"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold uppercase">
                Lider Madeiras
              </span>
            </Link>
            <p className="mt-2 text-amber-200">
              Construindo sonhos e fornecendo madeiras de qualidade desde 2010.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link
                href={"https://www.facebook.com/LiderMadeirasGravatai"}
                target="_blank"
                className="text-amber-200 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={"https://www.instagram.com/lidermadeirasgravatai/"}
                target="_blank"
                className="text-amber-200 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Produtos</h3>
            <ul className="space-y-2 text-amber-200">
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#produtos")}
                  className="hover:text-white"
                >
                  Construção de Casas
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#produtos")}
                  className="hover:text-white"
                >
                  Madeiras para Construção
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#produtos")}
                  className="hover:text-white"
                >
                  Madeiras para Acabamento
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#produtos")}
                  className="hover:text-white"
                >
                  Aberturas
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Links Rápidos</h3>
            <ul className="space-y-2 text-amber-200">
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#")}
                  className="hover:text-white"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#promo")}
                  className="hover:text-white"
                >
                  Promoções
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#historia")}
                  className="hover:text-white"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#localizacao")}
                  className="hover:text-white"
                >
                  Localização
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#pagamentos")}
                  className="hover:text-white"
                >
                  Métodos de Pagamento
                </button>
              </li>
              <li>
                <button
                  onClick={(e: any) => handleSmoothScoll(e, "#contato")}
                  className="hover:text-white"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Contato</h3>
            <ul className="space-y-3 text-amber-200">
              <li className="flex">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                <span>RS-020, 3919 - Neópolis, Gravataí - RS, 94100-250.</span>
              </li>
              <li>
                <Link
                  href={
                    "https://api.whatsapp.com/send/?phone=5551984602351&text&type=phone_number&app_absent=0"
                  }
                  target="_blank"
                  className="flex"
                >
                  <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
                  <span>(51) 98460-2351</span>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    "https://api.whatsapp.com/send/?phone=5551984778212&text&type=phone_number&app_absent=0"
                  }
                  target="_blank"
                  className="flex"
                >
                  <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
                  <span>(51) 98477-8212</span>
                </Link>
              </li>
              <li className="flex">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
                <span>(51) 3080-2474</span>
              </li>
              <li className="flex w-full ">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="w-[95%] break-words">
                  lidermadeirasgravatai@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-amber-800 pt-6 text-center text-amber-200">
          <p>
            © {new Date().getFullYear()} Lider Madeiras. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
