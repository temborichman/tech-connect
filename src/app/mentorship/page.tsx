'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorshipPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/mentorship/browse');
  }, [router]);

  return null;
} 