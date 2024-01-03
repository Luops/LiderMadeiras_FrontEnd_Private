import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

import { parseCookies, setCookie } from "nookies";

import { cookies } from "next/headers";

interface AuthState {
  user: User;
  userId: string;
  expiration: number;
  message: string;
}

// Estado inicial do sistema de autenticação
const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    lastname: "",
    age: 0,
    email: "",
    role: -1,
  },
  userId: "",
  expiration: 0,
  message: "",
};

export const fetchLogin = createAsyncThunk("auth/login", async (data: {}) => {
  try {
    const response = await axios.post(
      "https://lidermadeiras-api.onrender.com/api/login",
      data,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "authenticate",
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );

    console.log("Login:", response);
    
    // Armazene o userId do usuário no cookie
    setCookie(null, 'userId', response.data.userId, {
      maxAge: 30 * 24 * 60 * 60, // Define a duração do cookie em segundos
      path: '/', // Define o caminho do cookie (opcional)
    });

    return response.data;
  } catch (error) {
    console.error("Erro durante o login:", error);
    throw error;
  }
});

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},

});

export default AuthSlice.reducer;
export const {} = AuthSlice.actions;
