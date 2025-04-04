'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaBell, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import BottomNav from '../components/BottomNav';

interface Chat {
  id: number;
  name: string;
  isTyping: boolean;
  image: string;
  hasUnread?: boolean;
}

export default function MessagesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const recentUsers = [
    { id: 1, name: 'Sarah Wilson', image: '/images/tech (14).jpg' },
    { id: 2, name: 'John Smith', image: '/images/tech (15).jpg' },
    { id: 3, name: 'Emma Davis', image: '/images/tech (4).jpg' },
  ];

  const chats: Chat[] = [
    { id: 1, name: 'Sarah Wilson', isTyping: true, image: '/images/tech (14).jpg' },
    { id: 2, name: 'Tech Project Team', isTyping: true, image: '/images/tech (1).jpg' },
    { id: 3, name: 'David Chen', isTyping: false, image: '/images/tech (15).jpg' },
    { id: 4, name: 'Maria Rodriguez', isTyping: true, image: '/images/tech (4).jpg' },
    { id: 5, name: 'Design Team', isTyping: false, image: '/images/tech (16).jpg' },
    { id: 6, name: 'Alex Thompson', isTyping: false, image: '/images/tech (17).jpg' },
    { id: 7, name: 'UI/UX Workshop', isTyping: true, image: '/images/tech (19).jpg' },
    { id: 8, name: 'James Wilson', isTyping: false, image: '/images/tech (20).jpg' },
    { id: 9, name: 'Frontend Team', isTyping: true, image: '/images/tech (21).jpg' },
    { id: 10, name: 'Lisa Wang', isTyping: false, image: '/images/tech (22).jpg' }
  ];

  const moreUsers = [
    { image: '/images/tech (14).jpg' },
    { image: '/images/tech (15).jpg' },
    { image: '/images/tech (4).jpg' },
    { image: '/images/tech (16).jpg' }
  ];

  const handleChatClick = (chatName: string) => {
    if (chatName === 'Tech Project Team') {
      router.push('/messages/tech-project-team');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="relative px-4 pt-20 pb-4">
        <Link href="/homescreen" className="absolute top-8 left-4">
          <FaArrowLeft className="w-5 h-5 text-black" />
        </Link>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-[#0077C7] text-2xl font-semibold">Messaging</h1>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/mn.png"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <FaBell className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Recent Users */}
        <div className="flex gap-3 mb-6">
          {recentUsers.map((user, index) => (
            <div key={user.id} className="relative">
              <Image
                src={user.image}
                alt={user.name}
                width={56}
                height={56}
                className="rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 rounded-b-lg py-1 px-2">
                <p className="text-white text-xs text-center">{user.name}</p>
              </div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          ))}
          <div className="relative">
            <div className="w-[56px] h-[56px] rounded-lg bg-gray-200 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1 p-1">
                {moreUsers.map((user, index) => (
                  <Image
                    key={index}
                    src={user.image}
                    alt="User"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 rounded-b-lg py-1 px-2">
              <p className="text-white text-xs text-center">+7 More</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for chat..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-black placeholder-gray-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'all'
                ? 'bg-[#0077C7] text-white'
                : 'border border-gray-300 text-black'
            }`}
          >
            All Chats
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'unread'
                ? 'bg-[#0077C7] text-white'
                : 'border border-gray-300 text-black'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'groups'
                ? 'bg-[#0077C7] text-white'
                : 'border border-gray-300 text-black'
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 px-4 pb-[72px]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.name)}
            className="flex items-center gap-3 py-3 border-b cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <Image
                src={chat.image}
                alt={chat.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-black">{chat.name}</h3>
              <p className="text-gray-500 text-sm">
                {chat.isTyping ? `${chat.name.split(' ')[0]} is typing...` : 'Online'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 