"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import apiClient from "@/lib/apifetch";
import { loginPost } from "@/hooks/auth";
import { LoginDto } from "@/types_DtoAndCommand/auth";
import { useState } from "react";

console.log("i am in login page");

const schema = z.object({
  email: z.email(),
  password: z.string().min(3),
  // rememberMe: z.boolean(),
});



type FormData = z.infer<typeof schema>;

export default function LoginPages() {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleClick = () => {
    setIsClicked(true);                 // turn red
    setTimeout(() => setIsClicked(false), 1000); // back to blue after 1s
  };
// Toggle password visibility
/**
 * Function to toggle the visibility of password
 * This function is typically used for password input fields where users can show/hide their password
 * It uses the setShowPassword setter function to update the state
 */
const togglePasswordVisibility = () => {
  // Toggle the password visibility state by inverting the previous value
  setShowPassword(prev => !prev);
};
/**
 * Handles form submission for login
 * @param data - Form data containing login credentials
 */
  const onSubmit = async (data: FormData) => {
    try {
      console.log("token:hhhhh");

      // call backend
      const res = await loginPost(data);;
      const token = res.token;
      console.log("token:",token);
      // save in Zustand store
      login(token);

      // redirect
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Column - Illustration */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white flex-col justify-center items-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-white bg-opacity-20 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-hospital text-3xl text-white"></i>
            </div>
            <h2 className="text-3xl font-bold mb-4">medi-cloud Hospital Admin</h2>
            <p className="text-blue-100">Streamline your healthcare management with our powerful dashboard</p>
            
            <div className="mt-10 space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <i className="fas fa-user-injured"></i>
                </div>
                <p>Patient Management</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <i className="fas fa-user-md"></i>
                </div>
                <p>Doctor Profiles</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <i className="fas fa-chart-line"></i>
                </div>
                <p>Revenue Analytics</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Login Form */}
        <div className="w-full md:w-3/5 p-8 py-12 md:p-12">
          <div className="text-center mb-2 md:hidden">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-hospital text-2xl text-white"></i>
            </div>
            <h2 className="text-2xl font-bold text-blue-600">medi-cloud Hospital Admin</h2>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 text-center mb-10">Sign in to access your dashboard</p>
          
          <form  onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input 
                {...register("email")}
                  // id="email" 
                  // name="email"
                  // type="email" 
                  placeholder="your@email.com" 
                  className="pl-10 pr-4 py-3 rounded-lg border text-black  border-gray-300 focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  // value={formData.email}
                  // onChange={handleInputChange}
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input 
                {...register("password")}
                  // id="password" 
                  // name="password"
                  type={showPassword ? "text" : "password"} 
                  // type="password"
                  placeholder="••••••••" 
                  className="pl-10 pr-10 py-3 rounded-lg border text-black  focus:text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  // value={formData.password}
                  // onChange={handleInputChange}
                  required 
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                 
                  onClick={togglePasswordVisibility}
                >
                  <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-gray-400`}></i>
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input 
                //  {...register("rememberMe")}
                  id="rememberMe" 
                  name="rememberMe"
                  type="checkbox" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  // checked={formData.rememberMe}
                  // onChange={handleInputChange}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
            </div>
            <button
      type="submit"
      onClick={handleClick}
      className={`w-full text-white py-3 px-4 rounded-lg font-semibold 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:ring-offset-2 
                  transition duration-150 ease-in-out flex items-center justify-center
                  ${isClicked ? "bg-blue-400" : "bg-blue-600"}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </button>
          </form>
          
          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="mx-4 text-gray-600">Or continue with</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition duration-150">
                <i className="fab fa-google text-blue-600"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition duration-150">
                <i className="fab fa-microsoft text-blue-600"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition duration-150">
                <i className="fab fa-apple text-gray-800"></i>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">Don&apos;t have an account? <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Contact administrator</a></p>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">© 2023 medi-cloud Hospital Admin. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};





