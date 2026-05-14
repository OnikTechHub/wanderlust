"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {

  const {
    data: session,

  } = authClient.useSession()

  const user = session?.user
  console.log(user)
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/80 backdrop-blur-md px-8 py-4 shadow-sm border-b border-gray-100">

      {/* Left Side: Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <li className="hover:text-blue-600 transition-colors">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-blue-600 transition-colors">
          <Link href="/destinations">Destinations</Link>
        </li>
        <li className="hover:text-blue-600 transition-colors">
          <Link href="/my-bookings">My Bookings</Link>
        </li>
        <li className="hover:text-blue-600 transition-colors">
          <Link href="/add-destination">Add Destination</Link>
        </li>
      </ul>

      {/* Center: Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="/assets/Wanderlast.png"
            height={40}
            width={120}
            alt="Wanderlast Logo"
            className="cursor-pointer object-contain"
          />
        </Link>
      </div>

      {/* Right Side: Auth & Profile */}
      <div className="flex items-center gap-6">
        <Link
          href="/profile"
          className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          Profile
        </Link>

        <div className="flex items-center gap-3">
          {user ? <>

            <div><Avatar>
              <Avatar.Image alt="John Doe" src={user?.image} />
              <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
            </Avatar></div>
            <div>
              <button  className="px-5 py-2 text-sm font-medium text-white bg-red-400 hover:bg-red-700 rounded-full shadow-md transition-all active:scale-95">
                Logout
              </button>
            </div>
          </> : <>
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-all active:scale-95"
            >
              Sign Up
            </Link>
          </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;