"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TiDelete } from "react-icons/ti";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 text-sm font-medium">Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/");
    return null;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const toastId = toast.loading("Saving updates...");

    try {
      const { data, error } = await authClient.updateUser({ name, image });
      
      if (error) {
        toast.error(error.message || "Failed to update profile", { id: toastId });
      } else {
        toast.success("Profile updated successfully!", { id: toastId });
        router.push("/profile"); 
        setTimeout(() => {
          window.location.reload(); 
        }, 500);
      }
    } catch (err) {
      toast.error("An unexpected error occurred", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-white py-12 px-4 flex justify-center items-center font-sans">

      <div className="w-full max-w-md relative"> 
  
        <Card className="w-full border border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[1.5rem] bg-white p-8 sm:p-10 relative overflow-visible">
          
       
          <button 
            type="button"
            onClick={() => router.push("/profile")} 
            className="absolute top-4 right-4 z-50 text-red-500 hover:text-red-600 transition-all duration-200 p-1 rounded-full hover:bg-red-50"
            title="Cancel and go back"
          >
            <TiDelete className="text-4xl" /> 
          </button>

          <div className="animate-in fade-in duration-200">
    
            <h3 className="text-xl text-center font-bold text-emerald-600 text-left mb-6 pr-10">
              Update Information
            </h3>

    
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full p-0.5 border border-gray-200 bg-white overflow-hidden shadow-sm">
                <img 
                  src={image || "https://ui-avatars.com/api/?name=" + name} 
                  className="w-full h-full object-cover rounded-full" 
                  alt="Current profile" 
                />
              </div>
              <span className="text-xs text-gray-400 mt-2 font-medium">Current Image</span>
            </div>


            <form onSubmit={handleUpdateProfile} className="space-y-5">
      
              <div className="space-y-1.5 text-left">
                <label className="text-sm font-medium text-gray-500 ml-0.5">
                  Profile Image URL
                </label>
                <input 
                  type="url" 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-gray-300 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700 font-medium"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>


              <div className="space-y-1.5 text-left">
                <label className="text-sm font-medium text-gray-500 ml-0.5">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg bg-white border border-gray-300 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700 font-medium"
                  placeholder="Your Name"
                  required
                />
              </div>


              <div className="pt-4">
                <Button 
                  type="submit"
                  isLoading={isUpdating}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm transition-all shadow-sm"
                >
                  An Update Information Button
                </Button>
              </div>

            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateProfilePage;