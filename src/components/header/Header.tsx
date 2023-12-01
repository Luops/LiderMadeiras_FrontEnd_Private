"use client";
import Link from "next/link";

import * as React from "react";

// Services
import { getUser } from "@/services/get-users";

// Context
import UserContext from "@/store/provider";

// Outros
import { destroyCookie } from "nookies";
import { BiSolidUserCircle } from "react-icons/Bi";

// CSS
import "./styles.css";

const logout = () => {
  destroyCookie(null, "userId"); // Remover o userId (usuário) dos cookies
  window.location.reload(); // Atualizar a página
};

const Header = () => {
  // Dados do usuário
  const { user }: any = React.useContext(UserContext);

  // State para verificar se foi utilizado o scroll
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Verificar se foi utilizado o scroll e mudar o state
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 15) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Acompanhar o scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          isScrolled
            ? `w-full sticky top-0 border-b shadow-[0px_0px_9px_1px_#1b191929] bg-white z-[41] px-[35px]`
            : `w-full px-[35px]`
        }
      >
        <nav className="flex w-100 items-center justify-center">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
          <ul className="ul-login">
            {user && (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            )}
            {user && (
              <div className="div-user">
                <i className="icon-user">
                  <BiSolidUserCircle />
                </i>
                <h3 key={user.id}>{user.name}</h3>
              </div>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
