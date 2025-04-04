"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaApple, FaUser, FaLock } from "react-icons/fa";
import { HiLightBulb, HiOutlineLightBulb } from "react-icons/hi";

export default function LoginPage() {
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Handle login with animation
  const handleLogin = () => {
    const container = document.getElementById("login-container");

    if (container) {
      container.classList.add("fade-out"); // Add animation class
      setTimeout(() => {
        router.push("/interests"); // Navigate after animation
      }, 500); // Delay matches animation duration
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div
      id="login-container"
      className={`min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 dark:text-black transition-all duration-500 opacity-100`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-5 left-0 self-start p-2">
        <button className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1">
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-8">Tech Connect</h1>

      {/* Bulb Image */}
      <div className="relative w-32 h-32 mb-8">
        <Image src="/images/Frame.png" alt="Bulb Image" layout="fill" objectFit="contain" />
      </div>

      {/* Form Inputs */}
      <div className="w-full max-w-md space-y-4 px-6">
        {/* Name Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Enter full name..."
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Enter Password..."
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="px-37 py-3 mt-6 bg-[#0077B5] text-white rounded-lg font-semibold"
      >
        Login
      </button>

      {/* OR Sign Up with */}
      <div className="text-gray-600 dark:text-black mt-4 text-center">
        <span>or sign up with</span>
      </div>

      {/* Social Sign-Up Buttons */}
      <div className="flex space-x-4 mt-4">
        <button className="p-2 rounded-full bg-blue-600 text-white">
          <FaFacebook />
        </button>
        <button className="p-2 rounded-full bg-red-600 text-white">
          <FaGoogle />
        </button>
        <button className="p-2 rounded-full bg-black text-white">
          <FaApple />
        </button>
      </div>

      {/* SignUp Link */}
      <div className="mt-6 text-center text-gray-600 dark:text-black">
        <span>
          Don't have an account?{" "}
          <button onClick={handleSignUp} className="text-[#006442] hover:underline">
            Sign up
          </button>
        </span>
      </div>
    </div>
  );
}
