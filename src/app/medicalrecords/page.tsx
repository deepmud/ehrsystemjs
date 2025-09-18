"use client";

import { useForm, useFieldArray } from "react-hook-form";

type Prescription = {
  drugName: string;
  dosage: string;
  frequency: string;
};

type PrescriptionFormValues = {
  prescriptions: Prescription[];
};

export default function PrescriptionForm() {
  const { register, control, handleSubmit } = useForm<PrescriptionFormValues>({
    defaultValues: {
      prescriptions: [{ drugName: "", dosage: "", frequency: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescriptions",
  });

  const onSubmit = (data: PrescriptionFormValues) => {
    console.log("Submitted prescriptions:", data.prescriptions);
    // 👉 send this to your API
    // await apiFetch("/prescriptions", { method: "POST", body: JSON.stringify(data.prescriptions) })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-900"
    >
      <h2 className="text-xl font-bold">Add Prescriptions</h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-3 gap-2 items-end border p-2 rounded-md"
        >
          <div>
            <label className="block text-sm font-medium">Drug Name</label>
            <input
              {...register(`prescriptions.${index}.drugName` as const)}
              className="w-full border px-2 py-1 rounded"
              placeholder="Paracetamol"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Dosage</label>
            <input
              {...register(`prescriptions.${index}.dosage` as const)}
              className="w-full border px-2 py-1 rounded"
              placeholder="500mg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Frequency</label>
            <input
              {...register(`prescriptions.${index}.frequency` as const)}
              className="w-full border px-2 py-1 rounded"
              placeholder="2x daily"
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="col-span-3 text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ drugName: "", dosage: "", frequency: "" })}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        + Add Prescription
      </button>

      <button
        type="submit"
        className="block w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save All
      </button>
    </form>
  );
}
