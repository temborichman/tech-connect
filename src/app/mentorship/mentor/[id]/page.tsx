'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaHome, FaUsers, FaPlus, FaComments, FaUser } from 'react-icons/fa';

export default function MentorProfilePage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Large Profile Image */}
      <div className="relative h-[55vh] bg-orange-300">
        <div className="absolute inset-0">
          <Image
            src="/images/tech (11).jpg"
            alt="Rodney Moyo"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-5">
          <Link href="/mentorship/matches" className="flex items-center">
            <FaArrowLeft className="w-4 h-4 text-black" />
          </Link>
        </div>

        {/* White Curved Edge */}
        <div className="absolute -bottom-5 left-0 right-0 h-10 bg-white rounded-t-[32px]" />
      </div>

      {/* Profile Content */}
      <div className="relative bg-white">
        <div className="pt-3 px-8">
          {/* Name and Role */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1 text-black">Rodney Moyo</h1>
            <p className="text-black">UX/UI Designer</p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-black">Description</h2>
            <p className="text-black text-sm leading-relaxed">
              Rodney Moyo, a leading User Experience Designer in crafting highly beautiful and clean animated websites, applications,
              <span className="text-blue-600 ml-1 cursor-pointer">Read More</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium">
              Request Mentorship
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3.5 rounded-xl font-medium">
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2">
        <div className="flex justify-around items-center px-6">
          <Link href="/homescreen" className="flex flex-col items-center">
            <FaHome className="w-6 h-6 text-gray-400" />
          </Link>
          <Link href="/community" className="flex flex-col items-center">
            <FaUsers className="w-6 h-6 text-blue-600" />
            <span className="text-xs text-blue-600">Community</span>
          </Link>
          <Link href="/create" className="flex flex-col items-center">
            <FaPlus className="w-6 h-6 text-gray-400" />
          </Link>
          <Link href="/messages" className="flex flex-col items-center">
            <FaComments className="w-6 h-6 text-gray-400" />
          </Link>
          <Link href="/profile" className="flex flex-col items-center">
            <FaUser className="w-6 h-6 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
} 