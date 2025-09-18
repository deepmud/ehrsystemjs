"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddCasefile, createPatient } from "@/hooks/auth";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import  "../../../../../public/styles/index.css";
import RequireAuth from "@/components/RequireAuth";
import Navbar from "@/components/Navbar";
import { DeptList } from "@/types_DtoAndCommand/enums";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useSidebarStore } from "@/store/useSidebarStore";
//import { registrationSchema } from "@/lib/passwordschema"; // adjust path if needed


// Define Zod schema for form validation
const patientSchema = z.object({
  regno: z
    .string()
    .min(2, { message: "regno must be at least 2 characters" }),
    referalSourceId: z
    .string()
    .max(5, { message: "referalSourceId must be at  least 2 characters" }),
    severity: z
    .string()
    .max(10, { message: "severity must be at less than 6" }),
    diagnosis: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
    dateSymptomsStarted: z.string().min(1, { message: "Date of birth is required" }),
  symptoms: z.string().min(5, { message: "Please enter a valid address" }),
 
  })
  


// Infer TypeScript type from Zod schema
 type AddCaseFormData = z.infer<typeof patientSchema>;

export default function AddCasePage(){
  const {isAuthenticated,user} = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!isAuthenticated()) router.push("/Auth/login");
  }, [isAuthenticated(), router]);

     const isOpen = useSidebarStore((s) => s.isOpen);
  


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCaseFormData>({
    resolver: zodResolver(patientSchema),
  });


  const onSubmit = async (data: AddCaseFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);

      const res = await AddCasefile(data);


      console.log("okkkkkkkkk1:", res.response);

      
         if (res.response === "success") {
          toast.success("Case file addition  successfully!");
        }else{
          toast.error("Case file addition failed!");
    
        }
      reset();

      router.push(`/medicalrecords/getcasefiles/${id}`);
     
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  
    // const isOpen = useSidebarStore((s) => s.isOpen);
    
  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
    <Navbar/>

      {/* Main Content */}
    {/* Main Content */}
<div className="flex-1 flex flex-col transition-all duration-300 lg:mx-5">
  {/* Header */}
  <Header/>

            {/* <!-- Main Content Grid --> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* <!-- Left Column --> */}
                <div className="lg:col-span-2 space-y-6">
                    {/* <!-- Appointment Section --> */}
                    <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                      
                        <div className="overflow-x-auto">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    regno
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="email"
                      value={id}
                      {...register("regno")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.regno ? "border-red-500" : ""
                      }`}
                    />
                    {errors.regno && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.regno.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Diagnosis *
                  </label>
                
 
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastname"
                      
                      {...register("diagnosis")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.diagnosis ? "border-red-500" : ""
                      }`}
                    />
                    {errors.diagnosis && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.diagnosis.message}
                      </p>
                    )}
                  </div>
                </div>

               

                <div className="sm:col-span-6">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Symptoms *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="phone"
                      {...register("symptoms")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.symptoms ? "border-red-500" : ""
                      }`}
                    />
                    {errors.symptoms && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.symptoms.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    severity *
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      {...register("severity")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.severity ? "border-red-500" : ""
                      }`}
                    >
                     
                      <option value="">Select Case Severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                      <option value="Critical">Critical</option>
                      
                    </select>
                    {errors.severity && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.severity.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of symptom start *
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="dateOfBirth"
                      {...register("dateSymptomsStarted")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.dateSymptomsStarted ? "border-red-500" : ""
                      }`}
                    />
                    {errors.dateSymptomsStarted && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.dateSymptomsStarted.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    referal Source Id *
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      {...register("referalSourceId")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.referalSourceId ? "border-red-500" : ""
                      }`}
                    >

                      <option value="">Select referal Source</option>
                      <option value="1">Self</option>
                      <option value="2">Internal</option>
                      <option value="3">External</option>
                      <option value="4">Insurance</option>
                    </select>
                    {errors.referalSourceId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.referalSourceId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

           

            {/* Form Submission */}
            <div className="flex justify-end">
              
              <button
                type="submit"
               
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
               submit
              </button>
            </div>
          </form>
        </div>
                        </div>
                    </div>

                    {/* <!-- Patient Statistic --> */}
                   
                </div>

                
            </div>

          {/* Stats Cards */}
          {/* ✅ The rest of your dashboard content stays EXACTLY the same, just with className instead of class */}
          {/* Copy-paste everything below, replacing "class" with "className" */}
        </div>
      </div>
    
    </RequireAuth>
  );
}
