"use client"
import { authClient } from '@/lib/auth-client';
import { Card, DateField, Label } from '@heroui/react';
import React, { useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import toast from 'react-hot-toast'; // ১. টোস্ট ইম্পোর্ট করা হয়েছে

const BookingCard = ({ destination }) => {

    const { data: session } = authClient.useSession()

    const user = session?.user
    // console.log(user)

    const [departureDate, setDepartureDate] = useState(null)
    // console.log(new Date(departureDate))
    // console.log(destination)
    const { price, _id, destinationName, imageUrl, country } = destination;

    const handleBooking = async () => {
        // ২. ইউজার লগইন না থাকলে এরর টোস্ট দেখাবে
        if (!user) {
            toast.error("Please login first to book this destination!");
            return;
        }

        // ৩. ডেট সিলেক্ট না করলে এরর টোস্ট দেখাবে
        if (!departureDate) {
            toast.error("Please select a departure date before booking!");
            return;
        }

        const bookingData = {
            userId: user.id,
            userImage: user.image,
            userName: user.name,
            destination: _id,
            destinationName,
            price,
            imageUrl,
            country,
            departureDate: new Date(departureDate)
        }

        console.log(bookingData)
        
        // ৪. রিকোয়েস্ট প্রসেস হওয়ার সময় লোডিং টোস্ট চালু হবে
        const toastId = toast.loading("Processing your booking...");

        try {
            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            })
            
            const data = await res.json();
            console.log(data)

            if (res.ok) {
                // ৫. বুকিং সফল হলে লোডিং কেটে সাকসেস টোস্ট দেখাবে
                toast.success("Your booking has been confirmed! 🎉", { id: toastId });
            } else {
                // ৬. ডাটাবেজ বা ব্যাকএন্ডে সমস্যা হলে এরর টোস্ট দেখাবে
                toast.error("Booking failed. Please try again.", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            // 6. নেটওয়ার্ক বা কানেকশন এরর হলে টোস্ট দেখাবে
            toast.error("Network error! Could not connect to server.", { id: toastId });
        }
    }

    return (
        <Card className='rounded-xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-[360px] mx-auto mt-5 space-y-6'>

            <div>
                <p className='text-xs font-medium text-gray-400 mb-0.5'>Starting from</p>
                <div className='flex items-baseline gap-1'>
                    <h2 className='text-4xl font-extrabold text-[#119ab5]'>${price}</h2>
                </div>
                <p className='text-xs font-medium text-gray-400 mt-1'>per person</p>
            </div>


            <div className="space-y-2">
                <DateField onChange={setDepartureDate} className="w-full" name="date">
                    <Label className="text-xs font-semibold text-gray-500 hidden">Departure Date</Label>
                    <DateField.Group className="w-full bg-slate-50/80 border border-gray-100 rounded-lg p-3 text-gray-700 font-medium">
                        <DateField.Input>
                            {(segment) => <DateField.Segment segment={segment} />}
                        </DateField.Input>
                    </DateField.Group>
                </DateField>
            </div>

            <button onClick={handleBooking} className='w-full py-3.5 px-4 bg-[#119ab5] text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-[#0e839a] transition-all group shadow-sm'>
                <span>Book Now</span>
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </button>


            <div className='space-y-3 pt-2'>
                <div className='flex items-center gap-2.5 text-gray-500 text-sm'>
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free cancellation up to 7 days</span>
                </div>
                <div className='flex items-center gap-2.5 text-gray-500 text-sm'>
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Travel insurance included</span>
                </div>
                <div className='flex items-center gap-2.5 text-gray-500 text-sm'>
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 customer support</span>
                </div>
            </div>
        </Card>
    );
};

export default BookingCard;