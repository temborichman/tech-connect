import { useState } from 'react';
import { FaHeart, FaComment, FaPaperPlane, FaEllipsisH } from 'react-icons/fa';
import Image from 'next/image';

interface PostProps {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export default function Post({
  id,
  author,
  content,
  image,
  likes,
  comments,
  timestamp,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-black">{author.name}</h3>
            <p className="text-sm text-black">{timestamp}</p>
          </div>
        </div>
        <button className="text-black hover:text-gray-700">
          <FaEllipsisH />
        </button>
      </div>

      {/* Post Content */}
      <p className="text-black mb-4">{content}</p>

      {/* Post Image */}
      {image && (
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-black'
            }`}
          >
            <FaHeart className={isLiked ? 'fill-current' : ''} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center space-x-1 text-black">
            <FaComment />
            <span>{comments}</span>
          </button>
        </div>
        <button className="text-black">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
} 