import { getUnitsService } from "@/features/units/services/unit.service";
import LessonModalClient from "./LessonModalClient";
import { Lesson } from "@prisma/client";

interface Props {
  lesson?: Lesson;
}

export default async function LessonModalServer({ lesson }: Props) {
  const units = await getUnitsService(1, 12);

  return (
    <LessonModalClient
      lesson={lesson}
      units={units.data}
    />
  );
}