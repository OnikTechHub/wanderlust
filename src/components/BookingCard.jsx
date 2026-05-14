"use client"
import { Card, DateField, Label } from '@heroui/react';
import React from 'react';
import { FaArrowRight } from "react-icons/fa6"; 

const BookingCard = ({ destination }) => {
    const { price } = destination;

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
                <DateField className="w-full" name="date">
                    <Label className="text-xs font-semibold text-gray-500 hidden">Departure Date</Label>
                    <DateField.Group className="w-full bg-slate-50/80 border border-gray-100 rounded-lg p-3 text-gray-700 font-medium">
                        <DateField.Input>
                            {(segment) => <DateField.Segment segment={segment} />}
                        </DateField.Input>
                    </DateField.Group>
                </DateField>
            </div>

            <button className='w-full py-3.5 px-4 bg-[#119ab5] text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-[#0e839a] transition-all group shadow-sm'>
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