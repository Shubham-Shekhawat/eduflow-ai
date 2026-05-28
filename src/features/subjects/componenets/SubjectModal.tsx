"use client";

import { useRouter } from "next/navigation";
import SubjectForm from "./SubjectForm";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Subject } from "@prisma/client";

interface Props {
  subject?: Subject;
}

export default function SubjectModal({ subject }: Props) {
  const [open, setOpen] = useState(false);

  const isEdit = !!subject;
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button className="border px-3 py-1 rounded">Edit</button>
        ) : (
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Create Subject
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Subject" : "Create Subject"}
          </DialogTitle>
        </DialogHeader>

        <SubjectForm
          subject={subject}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
