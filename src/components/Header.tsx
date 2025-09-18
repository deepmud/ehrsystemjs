"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { DeptList } from "@/types_DtoAndCommand/enums";
import { Dispatch, SetStateAction, useState } from "react";
import { Menu, X } from "lucide-react"; // nice hamburger/close icons
import { useSidebarStore } from "@/store/useSidebarStore";
export default function Header() {
  const toggleSidebar = useSidebarStore((s) => s.toggle);
  // const token = useAuthStore((s) => s.token);
  const clearToken = useAuthStore((s) => s.logout);
  const { user } = useAuthStore();


  const router = useRouter();

  if(!user){
    router.push("/Auth/login");;
  }

  if (!user) return <p>No Login User found.</p>;


  return (
    //  {/* Header */}
  <header className="flex justify-between items-center p-4 shadow bg-white dark:bg-dark relative z-50">
  {/* Hamburger (mobile only) */}
  <button
    className="block lg:hidden text-gray-600 dark:text-gray-300 z-50"
    onClick={toggleSidebar}
  >
    <i className="fas fa-bars text-2xl"></i>
  </button>

  <div>
    <h2 className="text-xl font-bold">Welcome {user?.username}!</h2>
    <p className="text-gray-600 dark:text-gray-400">
      Hospital {DeptList[user?.department]} Department Dashboard
    </p>
  </div>
</header>
  );
 }

