"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaApple, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../lib/firebase";

export default function SignUpPage() {
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    try {
      setError("");
      setLoading(true);

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        password: formData.password, // Note: In production, never store passwords in Firestore
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

  return (
    <div
      id="signup-container"
      className={`min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 dark:text-black transition-all duration-500 opacity-100`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-5 left-0 self-start p-2">
        <button onClick={handleThemeToggle} className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1">
          <div className={`w-4 h-4 bg-black rounded-full transition-transform duration-300 ${theme === "dark" ? "translate-x-4" : ""}`}></div>
        </button>
      </div>

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

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-md mb-4 px-6">
          <p className="text-red-500 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Form Inputs */}
      <div className="w-full max-w-md space-y-4 px-6">
        {/* Name Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={formData.name}
            onChange={handleInputChange}
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            value={formData.email}
            onChange={handleInputChange}
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password..."
            value={formData.password}
            onChange={handleInputChange}
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 dark:text-gray-400 ml-2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
          <FaLock className="text-gray-500 dark:text-gray-400 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password..."
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="flex-1 text-lg bg-transparent placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Sign Up Button */}
      <button
        onClick={handleSignUp}
        disabled={loading}
        className={`px-37 py-3 mt-6 bg-[#0077B5] text-white rounded-lg font-semibold hover:bg-[#006394] transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
            Creating Account...
          </div>
        ) : (
          'Sign Up'
        )}
      </button>

      {/* OR Sign Up with */}
      <div className="text-gray-600 dark:text-black mt-4 text-center">
        <span>or sign up with</span>
      </div>

      {/* Social Sign-Up Buttons */}
      <div className="flex space-x-4 mt-4">
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

      {/* Login Link */}
      <div className="mt-6 text-center text-gray-600 dark:text-black">
        <span>
          Already have an account?{" "}
          <button onClick={() => router.push("/login")} className="text-[#006442] hover:underline">
            Login
          </button>
        </span>
      </div>
    </div>
  );
} 