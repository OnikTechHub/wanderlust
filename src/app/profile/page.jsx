"use client";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FiEdit3, FiBriefcase, FiMail, FiCheckCircle } from "react-icons/fi";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 text-sm font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/");
    return null;
  }

  const { user } = session;

  return (
    <div className="min-h-[80vh] bg-[#f8fafc] py-12 px-4 flex justify-center items-center font-sans">
      <div className="w-full max-w-md relative">
        

        <Card className="w-full border border-gray-100/90 shadow-[0_12px_40px_rgba(0,0,0,0.03)] rounded-[2rem] bg-white p-6 sm:p-8">
          <div className="flex flex-col items-center animate-in fade-in duration-200">
            

            <div className="mb-5 flex justify-center items-center">
              <div className="w-24 h-24 rounded-full p-1 border-2 border-cyan-500/80 shadow-lg shadow-cyan-100/50 bg-white overflow-hidden">
                <img 
                  src={user?.image || "https://ui-avatars.com/api/?name=" + user?.name} 
                  className="w-full h-full object-cover rounded-full"
                  alt="profile"
                />
              </div>
            </div>

            <div className="text-center space-y-2 w-full">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{user?.name}</h2>
              <div className="flex flex-col items-center gap-2">
                <Chip variant="flat" className="bg-gray-50 text-gray-600 border border-gray-100 text-xs py-1 px-3 h-auto rounded-lg">
                  <FiMail className="inline mr-1.5 text-gray-400" /> {user?.email}
                </Chip>
                <Chip variant="flat" className="bg-cyan-50 text-cyan-700 border border-cyan-100/50 text-[11px] font-bold px-2.5 h-5 rounded-full">
                   Verified Identity
                </Chip>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100/80 my-6"></div>


            <div className="flex flex-col gap-3.5 w-full mb-6">
              <div className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-xl flex flex-col justify-center">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-1">Account ID</span>
                <span className="text-gray-700 font-mono text-sm break-all select-all font-medium">
                  {user?.id}
                </span>
              </div>

              <div className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-xl flex flex-col justify-center">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-1">Status</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-2 text-sm">
                  <FiCheckCircle className="text-base shrink-0" /> Active Member
                </span>
              </div>
            </div>


            <div className="flex flex-col gap-3 w-full">
              <Button 
                onPress={() => router.push("/profile/update")} 
                variant="bordered"
                className="w-full h-12 rounded-xl bg-[#119ab5] text-white font-bold shadow-sm hover:bg-[#0e839a] text-sm transition-all"
              >
                <FiEdit3 className="mr-1.5 text-base " /> Edit Profile
              </Button>
              <Button 
                onPress={() => router.push("/")} 
                className="w-full h-12 rounded-xl bg-[#119ab5] text-white font-bold shadow-sm hover:bg-[#0e839a] text-sm transition-all"
              >
                <FaHome className="mr-1.5 text-base" /> Home
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default ProfilePage;