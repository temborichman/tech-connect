'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaBell, FaChevronDown } from 'react-icons/fa';

export default function BrowseMentorsPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/mentorship/loading');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-5 pt-4">
        <Link href="/homescreen" className="flex items-center mb-6">
          <FaArrowLeft className="w-4 h-4 text-black" />
        </Link>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Tech Connect</h1>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 relative">
              <Image
                src="/images/mn.png"
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <FaBell className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-5 mt-8">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 px-5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-gray-50 text-black whitespace-nowrap text-sm">
            Industry
            <FaChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-2 px-5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-gray-50 text-black whitespace-nowrap text-sm">
            Age
            <FaChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-2 px-5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-gray-50 text-black whitespace-nowrap text-sm">
            Country
            <FaChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 mt-8">
        <h2 className="text-[28px] font-bold mb-1 text-black text-center">Find A Mentor</h2>
        <p className="text-sm text-black mb-6 text-center">Find the perfect Mentor for you to help kickstart your journey</p>

        {/* Mentor Grid */}
        <div className="relative h-[460px] grid grid-rows-[280px_180px] gap-2">
          {/* Top Row */}
          <div className="grid grid-cols-12 gap-2">
            {/* Top Left */}
            <div className="col-span-5 relative rounded-2xl overflow-hidden">
              <Image
                src="/images/tech (11).jpg"
                alt="Mentor"
                fill
                className="object-cover"
              />
            </div>
            {/* Top Center */}
            <div className="col-span-4 relative rounded-2xl overflow-hidden">
              <Image
                src="/images/tech (1).jpg"
                alt="Mentor"
                fill
                className="object-cover"
              />
            </div>
            {/* Top Right Section */}
            <div className="col-span-3 grid grid-rows-[1fr_0.5fr] gap-2">
              {/* Top Right Upper */}
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/tech (25).jpg"
                  alt="Mentor"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Top Right Lower */}
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/tech (13).jpg"
                  alt="Mentor"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-12 gap-2">
            {/* Bottom Left */}
            <div className="col-span-5 relative rounded-2xl overflow-hidden">
              <Image
                src="/images/tech (2).jpg"
                alt="Mentor"
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom Right */}
            <div className="col-span-7 relative rounded-2xl overflow-hidden">
              <Image
                src="/images/tech (12).jpg"
                alt="Mentor"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button 
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium text-base"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
} 