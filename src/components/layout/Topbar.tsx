import { Input } from "@/components/ui/input";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Topbar() {

    const session = await getServerSession(authOptions);

    if(!session){

    }

    console.info(session?.user.name?.charAt(0));

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <Input
        placeholder="Search lessons..."
        className="w-1/3"
      />
 
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">
          Welcome back 👋
        </div>
 
        <div className="w-8 h-8 rounded-full bg-black text-amber-50 flex items-center justify-center" >{session?.user.name?.charAt(0)}</div>
      </div>
    </header>
  );
}
 