"use client";
 
import { useState } from "react";
 
import { Lesson, Unit } from "@prisma/client";
 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
 
import LessonForm from "./LessonForm";
 
interface Props {
  lesson?: Lesson;
  units: Unit[];
}
 
export default function LessonModal({
  lesson,
  units
}: Props) {
  const [open, setOpen] =
    useState(false);
 
  const isEdit = !!lesson;
 
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {isEdit ? (
          <button className="border px-3 py-1 rounded">
            Edit
          </button>
        ) : (
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Create Lesson
          </button>
        )}
      </DialogTrigger>
 
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Lesson"
              : "Create Lesson"}
          </DialogTitle>
        </DialogHeader>
 
        <LessonForm
          lesson={lesson}
          onSuccess={() =>
            setOpen(false)
          }
          units={units}
        />
      </DialogContent>
    </Dialog>
  );
}
 