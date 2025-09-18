// src/types/enums/Gender.ts
export type Gender = "Male" | "Female" | "Other";

// src/types/enums/Roles.ts
export type Department = "Admin" | "Doctor" | "Nurse" | "Pharmacy" | "Cleaner" | "MedicalRecord";
export type DptInitials =  | "DO" | "NU" | "PH"  | "RE";

export type Roles = "admin" | "user" | "medical" | "staff";

export const DeptList: Record<string, string> = {
    NU: "Nurse",
    DO: "Doctor",
    PH: "Pharmacy",
    RE: "MedicalRecord",
  };
 