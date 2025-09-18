// src/lib/api.ts
import { useAuthStore } from "@/store/useAuthStore";
//import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
console.log('baseurl: ',baseURL);
export default async function  apiFetch<T>(
    endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  //const token = Cookies.get("token");
  const token = useAuthStore.getState().token;
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${baseURL}${endpoint}`, { ...options, headers });
console.log('res: ',res);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }
    
  return res.json() as Promise<T>;
}

