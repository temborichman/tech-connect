'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBell, FaHome, FaUserPlus, FaPlus, FaEnvelope, FaUser } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';


const CommunityPage = () => {
  const path = usePathname();

  const navItems = [
    { icon: FaHome, label: 'Home', path: '/' },
    { icon: FaUserPlus, label: 'Community', path: '/community' },
    { icon: FaPlus, label: 'Create', path: '/create' },
    { icon: FaEnvelope, label: 'Messages', path: '/messages' },
    { icon: FaUser, label: 'Profile', path: '/profile' },
  ];

  const communityFeatures = [
    {
      title: 'Event Listing',
      image: '/images/fr(2).png',
      link: '/community/events'
    },
    {
      title: 'Mentorship',
      image: '/images/fr(1).png',
      link: '/mentorship/browse'
    },
    {
      title: 'Project Collaboration',
      image: '/images/fr(3).png',
      link: '/messages/tech-project-team'
    },
    {
      title: 'Job Board',
      image: '/images/fr(4).png',
      link: '/community/job-board'
    }
  ];

  return (
    <div className="bg-white min-h-screen px-5 pt-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[28px] font-bold text-blue-600">Community</h1>
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

      {/* Subtitle */}
      <h2 className="text-xl text-gray-800 mb-8 font-medium">Explore The Best Of Our Community</h2>

      {/* Community Features Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {communityFeatures.map((feature, index) => (
          <Link 
            href={feature.title === 'Mentorship' ? '/mentorship/browse' : feature.link} 
            key={index} 
            className="relative group"
          >
            <div className="relative w-full pt-[150%] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-black bg-opacity-45"></div>
              <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                {feature.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Back To Home Button */}
      <Link 
        href="/homescreen" 
        className="block w-full max-w-md mx-auto bg-blue-600 text-white py-3 px-6 rounded-xl text-center font-medium mb-16"
      >
        Back To Home Screen
      </Link>

      <BottomNav />
    </div>
  );
};

export default CommunityPage;
