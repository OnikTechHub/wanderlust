"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // একটিভ রুট ট্র্যাক করার জন্য
import React from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname(); // বর্তমান পেজের পাথনেম (যেমন: '/destinations')
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const toastId = toast.loading("Signing out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to logout", { id: toastId });
    }
  };

  // নেভিগেশন লিংকগুলোর একটি অ্যারে (কোড ক্লিন রাখার জন্য)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Add Destination", href: "/add-destination" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 md:px-12 py-3.5 border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] flex items-center justify-between">
      
      {/* বাম পাশ: লোগো (লোগো বামে রাখা স্ট্যান্ডার্ড ডিজাইন প্যাটার্ন) */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="/assets/Wanderlast.png"
            height={38}
            width={115}
            alt="Wanderlast Logo"
            className="cursor-pointer object-contain hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* মাঝখান: ডাইনামিক একটিভ নেভিগেশন লিংকসমূহ */}
      <ul className="hidden md:flex items-center gap-1 bg-gray-50/60 p-1 rounded-full border border-gray-100/80">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 block ${
                  isActive
                    ? "bg-[#119ab5] text-white shadow-sm font-semibold" // একটিভ পেজের স্টাইল (BookingCard এর সাথে ম্যাচিং কালার)
                    : "text-gray-600 hover:text-[#119ab5] hover:bg-gray-100/70" // নরমাল পেজের স্টাইল
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ডান পাশ: ইউজার প্রোফাইল ও অথেনটিকেশন অ্যাকশন */}
      <div className="flex items-center gap-4">
        {user && (
          <Link
            href="/profile"
            className={`hidden sm:block text-sm font-medium transition-colors ${
              pathname === "/profile" ? "text-[#119ab5] font-semibold" : "text-gray-600 hover:text-[#119ab5]"
            }`}
          >
            Profile
          </Link>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3.5 bg-gray-50 pl-2 pr-1 py-1 rounded-full border border-gray-100">
              {/* ইউজার অ্যাভাটার */}
              <Avatar className="w-8 h-8 ring-2 ring-[#119ab5]/20">
                <Avatar.Image referrerPolicy="no-referrer" alt={user.name} src={user?.image} />
                <Avatar.Fallback className="bg-[#119ab5] text-white text-xs">{user.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>
              
              {/* লগআউট বাটন */}
              <button
                onClick={handleSignOut}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-full shadow-sm transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-full transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-[#119ab5] hover:bg-[#0e839a] rounded-full shadow-sm transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;