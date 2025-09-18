"use client";

import Navbar from "@/components/Navbar";
import { useEffect ,useState} from "react";
import RequireAuth from "../../components/RequireAuth";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { DashboardDto, ListDashboardAppointmentDto } from "@/types_DtoAndCommand/appointment";
import { getDashboard } from "@/hooks/patienthooks";
import { DeptList } from "@/types_DtoAndCommand/enums";
import Header from "@/components/Header";
import { Menu, X } from "lucide-react"; // nice hamburger/close icons
import { useSidebarStore } from "@/store/useSidebarStore";



export default   function  DashboardPage() {
    const {isAuthenticated,user} = useAuthStore();
    const router = useRouter();
    const isOpen = useSidebarStore((s) => s.isOpen);
    
    useEffect(() => {
      if (!isAuthenticated() && (user?.department == 'PA')) router.push("/auth/login");
    }, [isAuthenticated(), router]);

    
   
    const { data  , error, isLoading } =  useSWR<DashboardDto>(isAuthenticated() ? "/dashboard/getdashboard" : null, getDashboard);

    if(isAuthenticated()){
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj: ', data);
        console.log('roleeeeeeeeeeeee: ', user?.department);
    }
    if (isLoading) return <p>Loading...</p>;
    if (error) {return <p>Error loading patients</p>};
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


          {/* <!-- Stats Cards --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">

                <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Daily Appointment</p>
                            <h3 className="text-2xl font-bold mt-1">{data.dailyCount}</h3>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                            <i className="fas fa-user-injured text-blue-500 dark:text-blue-400 text-xl"></i>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-red-500 flex items-center">
                            <i className="fas fa-arrow-down mr-1"></i> -3%
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">vs yesterday</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Weekly Appointment</p>
                            <h3 className="text-2xl font-bold mt-1">{data.weeklyCount}</h3>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                            <i className="fas fa-calendar-check text-green-500 dark:text-green-400 text-xl"></i>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-red-500 flex items-center">
                            <i className="fas fa-arrow-down mr-1"></i> -9%
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Monthly Appointment</p>
                            <h3 className="text-2xl font-bold mt-1">{data.monthlyCount}</h3>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                            <i className="fas fa-user-md text-purple-500 dark:text-purple-400 text-xl"></i>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-red-500 flex items-center">
                            <i className="fas fa-arrow-down mr-1"></i> -4%
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Yearly Appointment</p>
                            <h3 className="text-2xl font-bold mt-1">{data.yearlyCount}</h3>
                        </div>
                        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                            <i className="fas fa-dollar-sign text-yellow-500 dark:text-yellow-400 text-xl"></i>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 flex items-center">
                            <i className="fas fa-arrow-up mr-1"></i> +4%
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">vs last year</span>
                    </div>
                </div>
            </div>

            {/* <!-- Main Content Grid --> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* <!-- Left Column --> */}
                <div className="lg:col-span-2 space-y-6">
                    {/* <!-- Appointment Section --> */}
                    <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Todays Appointment</h3>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">Staff</button>
                                {/* <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm"></button> */}
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b dark:border-gray-700">
                                        <th className="pb-3">S/N</th>
                                        <th className="pb-3">Id</th>
                                        <th className="pb-3">Patient</th>
                                        <th className="pb-3">Regno</th>
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Time</th>
                                        <th className="pb-3">Department</th>
                                        { user?.department == "RE" || user?.department == "NU"  ? " " :  <th className="pb-3"></th>}
                                    </tr>
                                </thead>
  
                               
                                <tbody>
                                { (data.listDashboardAppointment.length > 0) ?
                                data.listDashboardAppointment.map((p: ListDashboardAppointmentDto) => (
                                    <tr className="border-b dark:border-gray-700" key={p.id}>
                                        <td className="py-3" >{data.listDashboardAppointment.indexOf(p)+1}</td>
                                        <td className="py-3" >{p.id}</td>
                                        <td className="py-3">{p.name}</td>
                                        <td className="py-3">{p.regno}</td>
                                        <td className="py-3">{p.time}</td>
                                        <td className="py-3">{p.date}</td>
                                        <td className="py-3">{p.department}</td>
                                        { user?.department == "RE" || user?.department == "NU"   ? " " : <td className="py-3"><button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm"  onClick={() => router.push( user?.department == "DO" ? `/doctor/getdiagnosis/${p.id}` : `/pharmacy/getdrugs/${p.id}`)}>view</button></td>}
                                    </tr>
                                    )) :

                                        <p>no data</p>
                                    }
                                
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <!-- Patient Statistic --> */}
                   
                </div>

                {/* <!-- Right Column --> */}
                <div className="space-y-6">
                    {/* <!-- Revenue Section --> */}
                    <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold mb-4">Revenue</h3>
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6 rounded-lg">
                            <p className="text-2xl font-bold">$41,512k</p>
                            <p className="text-sm">2023</p>
                        </div>
                        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <p className="text-lg font-bold">$25,612k</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Previous Year</p>
                        </div>
                    </div>

                    {/* <!-- Upcoming Appointments --> */}
                    <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold mb-4">Medical Staffs</h3>
                        <div className="space-y-4">

                        {data.listDashboardPersonDto.map((p: any) => (
                            <div className="flex items-center" key={p.regno}>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                    <i className="fas fa-calendar-alt text-blue-500 dark:text-blue-400"></i>
                                </div>
                                <div>
                                    <p className="font-medium">{p.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{p.regno}</p>
                                </div>
                            </div>
                                                           ))}

                            
                        </div>
                    </div>

                 
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
