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

export default function GetStartedPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Animation state

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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Tech Connect Logo"
            width={120}
            height={120}
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
          Welcome to Tech Connect
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md md:max-w-lg lg:max-w-xl">
          Connect with tech enthusiasts, share knowledge, and grow together in the world of technology.
        </p>

        {/* Carousel */}
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mb-8">
          <div className="relative h-64 md:h-72 lg:h-80">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4">
                    {slide.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/signin")}
            className="w-[280px] md:w-[320px] lg:w-[360px] py-2.5 px-4 bg-[#1A73E8] text-white rounded-lg font-medium hover:bg-[#1557B0] transition-colors text-sm md:text-base"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}