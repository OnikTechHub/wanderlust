"use client"
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50/50 to-gray-100 px-6 text-center relative overflow-hidden">

            <div className="relative mb-6 select-none active:scale-98 transition-transform cursor-default">
 
                <h1 className="text-[140px] md:text-[200px] font-black text-[#119ab5]/15 leading-none tracking-tighter drop-shadow-[0_4px_12px_rgba(17,154,181,0.1)]">
                    404
                </h1>

                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-lg md:text-xl font-extrabold text-[#119ab5] bg-white px-6 py-2.5 rounded-full border-2 border-[#119ab5]/20 shadow-[0_10px_25px_-5px_rgba(17,154,181,0.15)] tracking-wide uppercase">
                        Oops! Page Not Found
                    </p>
                </div>
            </div>

            <div className="max-w-md space-y-3 mb-10 z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
                    Lost in the Wilderness?
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                    The destination you are looking for doesn't exist, has been moved, or perhaps it's still waiting to be discovered. Let's get you back on track!
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full justify-center max-w-sm sm:max-w-none">
                <Link 
                    href="/" 
                    className="w-full sm:w-auto text-center px-7 py-3.5 bg-[#119ab5] text-white font-bold text-sm rounded-full shadow-[0_4px_14px_rgba(17,154,181,0.3)] hover:bg-[#0e839a] hover:shadow-[0_6px_20px_rgba(17,154,181,0.4)] transition-all duration-200 active:scale-95"
                >
                    Back to Homepage
                </Link>
                
                <Link 
                    href="/destinations" 
                    className="w-full sm:w-auto text-center px-7 py-3.5 bg-white text-gray-700 border border-gray-200 font-bold text-sm rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95"
                >
                    Explore Destinations
                </Link>
            </div>

           
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#119ab5]/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};

export default NotFoundPage;