"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSidebarStore } from "@/store/useSidebarStore";
// import { Menu, X } from "lucide-react"; // nice hamburger/close icons#


export default function Sidebar() {
  const { isOpen, close } = useSidebarStore();
  const clearToken = useAuthStore((s) => s.logout);
  const { user } = useAuthStore();


  const router = useRouter();

  if(user == null){
    router.push("/Auth/login");;
  }
  const handleLogout = () => {
    clearToken();
    router.push("/Auth/login");
  };

  
  const doc= ['DO'];
  const docPharm = ['DO','PH',];
  const all = ['DO','RE','NU','PH'];
  const recNurDoc = ['DO','RE','NU',];
  const rec = ['RE'];
  const nurDoc = ['DO','NU'];
  const pharmacy = ['PH'];
  let time =  Date.now() /1000

  return (
<div
className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark shadow-lg transform transition-transform duration-300
${isOpen ? "translate-x-0" : "-translate-x-full"} 
lg:translate-x-0 lg:static lg:inset-auto`}
>
<div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
  <h1 className="text-2xl font-bold text-primary dark:text-blue-400">
  medi-cloud
  </h1>
  {/* Close button (mobile only) */}
  <button
    className="lg:hidden text-gray-600 dark:text-gray-300"
    onClick={close} 
  >
    <i className="fas fa-times"></i>
  </button>
</div>
<nav className="mt-5">
      { user && all.includes(user.department) && (
         <Link
         href="/dashboard/"
         className="block px-4 py-2 text-sm font-medium  hover:text-primary dark:hover:text-blue-400"
       >
         Dashboard
       </Link>
      )}
  
      
      {/* { user && nurDoc.includes(user.department) && (
       
         <Link
         href="#"
         className="block px-4 py-2 text-sm font-medium  hover:text-primary dark:hover:text-blue-400"
       >
          Manage Medical History
       </Link>
      )} */}
  
     
      { user && all.includes(user.department) && (
        <Link
        href="/medicalrecords/getdepartmentappointments"
        className="block px-4 py-2 text-sm font-medium  hover:text-primary dark:hover:text-blue-400"
      >
        Manage Appointments
      </Link>
          
      )}
  
      { user && recNurDoc.includes(user.department) && (
      <Link
      href="/medicalrecords/getusers"
      className="block px-4 py-2 text-sm font-medium  hover:text-primary dark:hover:text-blue-400"
      >
      Manage Users
      </Link>
      )}
  
      <a
        onClick={handleLogout}
        className="block px-4 py-2 text-sm font-medium hover:text-primary dark:hover:text-blue-400"
      >
        Log out
      </a>
    </nav>
</div>

  );
 }
 