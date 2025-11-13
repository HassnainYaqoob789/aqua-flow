// src/store/useAuthStore.ts
import { create } from "zustand";
import { LoginResponse } from "@/lib/types/auth";

interface AuthState {
  user: LoginResponse["user"] | null;
  token: string | null;
  setAuth: (data: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
    }
    set({ user: data.user, token: data.token });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ user: null, token: null });
  },
}));
