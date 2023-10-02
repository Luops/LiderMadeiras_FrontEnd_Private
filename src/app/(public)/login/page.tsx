"use client";

import * as React from "react";

// CSS
import "./styles.css";

// Components Material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { fetchLogin } from "@/store/slices/authSlice";
import { parseCookies } from "nookies";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cookies = parseCookies();
  const userId = cookies.userId;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(fetchLogin(values));
    },
  });

  // Enviar para Home caso haja userId nos cookies
  if (userId) {
    // Atualizar a página
    window.location.reload();

    // Ou redirecionar para uma página específica
    window.location.href = "/";
  }

  return (
    <>
      <main>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "450px",
            justifyContent: "center",
            alignItems: "center",
            margin: "15px 0 0 0",
            gap: "15px",
            padding: "35px 15px",
            backgroundColor: "rgba(217, 217, 217, 0.52)",
            borderRadius: "15px",
            boxShadow: "0px 10px 22px 0px rgba(0, 0, 0, 0.299)",
          }}
          noValidate
          autoComplete="off"
        >
          <h3>Faça o Login aqui!</h3>
          <TextField
            id=" email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            sx={{
              width: "100%",
              backgroundColor: "white",
            }}
          />
          <TextField
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            sx={{
              width: "100%",
              backgroundColor: "white",
            }}
          />
          <Button
            onClick={() => formik.handleSubmit()}
            variant="contained"
            size="large"
            sx={{
              width: "100%",
            }}
          >
            Entrar
          </Button>
        </Box>
      </main>
    </>
  );
}
