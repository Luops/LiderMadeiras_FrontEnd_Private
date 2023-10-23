"use client";

import * as React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

// Model
import { User } from "@/models/User";
import { Product } from "@/models/Product";

import { store } from "./store";
import { Provider } from "react-redux";

// Services
import { getUser } from "@/services/get-users";
import { getProducts } from "@/services/get-products";

const UserContext = React.createContext(null);

export async function getStaticProps() {
  try {
    const cookies = parseCookies();
    const userId = cookies.userId;
    let user = null;
    if (userId) {
      user = getUser();
    }
    return {
      props: {
        initialUser: user,
      },
      revalidate: 5, // Define o tempo em segundos para atualizar a página
    };
  } catch (e) {
    console.error("Erro ao buscar usuário:", e);
    return {
      props: {
        initialUser: null,
      },
      revalidate: 5, // Define o tempo em segundos para atualizar a página
    };
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const router = useRouter();
  const cookies = parseCookies();

  // Buscar usuário
  React.useEffect(() => {
    async function fetchUser() {
      const userId = cookies.userId;
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/user/${userId}`,
            {
              headers: {
                Authorization: `${userId}`,
              },
            }
          );
          const data = await response.json();
          setUser(data);
        } catch (e) {
          console.error("Error fetching user:", e);
        }
        // Redirecione o usuário para a página de login ou qualquer outra página desejada
        //window.location.href = "/";
      }
    }
    fetchUser();
  }, []);

  // Buscar produtos
  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts(); // Use a função getProducts para buscar os produtos

        if (productsData) {
          setProducts(productsData); // Atualize o estado dos produtos com os dados obtidos
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, products }}>
      <Provider store={store}>{children}</Provider>
    </UserContext.Provider>
  );
}

export default UserContext;
