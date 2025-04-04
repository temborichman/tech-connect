"use client"; // Required for state handling in Next.js (App Router)

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import Image from "next/image";

const slides = [
  {
    image: "/images/r2.png",
    title: "Tech Connect",
    text: "A place where industry experts and emerging talent come together to connect, share knowledge, and find the guidance needed to thrive in the ever-evolving world of technology.",
  },
  {
    image: "/images/r3.png",
    title: "Mentorship. Growth. Connection.",
    text: "Tech Connect empowers growth through mentorship, connecting tech professionals with experienced mentors to foster development and collaboration in a thriving community.",
  },
];

export default function GetStartedScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Animation state
  const router = useRouter();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleGetStarted = () => {
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      router.push("/sign"); // Navigate to SignScreen after animation
    }, 500); // Match the animation duration
  };

  return (
    <div
      className={`h-screen flex flex-col bg-gray-100 transition-opacity duration-500 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Image Section (Top Half) */}
      <div className="relative flex-1 w-full">
        <Image
          src={slides[currentSlide].image}
          alt="Slide Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section (Bottom Half) */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{slides[currentSlide].title}</h1>
        <p className="text-gray-600 mt-4 max-w-lg">{slides[currentSlide].text}</p>

        {/* Pagination Dots */}
        <div className="flex mt-6 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === currentSlide ? "bg-[#0077B5]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Get Started Button */}
        <button
          className="mt-6 px-30 py-3 bg-[#0077B5] text-white rounded-lg font-semibold"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}