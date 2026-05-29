"use client";
 
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
 
export default function LogoutButton() {
  return (
    <button
      onClick={() =>{
        console.log("logout called");
        signOut({
          callbackUrl: "/login",
        })
      }
        
      }
      className="border px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
    >
        <LogOut size={18} className="inline mr-2" />
      Logout
    </button>
  );
}
 