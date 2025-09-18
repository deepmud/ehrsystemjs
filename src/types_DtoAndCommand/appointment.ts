import { string } from "zod/v3";

export interface AppointmentDto {
    id: number;
    patientId: number;
    doctorId: number;
    appointmentDate: string;
    status: "Scheduled" | "Completed" | "Cancelled";
  }
  
  // For creating appointments
  export interface CreateAppointmentCommand {
    patientId: number;
    doctorId: number;
    appointmentDate: string;
  }
  
  export interface DashboardDto
  {
       listDashboardAppointment : ListDashboardAppointmentDto[]
        listDashboardPersonDto : DashboardPersonDto[]
       dailyCount : number
        weeklyCount : number
        monthlyCount : number
        yearlyCount : number
 
  }
  export interface DashboardPersonDto
  {
    regno: string,
    name: string,
 
  }
  export interface ListDashboardAppointmentDto 
    {
      regno: string,
      name: string,
      date: string,
      department: string,
      doctor: string,
      time: string,
      id: string
    }

    export interface GetListDashboardAppointmentDtoDto{
      name: string,
      regNo: string,
      listDashboardappointmentlistDto: ListDashboardAppointmentDto[]
      }
      
  export interface GetCaseFilesDto{
  name: string,
  regNo: string,
  listUserCaseFilesDTO: CaseFileDto[]
  }
  export interface CaseFileDto{

      id: string,
      regNo: string,
      severity: string,
      symptoms: string,
      diagnosis: string,
      referalSource: string,
      dateSymptomsStarted: string,
      dateRegistered: string
    }