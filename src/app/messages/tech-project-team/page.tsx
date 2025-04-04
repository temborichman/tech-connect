'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaHeart, FaEllipsisH, FaImages, FaMicrophone } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  image?: string;
  sender?: string;
}

interface TeamMember {
  id: number;
  image: string;
}

export default function TechProjectTeamChat() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hey guys...", 
      isUser: true,
      sender: "David"
    },
    {
      id: 2,
      text: "Have completed task one. How is the rest of the team doing?",
      isUser: true,
      image: "/images/cat.png",
      sender: "David"
    },
    {
      id: 3,
      text: "Hey David. Dropping something soon",
      isUser: false,
      sender: "John"
    },
    {
      id: 4,
      text: "Wow looks good David.",
      isUser: false,
      sender: "Sarah"
    },
    {
      id: 5,
      text: "Sending in my figma link in 30 minutes.",
      isUser: false,
      sender: "Emma"
    }
  ]);

  const teamMembers: TeamMember[] = [
    { id: 1, image: '/images/tech (14).jpg' },
    { id: 2, image: '/images/tech (15).jpg' },
    { id: 3, image: '/images/tech (4).jpg' },
    { id: 4, image: '/images/tech (16).jpg' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: inputMessage, isUser: true, sender: "David" }
      ]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="relative pt-20 pb-3 px-4 border-b">
        <Link href="/messages" className="absolute top-8 left-4">
          <FaArrowLeft className="w-5 h-5 text-black" />
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="relative w-[62px] h-[62px] bg-white rounded-lg flex items-center justify-center">
              <Image
                src="/images/cat.png"
                alt="Tech Project Team"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex -space-x-1.5">
                {[1,2,3,3].map((_, index) => (
                  <div key={index} className="w-[18px] h-[18px] relative">
                    <Image
                      src="/images/mn.png"
                      alt={`Member ${index + 1}`}
                      width={18}
                      height={18}
                      className="rounded-full border-[1.5px] border-white"
                    />
                  </div>
                ))}
              </div>
              <h1 className="text-[17px] text-black font-semibold">Tech Project Team</h1>
              <p className="text-sm text-green-800">12 Members</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaHeart className="w-5 h-5 text-red-500" />
            <FaEllipsisH className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-start' : 'justify-end'} w-full`}
          >
            <div className={`flex flex-col ${message.isUser ? 'items-start' : 'items-end'} max-w-[70%]`}>
              <Image
                src="/images/mn.png"
                alt={message.isUser ? "User" : (message.sender || 'Team member')}
                width={36}
                height={36}
                className="rounded-full mb-1"
              />
              <div className="flex flex-col gap-1">
                {message.image && (
                  <div className="rounded-lg overflow-hidden mb-2">
                    <Image
                      src={message.image}
                      alt="Shared image"
                      width={240}
                      height={240}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                <div
                  className={`rounded-[20px] px-4 py-3 ${
                    message.isUser
                      ? 'bg-gray-200 text-black'
                      : 'bg-[#0077C7] text-white'
                  }`}
                >
                  <p className="text-[15px]">{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaImages className="w-6 h-6 text-gray-500" />
            </div>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full pl-12 pr-4 py-2 border border-[#0077C7] rounded-lg focus:outline-none focus:border-[#0077C7] text-[15px] text-black placeholder-gray-500"
            />
          </div>
          <button
            type="button"
            className="p-2 rounded-full border-2 border-black"
          >
            <FaMicrophone className="w-6 h-6 text-black" />
          </button>
        </form>
      </div>
    </div>
  );
} 