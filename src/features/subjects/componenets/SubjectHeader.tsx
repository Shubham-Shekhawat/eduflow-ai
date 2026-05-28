
import SubjectModal from "./SubjectModal";

export default function SubjectsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Subjects
        </h1>
 
        <p className="text-gray-500 mt-1">
          Manage your curriculum subjects
        </p>
      </div>
 
      <SubjectModal />
    </div>
  );
}
 