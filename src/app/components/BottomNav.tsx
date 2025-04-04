'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUserPlus, FaEnvelope, FaUser } from 'react-icons/fa';
import Image from 'next/image';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: FaHome, label: 'Home', path: '/' },
    { icon: FaUserPlus, label: 'Community', path: '/community' },
    { 
      icon: () => <Image src="/images/create.png" alt="Create" width={24} height={24} />, 
      label: 'Create', 
      path: '/create' 
    },
    { icon: FaEnvelope, label: 'Messages', path: '/messages' },
    { icon: FaUser, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-between items-center px-6 pt-2 pb-6">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.path === '/messages' 
            ? pathname === '/messages' || pathname.startsWith('/messages/') || pathname.startsWith('/chat')
            : pathname.startsWith(item.path);
          
          return (
            <Link 
              key={index} 
              href={item.path}
              className="flex flex-col items-center"
            >
              {typeof Icon === 'function' ? (
                <Icon />
              ) : (
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? 'text-[#0077C7]' : 'text-gray-500'
                  }`} 
                />
              )}
              <span className={`text-xs mt-1 ${
                isActive ? 'text-[#0077C7] font-medium' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 