import { Sidebar } from '@/components/layout/promoter/Sidebar';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
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
  return (
    <div className="bg-slate-100 antialiased text-slate-900">
      <div className="flex">
        <Sidebar />

        <div className="h-screen w-full overflow-y-scroll bg-white text-slate-900">
          {/* {children} */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">

            </div>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
