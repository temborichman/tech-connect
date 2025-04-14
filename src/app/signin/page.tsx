"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaApple, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiLightBulb, HiOutlineLightBulb } from "react-icons/hi";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../lib/firebase";

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Only run on client-side
  useEffect(() => {
    setMounted(true);
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Handle Sign Up with animation
  const handleSignUp = async () => {
    try {
      // Reset error
      setError("");
      setLoading(true);

      // Validate inputs
      if (!name.trim()) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }

      if (!email.trim()) {
        setError("Please enter your email");
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      if (!password) {
        setError("Please enter a password");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: "user",
        preferences: {
          theme: theme,
          notifications: true
        }
      });

      // Sign out the user after registration
      await auth.signOut();

      setSuccess(true);
      
      // Wait for success message to be visible
      setTimeout(() => {
        // Use window.location for a hard redirect to ensure proper navigation
        window.location.href = "/login";
      }, 2000);

    } catch (error: any) {
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError("Email is already registered. Please login instead.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address");
      } else if (error.code === 'auth/operation-not-allowed') {
        setError("Email/password accounts are not enabled. Please contact support.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak. Please use a stronger password.");
      } else {
        setError(error.message || "Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div
      id="signup-container"
      className={`min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 dark:text-black transition-all duration-500 opacity-100`}
    >
      {/* Theme Toggle - Only render when mounted */}
      {mounted && (
        <div className="absolute top-5 left-0 self-start p-2">
          <button onClick={handleThemeToggle} className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1">
            <div className={`w-4 h-4 bg-black rounded-full transition-transform duration-300 ${theme === "dark" ? "translate-x-4" : ""}`}></div>
          </button>
        </div>
      )}

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-8">Create Account</h1>

      {/* Bulb Image */}
      <div className="relative w-32 h-32 mb-8">
        <Image src="/images/Frame.png" alt="Bulb Image" layout="fill" objectFit="contain" />
      </div>

      {/* Success Message */}
      {success && (
        <div className="w-full max-w-md mb-4 px-6">
          <p className="text-green-500 text-sm text-center">Account created successfully! Redirecting to login...</p>
        </div>
      )}

      {/* Form Inputs */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-4 px-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-lg p-3 text-center">
            {error}
          </div>
        )}

        {/* Name Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Enter full name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 dark:text-gray-400 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Sign Up Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`w-[280px] md:w-[320px] lg:w-[360px] py-2.5 px-4 rounded-lg font-medium transition-colors text-sm md:text-base ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1A73E8] text-white hover:bg-[#1557B0]"
          }`}
          onClick={handleSignUp}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>

      {/* OR Sign Up with */}
      <div className="text-gray-600 dark:text-black mt-3 text-center">
        <span>or sign up with</span>
      </div>

      {/* Social Sign-Up Buttons */}
      <div className="flex space-x-3 mt-3">
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

      {/* Login Link */}
      <div className="mt-4 text-center text-gray-600 dark:text-black">
        <span>
          Already have an account?{" "}
          <button onClick={handleLogin} className="text-[#006442] hover:underline">
            Login
          </button>
        </span>
      </div>
    </div>
  );
}
