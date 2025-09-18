"use client";

import Navbar from "@/components/Navbar";
import { useEffect ,useState} from "react";
import RequireAuth from "@/components/RequireAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { DashboardDto, GetListDashboardAppointmentDtoDto, ListDashboardAppointmentDto } from "@/types_DtoAndCommand/appointment";
import { getDashboard, getListDashboardAppointmentDtoDto } from "@/hooks/patienthooks";
import { DeptList } from "@/types_DtoAndCommand/enums";
import Header from "@/components/Header";
import { useSidebarStore } from "@/store/useSidebarStore";



export default   function  DashboardPage() {
    const {isAuthenticated,user} = useAuthStore();
    const router = useRouter();
    const params = useParams();
  const id = params.id;
    const isOpen = useSidebarStore((s) => s.isOpen);
  
    useEffect(() => {
      if (!isAuthenticated() && (user?.department == 'PA')) router.push("/auth/login");
    }, [isAuthenticated(), router]);

    
   
    const { data  , error, isLoading } =  useSWR<GetListDashboardAppointmentDtoDto>(isAuthenticated() ? `/MedicalRecord/FetchUserAppointments/?id=${id}` : null, getListDashboardAppointmentDtoDto);

    if(isAuthenticated()){
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj: ', data);
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

            {/* <!-- Main Content Grid --> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* <!-- Left Column --> */}
                <div className="lg:col-span-2 space-y-6">
                    {/* <!-- Appointment Section --> */}
                    <div className="bg-white dark:bg-dark rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Case File Id ({id})</h3>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">Staff</button>
                                {/* <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm" onClick={() => router.push(`/medicalrecords/addcasefiles/${data.regNo}`)}>Add Case file</button> */}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                        <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b dark:border-gray-700">
                                        <th className="pb-3">S/N</th>
                                        <th className="pb-3">Appointment Id</th>
                                        <th className="pb-3">Name</th>
                                        <th className="pb-3">Regno</th>
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Time</th>
                                        <th className="pb-3">Department</th>
                                        { user?.department == "RE" || user?.department == "NU"   ? " " : <th className="pb-3"></th>}

                                    </tr>
                                </thead>
  
                               
                                <tbody>
                                { (data.listDashboardappointmentlistDto.length > 0) ?
                                data.listDashboardappointmentlistDto.map((p: ListDashboardAppointmentDto) => (
                                    <tr className="border-b dark:border-gray-700" key={p.id}>
                                        <td className="py-3">{data.listDashboardappointmentlistDto.indexOf(p)+1}</td>
                                        <td className="py-3" >{p.id}</td>
                                        <td className="py-3">{p.name}</td>
                                        <td className="py-3">{p.regno}</td>
                                        <td className="py-3">{p.date}</td>
                                        <td className="py-3">{p.time}</td>
                                        <td className="py-3">{p.department}</td>
                                        { user?.department == "RE" || user?.department == "NU"   ? " " :   <td className="py-3"><button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm"  onClick={() => router.push(user?.department == "DO" ? `/doctor/getdiagnosis/${p.id}` : `/pharmacy/getdrugs/${p.id}`)}>view</button></td>}
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

                
            </div>

          {/* Stats Cards */}
          {/* ✅ The rest of your dashboard content stays EXACTLY the same, just with className instead of class */}
          {/* Copy-paste everything below, replacing "class" with "className" */}
        </div>
      </div>
   
    </RequireAuth>
  );
}
