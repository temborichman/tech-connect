'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/mentorship/matches');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Half with Background */}
      <div className="relative bg-blue-50 h-[45vh]">
        {/* Back Arrow */}
        <div className="px-5 pt-4">
          <Link href="/homescreen" className="flex items-center">
            <FaArrowLeft className="w-4 h-4 text-black" />
          </Link>
        </div>

        {/* Mentor Cards - Positioned at bottom of blue section */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          <div className="relative w-64 h-80">
            {/* First Card */}
            <div className="absolute top-0 left-0 w-48 h-64 rounded-2xl overflow-hidden transform -rotate-12 shadow-lg">
              <Image
                src="/images/tech (11).jpg"
                alt="Mentor"
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className="bg-blue-500 w-5 h-5 rounded-full" />
              </div>
            </div>
            {/* Second Card */}
            <div className="absolute top-0 right-0 w-48 h-64 rounded-2xl overflow-hidden transform rotate-12 shadow-lg">
              <Image
                src="/images/tech (1).jpg"
                alt="Mentor"
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className="bg-blue-500 w-5 h-5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Half Content */}
      <div className="flex flex-col items-center justify-center px-5 mt-24">
        {/* Loading Dots */}
        <div className="relative w-10 h-10 mb-6">
          <div className="absolute w-full h-full rounded-full animate-[rotate_1.5s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black" />
          </div>
          <div className="absolute w-full h-full rounded-full animate-[rotate_1.5s_linear_infinite_0.25s]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black" />
          </div>
          <div className="absolute w-full h-full rounded-full animate-[rotate_1.5s_linear_infinite_0.5s]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black" />
          </div>
          <div className="absolute w-full h-full rounded-full animate-[rotate_1.5s_linear_infinite_0.75s]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black" />
          </div>
          <div className="absolute w-full h-full rounded-full animate-[rotate_1.5s_linear_infinite_1s]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-black">Finding A Mentor</h1>
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx global>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 