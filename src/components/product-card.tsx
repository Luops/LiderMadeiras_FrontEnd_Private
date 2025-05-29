import Image from "next/image";

import { Card, CardContent, CardFooter } from "./../components/ui/card";
import { Button } from "./../components/ui/button";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export function ProductCard({
  title,
  description,
  imageSrc,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="border-t p-6 pt-4">
        <Link href={"https://www.instagram.com/lidermadeirasgravatai/"} className="w-full text-center border py-2 hover:bg-gray-100">
          Entrar em contato
        </Link>
      </CardFooter>
    </Card>
  );
}
