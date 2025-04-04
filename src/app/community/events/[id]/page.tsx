'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useState } from 'react';

const EventDetailPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmAttendance = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowSuccess(true);
    
    // Wait for success message to show before navigating
    setTimeout(() => {
      router.push('/community/events');
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen relative">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-4 px-6 flex justify-center items-center z-50 animate-slide-down">
          <p className="font-medium">Successfully confirmed attendance!</p>
        </div>
      )}

      {/* Event Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/tech (2).jpeg"
          alt="VR Update Launch"
          fill
          className="object-cover"
        />
        {/* Back and Like buttons */}
        <div className="absolute top-12 left-0 right-0 flex justify-between px-6">
          <Link href="/community/events">
            <div className="w-10 h-10 flex items-center justify-center shadow-lg">
              <FaArrowLeft className="w-5 h-5 text-black" />
            </div>
          </Link>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <FaHeart className="w-5 h-5 text-red-500" />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="px-6 pt-6">
        <h1 className="text-3xl font-bold mb-4 text-black">VR Update Launch</h1>
        
        {/* Network Joined Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs text-black">5+ People in Your Network Joined</span>
            <div className="flex -space-x-2">
              <Image src="/images/mn.png" alt="Person 1" width={24} height={24} className="rounded-full border-2 border-white" />
              <Image src="/images/r2.png" alt="Person 2" width={24} height={24} className="rounded-full border-2 border-white" />
              <Image src="/images/r3.png" alt="Person 3" width={24} height={24} className="rounded-full border-2 border-white" />
              <Image src="/images/mn.png" alt="Person 4" width={24} height={24} className="rounded-full border-2 border-white" />
            </div>
          </div>
          <Link href="#" className="text-blue-600 text-xs font-medium">
            View All
          </Link>
        </div>

        {/* Location and Time */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
              <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-black">Bulawayo</p>
              <p className="font-medium text-black">Zimbabwe International Trade Fair</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
              <FaClock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-black">April 21-22 2025</p>
              <p className="font-medium text-black">1205-1400</p>
            </div>
          </div>
        </div>

        {/* Confirm Attendance Button */}
        <button 
          onClick={handleConfirmAttendance}
          disabled={isLoading || showSuccess}
          className={`w-full bg-blue-600 text-white py-4 rounded-xl font-medium mb-8 relative ${
            (isLoading || showSuccess) ? 'opacity-75' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Confirming...
            </div>
          ) : showSuccess ? (
            'Confirmed!'
          ) : (
            'Confirm Attendance'
          )}
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage; 