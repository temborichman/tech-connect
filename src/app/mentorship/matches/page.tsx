'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaBell, FaHome, FaUsers, FaPlus, FaComments, FaUser } from 'react-icons/fa';

const mentors = [
  {
    id: 1,
    name: 'Rodney Moyo',
    role: 'UX/UI Designer',
    image: '/images/tech (11).jpg',
    bgColor: 'bg-orange-300'
  },
  {
    id: 2,
    name: 'Rajesh Moor',
    role: 'UX/UI Designer',
    image: '/images/tech (1).jpg',
    bgColor: 'bg-gray-200'
  },
  {
    id: 3,
    name: 'Jane Collins',
    role: 'UX/UI Designer',
    image: '/images/tech (25).jpg',
    bgColor: 'bg-gray-200'
  },
  {
    id: 4,
    name: 'David Chikanga',
    role: 'UX/UI Designer',
    image: '/images/tech (2).jpg',
    bgColor: 'bg-gray-200'
  },
  {
    id: 5,
    name: 'Sarah Johnson',
    role: 'UX/UI Designer',
    image: '/images/tech (12).jpg',
    bgColor: 'bg-pink-200'
  },
  {
    id: 6,
    name: 'Michelle Lee',
    role: 'UX/UI Designer',
    image: '/images/tech (13).jpg',
    bgColor: 'bg-purple-200'
  }
];

export default function MentorsPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="px-5 pt-4">
        <Link href="/homescreen" className="flex items-center">
          <FaArrowLeft className="w-4 h-4 text-black" />
        </Link>
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-2xl font-bold text-blue-600">Tech Connect</h1>
          <div className="flex items-center gap-3">
            <Link href="/profile" className="cursor-pointer">
              <div className="w-7 h-7 relative">
                <Image
                  src="/images/mn.png"
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </Link>
            <FaBell className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-5 mt-6">
        <h2 className="text-xl text-black">Mentors Based On Your Profile</h2>
      </div>

      {/* Mentors Grid */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-4">
        {mentors.map((mentor) => (
          <Link href={`/mentorship/mentor/${mentor.id}`} key={mentor.id}>
            <div className="relative aspect-[4/5]">
              <div className={`absolute inset-0 rounded-2xl overflow-hidden ${mentor.bgColor}`}>
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-semibold text-lg">{mentor.name}</h3>
                  <p className="text-white text-sm">{mentor.role}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
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