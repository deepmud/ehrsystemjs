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
import { getCaseFiles, getEditDiagnosis } from "@/hooks/patienthooks";
import { GetCaseFilesDto } from "@/types_DtoAndCommand/appointment";
import useSWR from "swr";
import { AddClinicalDiagnosisCommand, AddClinicalDiagnosisPrescriptionCommand, FetchAddClinicalDiagnosisCommand } from "@/types_DtoAndCommand/patient";
import { useSidebarStore } from "@/store/useSidebarStore";
//import { registrationSchema } from "@/lib/passwordschema"; // adjust path if needed

const PrescriptionSchema = z.object({
  duration: z.string().min(1, "Duration is required"),
  drugName: z.string().min(1, "Drug name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  // despatchComment: z.string().optional(),
  frequency: z.string().min(1, "Frequency is required"),
});

const MedicalCaseSchema = z.object({
  bloodPressure: z.string().min(1, "Blood Pressure is required"),
  heartRate: z.string().min(1, "Heart Rate is required"),
  temperature: z.string().min(1, "Temperature is required"),
  respiratoryRate: z.string().min(1, "Respiratory Rate is required"),
  id: z.string().min(1, "Respiratory Rate is required"),
  appointmentDate: z.string().optional(),

  physicalExam: z.string().min(4, "physical Exam is required.if none 'Good'"),
  provisionalDiagnosis: z.string().min(1, "provisional Diagnosis is required"),
  finalDiagnosis: z.string().min(1, "final Diagnosis is required"),
  treatmentPlan: z.string().min(2, "treatment Plan is required.if none 'No'"),
  therapyPlan: z.string().min(2, "therapy Plan is required.if none 'No'"),
  lifeStyleAdvice: z.string().min(2, "therapy Plan is required.if none 'No'"),

  prescriptions: z.array(PrescriptionSchema),
  //.min(1, "At least one prescription is required"),
});

// Infer TypeScript type from Zod schema
type AddClinicalDiagnosisCommand2 = z.infer<typeof MedicalCaseSchema>;

export default function AddCasePage() {
  const { isAuthenticated, user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
    const isOpen = useSidebarStore((s) => s.isOpen);

  useEffect(() => {
    if (!isAuthenticated()) router.push("/Auth/login");
  }, [isAuthenticated(), router]);

  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddClinicalDiagnosisCommand2>({
    resolver: zodResolver(MedicalCaseSchema),
    // defaultValues: {
    //   bloodPressure: "",
    //   heartRate: "",
    //   temperature: "",
    //   respiratoryRate: "",
    //   prescriptions: [
    //     { duration: "", drugName: "", dosage: "", frequency: "" },
    //   ],
    // },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescriptions",
  });


  const { data  , error, isLoading } =  useSWR<FetchAddClinicalDiagnosisCommand>(isAuthenticated() ? `/BookAppointment/GetDoctorsAppointment?appid=${id}` : null, getEditDiagnosis);
  if(isAuthenticated()){
    console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj: ', data);
}

if (error) return <p>Error loading patients</p>;
if (!data) return <p>No patients found.</p>;
if (!user) return <p>No User found.</p>;

  const onSubmit = async (data2: AddClinicalDiagnosisCommand2) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data2);
      console.log("clinicalllllll:", data2);

      const res = await createEditDiagnosis(data2);

      await setSubmitSuccess(true);

      if (res.response === "success") {
        toast.success("Dashboard loaded successfully!");
      } else {
        toast.error("Dashboard loaded failed!");
      }
      reset();

      router.push(`/dashboard`)
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
            <div className="grid grid-cols-1 lg:grid-cols- gap-6">
              {/* <!-- Left Column --> */}
              <div className="lg:col-span-2 space-y-6">
                {/* <!-- Appointment Section --> */}
                <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                  <div className="overflow-x-auto">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6 space-y-6"
                      >
                        {/* Personal Information Section */}
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
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="heartRate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Heart Rate (mmHg)*
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  defaultValue={data?.heartRate}
                                  id="heartRate"
                                  {...register("heartRate")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.heartRate ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.heartRate && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.heartRate.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="temperature"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Temperature (C) *
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  defaultValue={data?.temperature}
                                  id="temperature"
                                  {...register("temperature")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.temperature ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.temperature && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.temperature.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="respiratoryRate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Respiratory Rate (breaths per minute) *
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  defaultValue={data?.respiratoryRate}
                                  id="respiratoryRate"
                                  {...register("respiratoryRate")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.respiratoryRate
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                />
                                {errors.respiratoryRate && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.respiratoryRate.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="bloodPressure"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Blood Pressure (beats per minute) *
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  defaultValue={data?.bloodPressure}
                                  id="bloodPressure"
                                  placeholder="systolic/diastolic"
                                  {...register("bloodPressure")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                                    errors.bloodPressure ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.bloodPressure && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.bloodPressure.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="appointmentDate"
                                className="block text-sm font-medium text-gray-700"
                              >
                               Appointment Date *
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  value={data?.appointmentDate}
                                  id="appointmentDate"
                                  placeholder=""
                                  {...register("appointmentDate")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                                    errors.appointmentDate ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.appointmentDate && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.appointmentDate.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="sm:col-span-6">
                              <label
                                htmlFor="physicalExam"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Physical Exam *
                              </label>
                              <div className="mt-1">
                                <textarea
                                  defaultValue={data?.physicalExam}
                                  id="physicalExam"
                                  {...register("physicalExam")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.physicalExam ? "border-red-500" : ""
                                  }`}
                                />

                                {errors.physicalExam && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.physicalExam.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                          <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Diagnosis & Treatment
                          </h2>
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                              <label
                                htmlFor="provisionalDiagnosis"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Provisional Diagnosis
                              </label>
                              <div className="mt-1">
                              <textarea
                                  defaultValue={data?.provisionalDiagnosis}
                                  id="provisionalDiagnosis"
                                  {...register("provisionalDiagnosis")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.provisionalDiagnosis ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.provisionalDiagnosis && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.provisionalDiagnosis.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <label
                                htmlFor="finalDiagnosis"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Final Diagnosis
                              </label>
                              <div className="mt-1">
                              <textarea
                                  id="finalDiagnosis"
                                  defaultValue={data?.finalDiagnosis}
                                  {...register("finalDiagnosis")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.finalDiagnosis ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.finalDiagnosis && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.finalDiagnosis.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <label
                                htmlFor="treatmentPlan"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Treatment Plan
                              </label>
                              <div className="mt-1">
                              <textarea
                                  id="treatmentPlan"
                                  defaultValue={data?.treatmentPlan}
                                  {...register("treatmentPlan")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.treatmentPlan ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.treatmentPlan && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.treatmentPlan.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <label
                                htmlFor="therapyPlan"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Therapy Plan
                              </label>
                              <div className="mt-1">
                              <textarea
                                  id="therapyPlan"
                                  defaultValue={data?.therapyPlan}
                                  {...register("therapyPlan")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.therapyPlan ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.therapyPlan && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.therapyPlan.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <label
                                htmlFor="lifeStyleAdvice"
                                className="block text-sm font-medium text-gray-700"
                              >
                                LifeStyle Advice
                              </label>
                              <div className="mt-1">
                              <textarea
                                  defaultValue={data?.lifeStyleAdvice}
                                  id="lifeStyleAdvice"
                                  {...register("lifeStyleAdvice")}
                                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                                    errors.lifeStyleAdvice ? "border-red-500" : ""
                                  }`}
                                />
                                {errors.lifeStyleAdvice && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.lifeStyleAdvice.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      
                        <div className="border-b border-gray-200 pb-6">
                          <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Any Prescription?{" "}
                            <button
                              onClick={() =>
                                append({
                                  duration: "",
                                  drugName: "",
                                  dosage: "",
                                  frequency: "",

                                })
                              }
                              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm"
                            >
                              +Add Prescription
                            </button>
                          </h2>
                          {fields.map((field, index) => (
                            <div
                              key={field.id}
                              className=" pb-6 grid grid-cols-4 gap-2 mb-2"
                            >
                              <input
                                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                                  errors.prescriptions?.[index]?.drugName
                                    ? "border-red-500"
                                    : ""
                                }`}
                                placeholder="Drug Name"
                                {...register(`prescriptions.${index}.drugName`)}
                              />
                              {/* {errors.prescriptions?.[index]?.drugName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.prescriptions?.[index]?.drugName?.message}
                      </p>
                    )} */}
                              <input
                                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                                  errors.prescriptions?.[index]?.duration
                                    ? "border-red-500"
                                    : ""
                                }`}
                                placeholder="Duration"
                                {...register(`prescriptions.${index}.duration`)}
                              />
                            

                              <input
                                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                                  errors.prescriptions?.[index]?.dosage
                                    ? "border-red-500"
                                    : ""
                                }`}
                                placeholder="Dosage"
                                {...register(`prescriptions.${index}.dosage`)}
                              />
                             
                              <input
                                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                                  errors.prescriptions?.[index]?.frequency
                                    ? "border-red-500"
                                    : ""
                                }`}
                                placeholder="Frequency"
                                {...register(
                                  `prescriptions.${index}.frequency`
                                )}
                              />
                             {/* <input
                                disabled
                                className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                                  errors.prescriptions?.[index]?.despatchComment
                                    ? "border-red-500"
                                    : ""
                                }`}
                                placeholder="despatch Comment"
                                {...register(
                                  `prescriptions.${index}.despatchComment`
                                )}
                              /> */}

                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 "
                              >
                                Remove
                              </button>

                            </div>

                          ))}
                        </div>

<input type="text" value={id} hidden {...register("id")}/>

                      
                        {/* Form Submission */}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => reset()}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
                          >
                            Reset
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Registering...
                              </>
                            ) : (
                              "Save"
                            )}
                          </button>
                        </div>
                      </form>

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
                                        <td className="py-3">{p.dispatchComment}</td>
                                        <td className="py-3"><button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm"  onClick={() => router.push(`/doctor/editdrug/${p.id}`)}>Edit</button></td>
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
