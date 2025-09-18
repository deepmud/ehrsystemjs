"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const {isAuthenticated,user} = useAuthStore();
  const router = useRouter();
console.log('isAuthenticated...////....: ', isAuthenticated())
useEffect(() => {
  if (!isAuthenticated() && (user?.department == 'PA')) router.push("/Auth/login");
}, [isAuthenticated(), router]);

  if (!isAuthenticated()) return null; // avoid flicker

  return <>{children}</>;
}
