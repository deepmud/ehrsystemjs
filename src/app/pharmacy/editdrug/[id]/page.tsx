"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddCasefile, createPatient, editDrug } from "@/hooks/auth";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import  "../../../../../public/styles/index.css";
import RequireAuth from "@/components/RequireAuth";
import Navbar from "@/components/Navbar";
import { DeptList } from "@/types_DtoAndCommand/enums";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getDrug } from "@/hooks/patienthooks";
import { AddClinicalDiagnosisPrescriptionCommand } from "@/types_DtoAndCommand/patient";
import useSWR from "swr";
import { useSidebarStore } from "@/store/useSidebarStore";
//import { registrationSchema } from "@/lib/passwordschema"; // adjust path if needed


// Define Zod schema for form validation
const patientSchema = z.object({
  id: z
    .number()
    .min(1, { message: "id must be at least 2 characters" }),
    drugName: z
    .string()
    .min(1, { message: "drugName must be at  least 2 characters" }),
    duration: z
    .string()
    .min(1, { message: "duration must be at less than 6" }),
    dosage: z
    .string()
    .min(1, { message: "dosage must be at less than 6" }),
    frequency: z
    .string()
    .min(1, { message: "frequency must be at least 2 characters" }),
    dispatchComment: z.string().min(1, { message: "despatchComment is required" }),
 
  })
  



// Infer TypeScript type from Zod schema
 type AddCaseFormData = z.infer<typeof patientSchema>;

export default function AddCasePagfde(){
  const {isAuthenticated,user} = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const isOpen = useSidebarStore((s) => s.isOpen);

  useEffect(() => {
    if (!isAuthenticated()) router.push("/Auth/login");
  }, [isAuthenticated(), router]);

  


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCaseFormData>({
    resolver: zodResolver(patientSchema),
  });


  
 

  const { data  , error, isLoading } =  useSWR<AddClinicalDiagnosisPrescriptionCommand>(isAuthenticated() ? `/BookAppointment/GetDrug?id=${id}` : null, getDrug);

  useEffect(() => {
    if (data) {
      reset({
        id: id,
        drugName: data.drugName,
        duration: data.duration,
        dosage: data.dosage,
        frequency: data.frequency,
        dispatchComment: data.dispatchComment,
      });
    }
  }, [data, id, reset]);
  if(isAuthenticated()){
    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj: ', data);
}

if (error) return <p>Error loading patients</p>;
if (!data) return <p>No patients found.</p>;
if (!user) return <p>No User found.</p>;

  const onSubmit1 = async (data2: AddCaseFormData) => {
    console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkk1:")
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data2);

      const res = await editDrug(data2);


      console.log("okkkkkkkkk1:", res.response);

      
         if (res.response === "success") {
          toast.success("Case file addition  successfully!");
        }else{
          toast.error("Case file addition failed!");
    
        }

        router.back();

     
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
          <form onSubmit={handleSubmit(onSubmit1)} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            
                <div className="sm:col-span-1">
                  <label
                    htmlFor="drugName"
                    className="block text-sm font-medium text-gray-700"
                  >
                     Name *
                  </label>
                
 
                  <div className="mt-1">
                    <input
                      type="text"
                      id="drugName"
                      disabled
                      {...register("drugName")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.drugName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.drugName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.drugName.message}
                      </p>
                    )}
                  </div>
                </div>

               
  
                

                <div className="sm:col-span-1">
                  <label
                    htmlFor="dosage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dosage *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      disabled
                      id="dosage"
                      {...register("dosage")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.dosage ? "border-red-500" : ""
                      }`}
                    />
                    {errors.dosage && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.dosage.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Frequency *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      disabled
                      id="dosage"
                      {...register("frequency")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.dosage ? "border-red-500" : ""
                      }`}
                    />
                    {errors.frequency && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.frequency.message}
                      </p>
                    )}
                  </div>
                </div>
   
                <div className="sm:col-span-6">
                  <label
                    htmlFor="dispatchComment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dispatch Comment *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="dispatchComment"

                      {...register("dispatchComment")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.dispatchComment ? "border-red-500" : ""
                      }`}
                    />
                    {errors.dispatchComment && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.dispatchComment.message}
                      </p>
                    )}
                  </div>
                </div>

<input type="number" hidden {...register("id")}/>
               
              </div>
            </div>

           
              <button
                type="submit"
               
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
               Save
              </button>
            
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
  )
}
