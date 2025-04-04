'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaBell, FaChevronDown } from 'react-icons/fa';

export default function MentorshipPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/mentorship/browse');
  }, [router]);

  return null;
} 