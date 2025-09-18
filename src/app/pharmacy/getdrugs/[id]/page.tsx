"use client";

import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddCasefile, createEditDiagnosis } from "@/hooks/auth";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "../../../../../public/styles/index.css";
import RequireAuth from "@/components/RequireAuth";
import Navbar from "@/components/Navbar";
import { DeptList } from "@/types_DtoAndCommand/enums";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getCaseFiles, getEditDiagnosis, getEditPrescription } from "@/hooks/patienthooks";
import { GetCaseFilesDto } from "@/types_DtoAndCommand/appointment";
import useSWR from "swr";
import { AddClinicalDiagnosisCommand, AddClinicalDiagnosisPrescriptionCommand, FetchAddClinicalDiagnosisCommand, FetchAddPrescriptionCommand } from "@/types_DtoAndCommand/patient";
import { useSidebarStore } from "@/store/useSidebarStore";
//import { registrationSchema } from "@/lib/passwordschema"; // adjust path if needed


export default function AddCasePage() {
  const { isAuthenticated, user } = useAuthStore();
    const isOpen = useSidebarStore((s) => s.isOpen);

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!isAuthenticated()) router.push("/Auth/login");
  }, [isAuthenticated(), router]);

  
  const { data  , error, isLoading } =  useSWR<FetchAddPrescriptionCommand>(isAuthenticated() ? `/BookAppointment/GetPharmacyAppointment?appid=${id}` : null, getEditPrescription);
  if(isAuthenticated()){
    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj: ', data);
}

if (error) return <p>Error loading patients</p>;
if (!data) return <p>No patients found.</p>;
if (!user) return <p>No User found.</p>;

  
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
            <div className="grid grid-cols-1 lg:grid-cols- gap-6">
              {/* <!-- Left Column --> */}
              <div className="lg:col-span-2 space-y-6">
                {/* <!-- Appointment Section --> */}
                <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                  <div className="overflow-x-auto">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                    
                    <div className="border-b border-gray-200 pb-6">
                          <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Clinical Diagnosis
                          </h2>
                          <h3 className=" font-medium text-gray-900 mb-4">
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-xs">
                              Name: {data.name}
                            </span>
                            <span className="px-2 py-1 bg-green-400 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs">
                              Reg no: {data.regno}
                            </span>
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs">
                              Symptoms: {data.symptoms}
                            </span>
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs">
                              Self diagnosis: {data.selfdiagnosis}
                            </span>
                            <span className="px-2 py-1 bg-red-100 dark:bg-cyan-900 text-red-800 dark:text-red-200 rounded-full text-xs">
                              Appointment id: {id}
                            </span>
                          </h3>
                         
                        </div>

                    
                     

                      <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Prescriptions</h3>
                            <div className="flex space-x-2">
                                
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left  border-b dark:border-gray-700">
                                        <th className="pb-3">S/N</th>
                                        <th className="pb-3">Drug Name</th>
                                        <th className="pb-3">dosage</th>
                                        <th className="pb-3">duration</th>
                                        <th className="pb-3">frequency</th>
                                        <th className="pb-3">Date Created</th>
                                        <th className="pb-3">Despatch Comment</th>
                                        <th className="pb-3"></th>
                                    </tr>
                                </thead>
                             
                                <tbody>
                                { (data?.prescriptions.length > 0) ?
                                data?.prescriptions.map((p: AddClinicalDiagnosisPrescriptionCommand) => (
                                    <tr className="border-b dark:border-gray-700" key={data.prescriptions.indexOf(p)+1}>
                                        <td className="py-3" >{data.prescriptions.indexOf(p)+1}</td>
                                        <td className="py-3" >{p.drugName}</td>
                                        <td className="py-3" >{p.dosage}</td>
                                        <td className="py-3">{p.duration}</td>
                                        <td className="py-3">{p.frequency}</td>
                                        <td className="py-3">{p.dateCreated}</td>
                                        <td className="py-3">{p.dispatchComment}</td>
                                        <td className="py-3"><button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm"  onClick={() => router.push(`/pharmacy/editdrug/${p.id}`)}>Edit</button></td>
                                    </tr>
                                     )) :

                                     <p>no data</p>
                                 }
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
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
