import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { FaRegCalendar, FaStar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  // console.log(token)

  const res = await fetch(`http://localhost:5000/destination/${id}`,{
    headers: {
      authorization: `Beared ${token}`
    }
  });
  const destination = await res.json();

  const { imageUrl, destinationName, duration, country, description } = destination;


  const highlights = [
    "Luxury beachfront accommodation",
    "Visit Uluwatu Temple at sunset",
    "Traditional Balinese spa treatment",
    "Private beach dinner experience",
    "Sunrise trek to Mount Batur"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
     
      <div className="flex items-center gap-3 justify-end mb-5">
        <EditModal destination={destination} />
        <DeleteAlert destination={destination} />
      </div>


      <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-sm mb-8">
        <Image
          className="w-full h-full object-cover"
          alt={destinationName}
          src={imageUrl}
          height={600}
          width={1200}
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-500 font-medium text-base">
              <LuMapPin className="text-gray-400 text-lg" /> 
              <span className="capitalize">{country}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {destinationName}
            </h1>

            <div className="flex items-center gap-6 pt-2 text-gray-600 font-medium">
              <div className="flex items-center gap-2 text-gray-700">
                <FaRegCalendar className="text-gray-500 text-lg" />
                <span className="text-base font-semibold">{duration}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 text-base leading-relaxed font-normal">
              {description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">

                  <svg
                    className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 text-base font-normal">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-6">
          <BookingCard destination={destination} />
        </div>

      </div>
    </div>
  );
};

export default DestinationDetailsPage;