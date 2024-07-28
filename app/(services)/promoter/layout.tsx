import { Sidebar } from '@/app/_components/layout/promoter/Sidebar';
import { Button } from '@/app/_components/ui/button';
import { Toaster } from '@/app/_components/ui/sonner';
import { Search, User } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Promoter dashboard',
  description: 'Create and manage your events',
};

export default function PromoterLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased">
      <div className="flex h-screen">
        <Sidebar />

        <div className="h-full w-full overflow-y-scroll">
          {/* {children} */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 my-2.5">
            <div className="relative ml-auto flex-1 md:grow-0"></div>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full bg-background"
            >
              <User />
            </Button>
          </header>
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
