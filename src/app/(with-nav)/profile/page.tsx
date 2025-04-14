'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaBell, FaHome, FaUsers, FaPlus, FaComments, FaUser, FaChevronRight } from 'react-icons/fa';
import { MdNotifications, MdAnalytics, MdGroup, MdLogout } from 'react-icons/md';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/app/lib/firebase';

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          router.push('/login');
          return;
        }

        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth, db, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="px-5 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <Link href="/homescreen" className="flex items-center">
            <FaArrowLeft className="w-4 h-4 text-black" />
          </Link>
          <FaBell className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 relative rounded-full overflow-hidden">
            <Image
              src="/images/tech (2).jpg"
              alt={userData?.name || 'User'}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-black">{userData?.name || 'User'}</h1>
            <p className="text-gray-600">{userData?.email || 'No email provided'}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
                <path fill="currentColor" d="M20 20.0001C20 20.5524 19.5523 21.0001 19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V4.00012C4 3.44784 4.44772 3.00012 5 3.00012H19C19.5523 3.00012 20 3.44784 20 4.00012V20.0001ZM16 12.0001C16 10.9396 15.1046 10.0001 14 10.0001C12.8954 10.0001 12 10.9396 12 12.0001C12 13.0607 12.8954 14.0001 14 14.0001C15.1046 14.0001 16 13.0607 16 12.0001ZM14 8.00012C16.2091 8.00012 18 9.79098 18 12.0001C18 14.2093 16.2091 16.0001 14 16.0001C11.7909 16.0001 10 14.2093 10 12.0001C10 9.79098 11.7909 8.00012 14 8.00012Z"/>
              </svg>
            </div>
            <span className="text-gray-600">+263 123456789</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                <path fill="currentColor" d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"/>
              </svg>
            </div>
            <span className="text-gray-600">Bulawayo, Zimbabwe</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">150</p>
            <p className="text-sm text-gray-600">Connections</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">45</p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">Projects</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          <Link href="/profile/edit" className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <FaUser className="w-5 h-5 text-blue-600" />
              <span className="text-gray-800">Edit Profile</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
          <Link href="/profile/notifications" className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <MdNotifications className="w-5 h-5 text-blue-600" />
              <span className="text-gray-800">Notifications</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
          <Link href="/profile/analytics" className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <MdAnalytics className="w-5 h-5 text-blue-600" />
              <span className="text-gray-800">Analytics</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
          <Link href="/profile/groups" className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
              <MdGroup className="w-5 h-5 text-blue-600" />
              <span className="text-gray-800">Groups</span>
            </div>
            <FaChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg text-red-600"
          >
            <div className="flex items-center gap-3">
              <MdLogout className="w-5 h-5" />
              <span>Logout</span>
            </div>
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 