import {
  BookOpen,
  LayoutDashboard,
  Layers,
  Sparkles,
  Library ,
  Bookmark 
} from "lucide-react";
 
import Link from "next/link";
import LogoutButton from "../ui/logoutButton";
 
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col gap-6">
      <div className="text-xl font-bold">
        EduFlow AI
      </div>
 
      <nav className="flex flex-col gap-2 flex-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
 
        <Link
          href="/lessons"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
        >
          <BookOpen size={18} />
          Lessons
        </Link>
 
        <Link
          href="/units"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
        >
          <Layers size={18} />
          Units
        </Link>

        <Link
          href="/subjects"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
        >
          {/* <Library  size={18} /> */}
          <Bookmark   size={18} />
          Subjects
        </Link>
 
        {/* <Link
          href="/ai"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
        >
          <Sparkles size={18} />
          AI Generate
        </Link> */}
        
      </nav>
      <LogoutButton />
    </aside>
  );
}
 