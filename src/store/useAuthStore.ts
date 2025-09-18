"use client";

import { create } from "zustand";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";



interface MyClaims {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  Department: string;
  exp: number;
  iss: string;
  aud: string;
}
type User ={
  id: string;
  role: string;
  username: string;
  department: string;
  exp:number
}

type AuthState = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,

  login: (token: string) => {
    try {
      const decoded = jwtDecode<MyClaims>(token);
      const user = {
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        department: decoded.Department,
        exp: decoded.exp
      };
      // store in Zustand
      set({ token, user });
      console.log('decoded token[[[[[[[]]]]]]]: ', user);
      // persist in cookie
      Cookies.set("auth_token", token, { sameSite: "strict" });
    } catch (err) {
      console.error("Invalid JWT", err);
    }
  },

  logout: () => {
    Cookies.remove("auth_token");
    set({ token: null, user: null });
  },

  isAuthenticated: () => {
    const { token, user } = get();
    if (!token || !user) return false;

    const now = Date.now() / 1000;
    return user.exp > now;
  },
}));

// 🔹 Hydrate store from cookie on app start
const token = Cookies.get("auth_token");
if (token) {
  try {
    const decoded = jwtDecode<MyClaims>(token);
      const user = {
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
         username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        department: decoded.Department,
        exp:decoded.exp
      };
    useAuthStore.setState({ token, user });
  } catch (err) {
    Cookies.remove("auth_token");
  }
}
