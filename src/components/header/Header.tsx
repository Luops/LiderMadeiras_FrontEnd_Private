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
  const { user }: any = React.useContext(UserContext);

  console.log(user);
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/register">Registro</Link>
        </li>
      </ul>
      <ul className="ul-login">
        {user && (
          <button className="logout" onClick={logout}>
            Logout
          </button>
        )}
        {user ? (
          <div className="div-user">
            <i className="icon-user">
              <BiSolidUserCircle />
            </i>
            <h3 key={user.id}>{user.name}</h3>
          </div>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
