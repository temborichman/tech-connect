'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaBell, FaHome, FaUsers, FaPlus, FaComments, FaUser, FaChevronRight } from 'react-icons/fa';
import { MdNotifications, MdAnalytics, MdGroup, MdLogout } from 'react-icons/md';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="px-5 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <Link href="/homescreen" className="flex items-center">
            <FaArrowLeft className="w-4 h-4 text-black" />
          </Link>
          <FaBell className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 relative rounded-full overflow-hidden">
            <Image
              src="/images/tech (2).jpg"
              alt="David Chikanga"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-black">David Chikanga</h1>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
                <path fill="currentColor" d="M20 20.0001C20 20.5524 19.5523 21.0001 19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V4.00012C4 3.44784 4.44772 3.00012 5 3.00012H19C19.5523 3.00012 20 3.44784 20 4.00012V20.0001ZM16 12.0001C16 10.9396 15.1046 10.0001 14 10.0001C12.8954 10.0001 12 10.9396 12 12.0001C12 13.0607 12.8954 14.0001 14 14.0001C15.1046 14.0001 16 13.0607 16 12.0001ZM14 8.00012C16.2091 8.00012 18 9.79098 18 12.0001C18 14.2093 16.2091 16.0001 14 16.0001C11.7909 16.0001 10 14.2093 10 12.0001C10 9.79098 11.7909 8.00012 14 8.00012Z"/>
              </svg>
            </div>
            <span className="text-gray-600">+263 123456789</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
                <path fill="currentColor" d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4ZM20 6V6.31L12 11.875L4 6.31V6H20ZM4 18V8.69L11.5625 14L12 14.295L12.4375 14L20 8.69V18H4Z"/>
              </svg>
            </div>
            <span className="text-gray-600">example@gmail.com</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-blue-600 rounded-2xl p-4 text-center">
            <p className="text-white text-2xl font-semibold mb-1">121</p>
            <p className="text-white text-sm">Connections</p>
          </div>
          <div className="flex-1 bg-blue-600 rounded-2xl p-4 text-center">
            <p className="text-white text-2xl font-semibold mb-1">5</p>
            <p className="text-white text-sm">Group Projects</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          <Link href="/notifications" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <MdNotifications className="w-6 h-6 text-gray-600" />
              <span className="text-black">Your Notifications</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link href="/analytics" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <MdAnalytics className="w-6 h-6 text-gray-600" />
              <span className="text-black">Analytics</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link href="/collaborations" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <MdGroup className="w-6 h-6 text-gray-600" />
              <span className="text-black">Project Colloborations</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link href="/connections" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <FaUsers className="w-6 h-6 text-gray-600" />
              <span className="text-black">Your connections</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <button 
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <MdLogout className="w-6 h-6 text-red-500" />
              <span className="text-red-500">Log Out</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2">
        <div className="flex justify-around items-center px-6">
          <Link href="/homescreen" className="flex flex-col items-center">
            <FaHome className="w-6 h-6 text-gray-400" />
          </Link>
          <Link href="/community" className="flex flex-col items-center">
            <FaUsers className="w-6 h-6 text-gray-400" />
          </Link>
          <Link href="/create" className="flex flex-col items-center">
            <FaPlus className="w-6 h-6 text-gray-400" />
          </Link>
          <Link href="/messages" className="flex flex-col items-center">
            <FaComments className="w-6 h-6 text-gray-400" />
          </Link>
          <Link href="/profile" className="flex flex-col items-center">
            <FaUser className="w-6 h-6 text-blue-600" />
            <span className="text-xs text-blue-600">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 