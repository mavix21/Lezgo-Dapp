import { Sidebar } from '@/app/_components/layout/promoter/Sidebar';
import { Search, User } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Promoter dashboard',
  description: 'Create and manage your events',
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
