import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: User;
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
  expiration: 0,
  message: "",
};

export const fetchLogin = createAsyncThunk("auth/login", async (data: {}) => {
  const response = await axios
    .post("http://localhost:4000/api/login", data, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authenticate",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
    .then((res) => res.data);

  console.log(response);
  return response;
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
