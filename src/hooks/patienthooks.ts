
import  apiclient  from "@/lib/apifetch";
import { DashboardDto, GetCaseFilesDto, GetListDashboardAppointmentDtoDto } from "@/types_DtoAndCommand/appointment";
import { ResponseDTO } from "@/types_DtoAndCommand/genericResponse";
import { AddClinicalDiagnosisCommand, AddClinicalDiagnosisPrescriptionCommand, CreatePatientCommand, FetchAddClinicalDiagnosisCommand, FetchAddPrescriptionCommand, PatientDto } from "@/types_DtoAndCommand/patient";


//  POST patient

  
  // ✅ GET patients
  export async function getUsers(url:string) {
    return apiclient<PatientDto[]>(url, {
      method: "GET"
    });
  }

  export async function getDashboard(url:string) {
    return apiclient<DashboardDto>(url, {
      method: "GET"
    });
  }

  export async function getListDashboardAppointmentDtoDto(url:string) {
    return apiclient<GetListDashboardAppointmentDtoDto>(url, {
      method: "GET"
    });
  }

  export async function getCaseFiles(url:string) {
    return apiclient<GetCaseFilesDto>(url, {
      method: "GET"
    });
  }

  
  export async function getEditDiagnosis(url:string) {
    return apiclient<FetchAddClinicalDiagnosisCommand>(url, {
      method: "GET"
    });
  }

  
  export async function getDrug(url:string) {
    return apiclient<AddClinicalDiagnosisPrescriptionCommand>(url, {
      method: "GET"
    });
  }

  export async function getEditPrescription(url:string) {
    return apiclient<FetchAddPrescriptionCommand>(url, {
      method: "GET"
    });
  }