import { useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaComment, FaPaperPlane } from 'react-icons/fa';

interface PostProps {
  profileImage: string;
  username: string;
  role: string;
  timeAgo: string;
  content: string;
  postImage: string;
  likes: number;
  comments: number;
  shares: number;
  viewers: string[];
}

export default function Post({
  profileImage,
  username,
  role,
  timeAgo,
  content,
  postImage,
  likes,
  comments,
  shares,
  viewers
}: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleDoubleClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <>
      <div className="mt-6 text-black">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Image
              src={profileImage}
              alt="Profile picture"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-lg">{username}</p>
              <p className="text-sm text-gray-600">{role}</p>
              <p className="text-sm text-gray-500">{timeAgo}</p>
            </div>
          </div>
          <button className="text-gray-600">
            <span className="text-2xl">...</span>
          </button>
        </div>
        
        <p className="text-sm mb-4">{content}</p>
        
        <div 
          className="rounded-lg overflow-hidden relative cursor-pointer"
          onClick={() => setShowModal(true)}
          onDoubleClick={handleDoubleClick}
        >
          <div className="absolute top-4 left-4 flex -space-x-3 z-10">
            {viewers.map((viewer, index) => (
              <Image
                key={index}
                src={viewer}
                alt="Viewer"
                width={28}
                height={28}
                className="rounded-full border-2 border-white"
              />
            ))}
          </div>
          <Image
            src={postImage}
            alt="Post content"
            width={500}
            height={300}
            className="w-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between mt-4 text-gray-600">
          <div className="flex items-center space-x-2">
            <button onClick={handleLikeClick}>
              <FaHeart className={`w-5 h-5 ${isLiked ? 'text-red-500' : ''}`} />
            </button>
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaComment className="w-5 h-5" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPaperPlane className="w-5 h-5" />
            <span>{shares}</span>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="max-w-4xl w-full p-4">
            <Image
              src={postImage}
              alt="Post content"
              width={1200}
              height={800}
              className="w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
} 