"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Unit, Subject } from "@prisma/client";
import UnitForm from "./UnitForm";

interface Props {
  unit?: Unit;
  subjects: Subject[];
}

export default function UnitModal({ unit, subjects }: Props) {
  const isEdit = !!unit;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger asChild>
        {isEdit ? (
          <button className="border px-3 py-1 rounded">
            Edit
          </button>
        ) : (
          <button className="bg-black text-white px-4 py-2 rounded">
            + Add Unit
          </button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Unit" : "Create Unit"}
          </DialogTitle>
        </DialogHeader>

        <UnitForm
          unit={unit}
          subjects={subjects}
          onSuccess={() => {
            setOpen(false);      // modal close
            router.refresh();    // ✅ list refresh
          }}
        />
      </DialogContent>
    </Dialog>
  );
}