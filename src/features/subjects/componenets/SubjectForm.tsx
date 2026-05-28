"use client";
 
import { useForm } from "react-hook-form";
import { Subject } from "@prisma/client";
 

import { createSubjectAction } from "../actions/create-subject.action";
import { updateSubjectAction } from "../actions/update-subject.action";
 
interface Props {
  subject?: Subject;
  onSuccess?: () => void;
}
 
export default function SubjectForm({
  subject,
  onSuccess,
}: Props) {
  const isEdit = !!subject;
 
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: subject?.name || "",
      description: subject?.description || "",
    },
  });
 
  const onSubmit = async (data: any) => {
    if (isEdit && subject) {
      await updateSubjectAction(subject.id, data);
    } else {
      
      await createSubjectAction(data);
    }
 
    onSuccess?.();
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name")}
        placeholder="Subject Name"
        className="w-full border p-2 rounded"
      />
 
      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
 
      <button className="bg-black text-white px-4 py-2 rounded">
        {isEdit ? "Update" : "Create"}
      </button>
    </form>
  );
}
 