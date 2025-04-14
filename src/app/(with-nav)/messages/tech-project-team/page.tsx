'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaEllipsisH, FaMicrophone, FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function TechProjectTeamChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey team! How's the project going?", isUser: true },
    { id: 2, text: "Great! We've just completed the UI redesign.", isUser: false },
    { id: 3, text: "That's awesome! When can we expect the next update?", isUser: true },
    { id: 4, text: "We're planning to deploy the new features by Friday.", isUser: false },
    { id: 5, text: "Perfect! Keep me posted on the progress.", isUser: true },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, isUser: true }]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      {/* Header */}
      <div className="relative pt-20 pb-3 px-4 border-b">
        <Link href="/messages" className="absolute top-8 left-4">
          <FaArrowLeft className="w-5 h-5 text-black" />
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ml-8">
            <div className="bg-[#0077C7] rounded-full p-1">
              <Image
                src="/images/tech (1).jpg"
                alt="Tech Project Team"
                width={28}
                height={28}
                className="rounded-full"
              />
            </div>
            <h1 className="text-[17px] font-semibold text-black">Tech Project Team</h1>
          </div>
          <button className="p-1">
            <FaEllipsisH className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-start' : 'justify-end'} items-start gap-2`}
          >
            {message.isUser && (
              <Image
                src="/images/mn.png"
                alt="User"
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <div
              className={`max-w-[80%] rounded-[20px] px-4 py-3 ${
                message.isUser
                ? 'bg-gray-200 text-black'
                : 'bg-[#0077C7] text-white'
              }`}
            >
              <p className="text-[15px]">{message.text}</p>
            </div>
            {!message.isUser && (
              <div className="bg-[#0077C7] rounded-full p-1">
                <Image
                  src="/images/tech (1).jpg"
                  alt="Team"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        ))}
        
        {/* Typing Indicator */}
        <div className="flex justify-end items-start gap-2">
          <div className="flex items-center gap-1 rounded-[20px] px-4 py-3">
            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
          </div>
          <div className="bg-[#0077C7] rounded-full p-1">
            <Image
              src="/images/tech (1).jpg"
              alt="Team"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t px-4 py-3 pb-16">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button 
            type={inputMessage.trim() ? "submit" : "button"} 
            className="p-2"
          >
            {inputMessage.trim() ? (
              <FaPaperPlane className="w-5 h-5 text-[#0077C7]" />
            ) : (
              <FaMicrophone className="w-5 h-5 text-black" />
            )}
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-black placeholder-gray-500 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
} 