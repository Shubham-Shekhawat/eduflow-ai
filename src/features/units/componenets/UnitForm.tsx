"use client";

import { useForm } from "react-hook-form";
import { Unit, Subject } from "@prisma/client";
import { createUnitAction } from "../actions/create-unit.action";
import { updateUnitAction } from "../actions/update-unit.action";

interface Props {
  unit?: Unit;
  subjects: Subject[];
  onSuccess?: () => void;
}

export default function UnitForm({ unit, subjects, onSuccess }: Props) {
  const isEdit = !!unit;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: unit?.title || "",
      description: unit?.description || "",
      subjectId: unit?.subjectId || "",
    },
  });

  const onSubmit = async (data: any) => {
    if (isEdit && unit) {
      await updateUnitAction(unit.id, data);
    } else {
      await createUnitAction(data);
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      <input
        {...register("title")}
        placeholder="Unit Title"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <select
        {...register("subjectId", { required: true })}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Subject</option>

        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        {isEdit ? "Update Unit" : "Create Unit"}
      </button>
    </form>
  );
}
