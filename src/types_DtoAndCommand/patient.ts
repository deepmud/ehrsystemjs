// Mirrors PatientDto from backend
export interface PatientDto {
  firstname: string;
  lastname: string;
  dateOfBirth: string; // ISO string
  gender: string;
  email?: string;
  phoneNumber?: string;
  middlename?: string;
  regNo?: string;
  town?: string;
  dateRegistered?: string;
  time?: string;
  
}

// For creating a new patient
export interface CreatePatientCommand {
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  gender: string;
  middlename: string;
  email: string;
  streetAddress?: string;
  city: string;
  town?: string;
  county?: string;
  emergencyContactName?: string;
  emergencyContactPhonenumber?: string;
  postcode?: string;
  password?: string;
  phoneNumber?: string;
}
export interface AddCaseCommand {
  regno: string;
  referalSourceId: string;
  dateSymptomsStarted: string;
  diagnosis: string;
  symptoms: string;
  severity: string;
}

export interface AddClinicalDiagnosisCommand {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  id: string;
  appointmentDate?: string;
  respiratoryRate: string;
  physicalExam?: string;
  provisionalDiagnosis?: string;
  finalDiagnosis?: string;
  treatmentPlan?: string;
  therapyPlan?: string;
  lifeStyleAdvice?: string;
  prescriptions: AddClinicalDiagnosisPrescriptionCommand[];
}

export interface FetchAddClinicalDiagnosisCommand {
  name: string;
  regno: string;
  symptoms: string;
  selfdiagnosis: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  id: string;
  appointmentDate?: string;
  respiratoryRate: string;
  physicalExam?: string;
  provisionalDiagnosis?: string;
  finalDiagnosis?: string;
  treatmentPlan?: string;
  therapyPlan?: string;
  lifeStyleAdvice?: string;
  prescriptions: AddClinicalDiagnosisPrescriptionCommand[];
}


export interface FetchAddPrescriptionCommand {
  name: string;
  regno: string;
  symptoms: string;
  selfdiagnosis: string;
  
  id: string;
  
  prescriptions: AddClinicalDiagnosisPrescriptionCommand[];
}


export interface AddClinicalDiagnosisPrescriptionCommand {
  id?: string;
  duration: string;
  drugName: string;
  dosage: string;
  frequency: string;
  dateCreated?: string;
  dispatchComment?: string;
}


export interface AddClinicalDiagnosisPrescriptionCommand2 {
  id?: number;
  duration: string;
  drugName: string;
  dosage: string;
  frequency: string;
  dispatchComment?: string;
}

// export interface EditDrugCommand {
//   id?: string;
//   drugs: DrugCommand;
  
// }

// export interface DrugCommand {
//   duration: string;
//   drugName: string;
//   dosage: string;
//   frequency: string;
//   dateCreated?: string;
//   despatchComment?: string;
// }