'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBell, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import BottomNav from '@/app/components/BottomNav';

// Sample job data
const jobs = [
  {
    id: 1,
    title: 'Software Developer',
    type: 'Full Time',
    location: 'Remote Job',
    image: '/images/cat.png'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    type: 'Full Time',
    location: 'Remote Job',
    image: '/images/cat.png'
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    type: 'Full Time',
    location: 'Remote Job',
   image: '/images/cat.png'
  }
];

export default function JobBoard() {
  const [activeFilter, setActiveFilter] = useState('Full Time');

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Back Arrow */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 px-4 py-4">
        <Link href="/community" className="text-black">
          <FaArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-20 pb-4">
        <h1 className="text-2xl font-semibold text-[#0077C7]">Job Board</h1>
        <div className="flex items-center gap-4">
          <Image
            src="/images/mn.png"
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full"
          />
          <FaBell className="w-6 h-6 text-[#0077C7]" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Industry..."
            className="w-full py-3 px-12 rounded-full bg-gray-100 text-gray-700 focus:outline-none"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 px-4 mb-6 overflow-x-auto pb-2">
        {['Full Time', 'Remote', 'Internship'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === filter
                ? 'bg-[#0077C7] text-white'
                : 'bg-white text-[#0077C7] border border-[#0077C7]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Job Listings */}
      <div className="px-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm border p-4 mb-4">
            <div className="flex gap-4">
              <Image
                src={job.image}
                alt={job.title}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.type}</p>
                <div className="flex items-center text-gray-500">
                  <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                  <span className="text-sm">{job.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                href={`/community/job-board/${job.id}`}
                className="text-[#0077C7] text-sm font-medium hover:underline"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 