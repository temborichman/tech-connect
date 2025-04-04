"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignScreen() {
  const router = useRouter();

  const handleSignUp = () => {
    // Navigate to the Signin screen
    router.push("/signin");
  };

  const handleLogin = () => {
    // Navigate to the Login screen
    router.push("/login");
  };

  return (
    <div className="h-screen bg-blue-500 flex flex-col justify-center items-center text-white px-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">Tech Connect</h1>

      {/* Bulb Image */}
      <div className="relative w-32 h-32 mb-8">
        <Image
          src="/images/Frame.png" // Ensure this is the correct image path
          alt="Bulb Image"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Sign Up Button */}
      <button
        onClick={handleSignUp}
        className="px-23 py-3 mb-4 bg-transparent border-2 text-white rounded-lg font-semibold"
      >
        Sign Up
      </button>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="px-25 py-3 bg-white border-2 border-white text-[#0077B5] rounded-lg font-semibold"
      >
        Login
      </button>
    </div>
  );
}
