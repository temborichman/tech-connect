"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaApple, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../lib/firebase";
import Link from "next/link";

export default function LoginPage() {
  const [theme, setTheme] = useState("light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate email format
      if (!email || !email.includes("@")) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Validate password
      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("User not found in database");
      }

      // Update last login time
      await updateDoc(doc(db, "users", user.uid), {
        lastLogin: new Date().toISOString(),
      });

      // Show success message and redirect
      setLoading(false);
      setTimeout(() => {
        router.push("/interests");
      }, 1000);

    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        switch (error.message) {
          case "auth/user-not-found":
            setError("No account found with this email");
            break;
          case "auth/wrong-password":
            setError("Incorrect password");
            break;
          case "auth/invalid-credential":
            setError("Invalid email or password");
            break;
          case "auth/too-many-requests":
            setError("Too many failed attempts. Please try again later");
            break;
          default:
            setError("An error occurred. Please try again");
        }
      } else {
        setError("An unexpected error occurred");
      }
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
        <button onClick={handleThemeToggle} className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1">
          <div className={`w-4 h-4 bg-black rounded-full transition-transform duration-300 ${theme === "dark" ? "translate-x-4" : ""}`}></div>
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-8">Tech Connect</h1>

      {/* Bulb Image */}
      <div className="relative w-32 h-32 mb-8">
        <Image src="/images/Frame.png" alt="Bulb Image" layout="fill" objectFit="contain" />
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-md mb-4 px-6">
          <p className="text-red-500 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Form Inputs */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-4 px-6">
        {/* Email Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
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
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 dark:text-gray-400 ml-2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Login Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`w-[280px] md:w-[320px] lg:w-[360px] py-2.5 px-4 rounded-lg font-medium transition-colors text-sm md:text-base ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1A73E8] text-white hover:bg-[#1557B0]"
          }`}
          onClick={handleLogin}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </div>

      {/* OR Sign Up with */}
      <div className="text-gray-600 dark:text-black mt-3 text-center">
        <span>or sign up with</span>
      </div>

      {/* Social Sign-Up Buttons */}
      <div className="flex space-x-3 mt-3">
        <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <FaFacebook />
        </button>
        <button className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
          <FaGoogle />
        </button>
        <button className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
          <FaApple />
        </button>
      </div>

      {/* SignUp Link */}
      <div className="mt-4 text-center text-gray-600 dark:text-black">
        <span>
          Don't have an account?{" "}
          <button onClick={handleSignUp} className="text-[#006442] hover:underline">
            Sign up
          </button>
        </span>
      </div>

      {/* Forgot Password Link */}
      <div className="mt-3 text-center text-gray-600 dark:text-black">
        <Link
          href="/forgot-password"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
