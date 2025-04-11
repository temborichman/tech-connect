"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBell, FaHeart, FaComment, FaPaperPlane, FaHome, FaUserPlus, FaEnvelope, FaUser, FaChevronRight, FaTimes, FaSearch, FaPlus } from 'react-icons/fa';
import Post from '../components/Post';
import BottomNav from '../components/BottomNav';

const navItems = [
  { icon: FaHome, label: 'Home', path: '/' },
  { icon: FaUserPlus, label: 'Community', path: '/community' },
  { icon: () => <Image src="/images/create.png" alt="Create" width={24} height={24} />, label: 'Create', path: '/create' },
  { icon: FaEnvelope, label: 'Messages', path: '/messages' },
  { icon: FaUser, label: 'Profile', path: '/profile' },
];

// Sample post data
const generatePosts = (start: number, end: number) => {
  const posts = [
    {
      id: 1,
      profileImage: '/images/mn.png',
      username: 'Henry Dave',
      role: 'Web Developer',
      timeAgo: '30 min ago',
      content: 'Had an exciting day presenting my new VR program at the Bulawayo International Fair.',
      postImage: '/images/px.png',
      likes: 892,
      comments: 45,
      shares: 12,
      viewers: ['/images/mn.png', '/images/r2.png', '/images/r3.png']
    },
    {
      id: 2,
      profileImage: '/images/r2.png',
      username: 'David Kumar',
      role: 'Full Stack Developer',
      timeAgo: '1 hour ago',
      content: 'Successfully deployed our new microservices architecture. Big milestone for the team! 🚀 #DevOps #Cloud',
      postImage: '/images/tech (4).jpg',
      likes: 1203,
      comments: 67,
      shares: 23,
      viewers: ['/images/r2.png', '/images/r3.png', '/images/mn.png']
    },
    {
      id: 3,
      profileImage: '/images/r3.png',
      username: 'Maria Rodriguez',
      role: 'AI Researcher',
      timeAgo: '2 hours ago',
      content: 'Presenting our latest research on neural networks at the AI Summit tomorrow. So excited to share our findings! 🤖 #AI #MachineLearning',
      postImage: '/images/tech (5).jpg',
      likes: 1567,
      comments: 89,
      shares: 34,
      viewers: ['/images/r3.png', '/images/mn.png', '/images/r2.png']
    },
    {
      id: 4,
      profileImage: '/images/mn.png',
      username: 'Alex Thompson',
      role: 'Product Manager',
      timeAgo: '3 hours ago',
      content: 'Just wrapped up our Q4 product roadmap presentation. Amazing ideas from the team! 📊 #ProductManagement',
      postImage: '/images/tech (3).jpg',
      likes: 734,
      comments: 41,
      shares: 8,
      viewers: ['/images/mn.png', '/images/r3.png', '/images/r2.png']
    },
    {
      id: 5,
      profileImage: '/images/r2.png',
      username: 'Lisa Wang',
      role: 'Cybersecurity Expert',
      timeAgo: '4 hours ago',
      content: 'Conducted a successful penetration testing workshop today. Always great to see people passionate about security! 🔒 #CyberSecurity',
      postImage: '/images/px.png',
      likes: 945,
      comments: 52,
      shares: 15,
      viewers: ['/images/r2.png', '/images/mn.png', '/images/r3.png']
    }
  ];

  return Array.from({ length: end - start }, (_, i) => ({
    ...posts[(start + i) % posts.length],
    id: start + i
  }));
};

export default function Home() {
  const path = usePathname();
  const [showMentorCard, setShowMentorCard] = useState(true);
  const [posts, setPosts] = useState(generatePosts(0, 5));
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading, posts]);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setPosts(prevPosts => [
        ...prevPosts,
        ...generatePosts(prevPosts.length, prevPosts.length + 5)
      ]);
      setLoading(false);
    }, 1500);
  };

  const recentUpdates = [
    { name: 'Add Story', image: '/images/mn.png' },
    { name: 'John Doe', image: '/images/r2.png' },
    { name: 'Jane Smith', image: '/images/r3.png' },
    { name: 'Mike Johnson', image: '/images/mn.png' },
    { name: 'Sarah Wilson', image: '/images/r2.png' },
    { name: 'Tom Brown', image: '/images/r3.png' },
  ];

  return (
    <div className="bg-white min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-blue-600">Tech Connect</h1>
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="cursor-pointer">
            <Image
              src="/images/mn.png"
              alt="User profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
          <FaBell className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Recent Updates */}
      <div className="mt-4 text-black">
        <h2 className="text-lg font-semibold mb-3">Recent Updates</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {recentUpdates.map((user, index) => (
            <div key={index} className="flex flex-col items-center min-w-[60px]">
              <div className="relative">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-blue-500"
                />
                {index === 0 && (
                  <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1">
                    <Image src="/images/create.png" alt="Add Story" width={12} height={12} className="text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-1 w-16 truncate">{user.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Match */}
      {showMentorCard && (
        <div className="mt-6 relative">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg text-black font-semibold">Mentor Match</h2>
            <button 
              onClick={() => setShowMentorCard(false)}
              className="text-black cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-blue-600 text-white p-6">
            <h3 className="text-l font-semibold mb-1">Tech Connect App</h3>
            <h4 className="text-lg font-semibold mb-3">Connect With A Mentor Today!</h4>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex -space-x-3 mb-2">
                  <Image
                    src="/images/mn.png"
                    alt="Mentor"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                  <Image
                    src="/images/r2.png"
                    alt="Mentor"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                  <Image
                    src="/images/r3.png"
                    alt="Mentor"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                </div>
                <p className="text-sm opacity-90">Over 5000+ Mentors</p>
              </div>
              <Link 
                href="/mentorship" 
                className="text-white font-medium flex items-center space-x-1 cursor-pointer"
                prefetch={true}
              >
                <span className="text-sm">Connect</span>
                <FaChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="mt-6 space-y-6">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
        <div ref={observerTarget} className="h-10 flex items-center justify-center">
          {loading && <div className="text-gray-500">Loading more posts...</div>}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
