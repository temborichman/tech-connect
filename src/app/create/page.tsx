'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaEllipsisH, FaMicrophone, FaImages, FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function CreateScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey", isUser: true },
    { id: 2, text: "Hey David. How may I help you?", isUser: false },
    { id: 3, text: "Who designed this application?", isUser: true },
    { id: 4, text: "Tech Connect is an application that was designed by the UX/UI enthusiast Daniel Mudimba.", isUser: false },
    { id: 5, text: "What inspired him?", isUser: true },
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
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="relative pt-20 pb-3 px-4 border-b">
        <Link href="/homescreen" className="absolute top-8 left-4">
          <FaArrowLeft className="w-5 h-5 text-black" />
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ml-8">
            <div className="bg-[#0077C7] rounded-full p-1">
              <Image
                src="/images/create.png"
                alt="Tech Connect AI"
                width={28}
                height={28}
                className="rounded-full brightness-0 invert"
              />
            </div>
            <h1 className="text-[17px] font-semibold text-black">Tech Connect A.I</h1>
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
                  src="/images/create.png"
                  alt="AI"
                  width={32}
                  height={32}
                  className="rounded-full brightness-0 invert"
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
              src="/images/create.png"
              alt="AI"
              width={32}
              height={32}
              className="rounded-full brightness-0 invert"
            />
          </div>
        </div>
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
            type={inputMessage.trim() ? "submit" : "button"}
            className={`p-2 rounded-full border-2 ${inputMessage.trim() ? 'bg-[#0077C7] border-[#0077C7]' : 'border-black'}`}
          >
            {inputMessage.trim() ? (
              <FaPaperPlane className="w-6 h-6 text-white" />
            ) : (
              <FaMicrophone className="w-6 h-6 text-black" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 