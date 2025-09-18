import apiFetch  from "@/lib/apifetch";
import { LoginCommand, LoginDto } from "@/types_DtoAndCommand/auth";
import { ResponseDTO } from "@/types_DtoAndCommand/genericResponse";
import { AddCaseCommand, AddClinicalDiagnosisCommand, AddClinicalDiagnosisPrescriptionCommand, AddClinicalDiagnosisPrescriptionCommand2, CreatePatientCommand } from "@/types_DtoAndCommand/patient";


export async function loginPost(data: LoginCommand) {
  return apiFetch<LoginDto>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createPatient(data: CreatePatientCommand) {
  return apiFetch<ResponseDTO>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createEditDiagnosis(data: AddClinicalDiagnosisCommand) {
  return apiFetch<ResponseDTO>("/BookAppointment/EditDoctorsAppointment", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function AddCasefile(data: AddCaseCommand) {
  return apiFetch<ResponseDTO>("/MedicalRecord/AddCaseFile", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function editDrug(data: AddClinicalDiagnosisPrescriptionCommand2) {
  return apiFetch<ResponseDTO>("/BookAppointment/EditPharmacyAppointment", {
    method: "POST",
    body: JSON.stringify(data),
  });
}