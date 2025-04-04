'use client'; // Ensure this is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

export default function InterestsScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fadeOut, setFadeOut] = useState(false); // State for animation
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevState) =>
      prevState.includes(category)
        ? prevState.filter((item) => item !== category)
        : [...prevState, category]
    );
  };

  const handleGetStarted = () => {
    setFadeOut(true); // Start fade-out animation
    setTimeout(() => {
      router.push('/homescreen'); // Navigate after animation
    }, 500); // Match animation duration
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center bg-white p-4 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Theme Toggle */}
      <div className="self-start p-2">
        <button className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1">
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </button>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-xl text-black font-semibold">Interests</h1>
      <p className="text-center text-black px-6">
        Enter your tech passions so you can get the most of our app
      </p>

      {/* Location Input */}
      <div className="w-full max-w-md mt-4 relative">
        <input
          type="text"
          placeholder="Enter Location..."
          className="w-full text-gray-600  rounded-lg py-2 px-4 shadow-md"
        />
        <span className="absolute right-4 top-2.5">▼</span>
      </div>

      {/* Categories */}
      <div className="w-full max-w-md mt-6">
        <h2 className="text-lg text-black font-semibold">Popular Categories</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Software Dev', 'Data Science', 'Web Developer', 'Cyber-Security', 'UX/UI Design', 'Systems Admin'].map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(item)}
              className={`px-4 py-2 rounded-full border relative ${
                selectedCategories.includes(item)
                  ? 'bg-blue-600 text-white'
                  : 'border-blue-600 text-blue-600'
              }`}
            >
              {selectedCategories.includes(item) && (
                <span className="absolute top-0 right-0 text-white text-xl">✔</span>
              )}
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full text-black max-w-md mt-6">
        <h2 className="text-lg font-semibold">Featured Categories</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Digital Marketing', 'AI Research', 'Game Developer', 'AI Engineering', 'Graphic Design', 'App Dev', 'Logo Design', 'Back-end dev'].map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(item)}
              className={`px-4 py-2 rounded-full border relative ${
                selectedCategories.includes(item)
                  ? 'bg-blue-600 text-white'
                  : 'border-blue-600 text-blue-600'
              }`}
            >
              {selectedCategories.includes(item) && (
                <span className="absolute top-0 right-0 text-white text-xl">✔</span>
              )}
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        className="px-33 py-3 mt-6 bg-[#0077B5] text-white rounded-lg font-semibold transition-all duration-500 transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
}
