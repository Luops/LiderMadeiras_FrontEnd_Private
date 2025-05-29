import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(10, "Telefone deve ter no mínimo 10 dígitos")
    .max(15, "Telefone muito longo")
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
  receberPromos: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar para continuar" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

function PromoSection() {
  const [success, setSuccess] = React.useState<boolean | null>(null);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        setApiError(null);
        reset();
      } else {
        setSuccess(false);
        setApiError(result.message || "Erro desconhecido da API");
      }
    } catch {
      setSuccess(false);
      setApiError("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <section
      id="promo"
      className="py-16 bg-gradient-to-br from-amber-100 to-amber-50"
    >
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4 text-amber-900">
          Receba promoções especiais antes de todo mundo!
        </h2>
        <p className="max-w-xl mb-8 text-lg text-muted-foreground">
          Cadastre-se para ser avisado assim que tivermos promoções de madeiras,
          kits e casas.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-amber-200"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Input placeholder="Seu nome completo" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                placeholder="Seu e-mail"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                placeholder="Seu telefone"
                type="tel"
                {...register("phone")}
              />
              <p className="text-xs text-muted-foreground text-start mt-1">
                Ex.: 51987654321
              </p>
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="receberPromos"
              {...register("receberPromos")}
              className="h-5 w-5 accent-amber-600"
            />
            <label htmlFor="wantsPromo" className="text-sm text-gray-700">
              Quero receber promoções exclusivas e antecipadas.
            </label>
          </div>
          {errors.receberPromos && (
            <p className="text-start text-xs text-red-600">
              {errors.receberPromos.message}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 font-bold w-full"
          >
            Quero ser avisado!
          </Button>

          {success === true && (
            <div className="flex items-center justify-center text-green-700 mt-2">
              <CheckCircle className="w-5 h-5 mr-2" />
              Cadastro realizado com sucesso!
            </div>
          )}
          {success === false && (
            <p className="text-red-600 mt-2">
              Ocorreu um erro. Tente novamente.
            </p>
          )}
          {apiError && <p className="text-red-600 mt-2">{apiError}</p>}
        </form>
      </div>
    </section>
  );
}

export default PromoSection;
