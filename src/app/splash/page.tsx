"use client"; // Enables client-side behavior
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto-navigate to "Get Started" screen after 3 seconds
    const timer = setTimeout(() => {
      router.push("/get-started");
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0077C7] text-white">
      <h1 className="text-4xl font-bold mb-4">Tech Connect</h1>
      <Image 
        src="/images/Frame.png" 
        alt="Bulb Icon" 
        width={100} 
        height={100} 
        className="mt-4"
      />
    </div>
  );
}
