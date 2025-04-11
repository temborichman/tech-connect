"use client";

import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
import { FaBell, FaArrowLeft, FaSearch, FaHome, FaUserPlus, FaPlus, FaEnvelope, FaUser } from 'react-icons/fa';
import BottomNav from '../../components/BottomNav';

export default function EventsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [activeCategory, setActiveCategory] = useState('All');
  
  const navItems = [
    { icon: FaHome, label: 'Home', path: '/' },
    { icon: FaUserPlus, label: 'Community', path: '/community' },
    { icon: FaPlus, label: 'Create', path: '/create' },
    { icon: FaEnvelope, label: 'Messages', path: '/messages' },
    { icon: FaUser, label: 'Profile', path: '/profile' },
  ];

  const categories = [
    { name: 'All' },
    { name: 'UI/UX Design' },
    { name: 'Software' },
    { name: 'Digital Marketing' },
  ];

  const events = [
    {
      id: 1,
      title: 'VR Update Launch',
      image: '/images/tech (2).jpeg',
      location: 'Zimbabwe International Trade Fair',
      date: '21-22 April 2025',
      time: '1200-1400'
    },
    {
      id: 2,
      title: 'Design Mindset Event',
      image: '/images/tech (1).jpeg',
      location: 'Online Meetup/Google Drive',
      date: '21-22 April 2025',
      time: '1000-1600'
    },
    {
      id: 3,
      title: 'UI/UX Workshop',
      image: '/images/fr (3).png',
      location: 'Tech Hub Harare',
      date: '23 April 2025',
      time: '0900-1700'
    },
    {
      id: 4,
      title: 'Design Systems Talk',
      image: '/images/fr (4).png',
      location: 'Virtual Event',
      date: '24 April 2025',
      time: '1400-1600'
    }
  ];

  return (
    <div className="bg-white min-h-screen px-5 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center pt-6 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/community">
            <FaArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-[28px] font-bold text-blue-600">Events</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="cursor-pointer">
            <Image
              src="/images/mn.png"
              alt="User profile"
              width={36}
              height={36}
              className="rounded-full"
            />
          </Link>
          <FaBell className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
        <input
          type="text"
          placeholder="Discover Latest Events..."
          className="w-full bg-gray-50 rounded-full py-3.5 pl-12 pr-4 text-gray-700 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg text-black font-semibold mb-4">Category Events</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium border border-blue-600 transition-all ${
                activeCategory === category.name
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* UI/UX Design Section */}
      <div className="mb-8 text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{activeCategory === 'All' ? 'UI/UX Design' : activeCategory}</h2>
          <Link href="#" className="text-blue-600 text-sm font-medium">
            View All
          </Link>
        </div>

        {/* Events Grid */}
        <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-5 px-5">
          {events.map((event) => (
            <Link href={`/community/events/${event.id}`} key={event.id} className="flex-none w-[280px]">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                <div className="relative h-[200px] w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <FaMapMarkerAlt className="w-3 h-3 text-blue-600" />
                    </div>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <FaClock className="w-3 h-3 text-blue-600" />
                    </div>
                    <span>{event.date} / {event.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to Home Screen Button */}
      <div className="flex justify-center mb-20">
        <Link 
          href="/homescreen"
          className="bg-blue-600 text-white px-16 py-3 rounded-lg font-medium w-80 text-center"
        >
          Back to Home Screen
        </Link>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 