"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPatient } from "@/hooks/auth";

import  "../../../../public/styles/index.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// Define Zod schema for form validation
const patientSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
    middlename: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  streetAddress: z.string().min(5, { message: "Please enter a valid address" }),
  city: z.string().min(2, { message: "Please enter a valid city" }),
  town: z.string().min(2, { message: "Please enter a valid town" }),
  county: z.string().min(2, { message: "Please enter a valid county" }),
  postcode: z.string().min(5, { message: "Please enter a valid postal code" }),
  emergencyContactName: z
    .string()
    .min(2, { message: "Emergency contact name is required" }),
    emergencyContactPhoneNumber: z
    .string()
    .min(10, {
      message: "Please enter a valid emergency contact phone number",
    }),
  password:z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  


// Infer TypeScript type from Zod schema
type PatientFormData = z.infer<typeof patientSchema>;

const PatientRegistrationPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });


  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      const res = await createPatient(data);;

      if (res.response === "success") {
        toast.success("User addition  successfully!");
      }else{
        toast.error("User addition failed!");
  
      }
      router.push(`/medicalrecords/getusers`);


      reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  // if (submitSuccess) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
  //         <div className="text-center">
  //           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
  //             <svg
  //               className="h-6 w-6 text-green-600"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               stroke="currentColor"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 d="M5 13l4 4L19 7"
  //               />
  //             </svg>
  //           </div>
  //           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
  //             Registration Successful!
  //           </h2>
  //           <p className="mt-2 text-sm text-gray-600">
  //             The patient has been successfully registered in the system.
  //           </p>
  //           <button
  //             onClick={() => setSubmitSuccess(false)}
  //             className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //           >
  //             Register Another Patient
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-200 py-8 text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Registration
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Register a new patient in the BUENO system
          </p>
        </div>

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
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstname")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full h-full sm:text-sm border-gray-300 rounded-md  ${
                        errors.firstname ? "border-red-500" : ""
                      }`}
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="middlename"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="middlename"
                      {...register("middlename")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.middlename ? "border-red-500" : ""
                      }`}
                    />
                    {errors.middlename && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.middlename.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastname"
                      {...register("lastname")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.lastname ? "border-red-500" : ""
                      }`}
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id="phone"
                      {...register("phoneNumber")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.phoneNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth *
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="dateOfBirth"
                      {...register("dateOfBirth")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.dateOfBirth ? "border-red-500" : ""
                      }`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender *
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      {...register("gender")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.gender ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                     
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Address Information
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      {...register("streetAddress")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.streetAddress ? "border-red-500" : ""
                      }`}
                    />
                    {errors.streetAddress && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.city ? "border-red-500" : ""
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                  Town *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="town"
                      {...register("town")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.city ? "border-red-500" : ""
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    County *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="state"
                      {...register("county")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.county ? "border-red-500" : ""
                      }`}
                    />
                    {errors.county && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.county.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal Code *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="zipCode"
                      {...register("postcode")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.postcode ? "border-red-500" : ""
                      }`}
                    />
                    {errors.postcode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.postcode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Emergency Contact
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="emergencyContactName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emergency Contact Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="emergencyContactName"
                      {...register("emergencyContactName")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.emergencyContactName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.emergencyContactName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.emergencyContactName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="emergencyContactPhoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emergency Contact Phone *
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id="emergencyContactPhone"
                      {...register("emergencyContactPhoneNumber")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.emergencyContactPhoneNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.emergencyContactPhoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.emergencyContactPhoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

           
                  <div className="mt-1">
                    <input
                      type="text"
                      hidden
                      value="123456yu"
                      id="password"
                      {...register("password")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
              

              
                  
                  <div className="mt-1">
                    <input
                      type="tel"
                    hidden
                      value="123456yu"
                      id="confirmPassword"
                      {...register("confirmPassword")}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
            </div>

            

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
                  "Register Patient"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationPage;
