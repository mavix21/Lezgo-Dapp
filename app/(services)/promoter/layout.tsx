import { Sidebar } from '@/app/_components/layout/promoter/Sidebar';
import { Toaster } from '@/app/_components/ui/sonner';
import type { Metadata } from 'next';
import { SidebarMobile } from '@/app/(services)/promoter/dashboard/_components/SidebarMobile';
import { UserSettingsDropdown } from '@/app/(services)/promoter/dashboard/_components/UserSettingsDropdown';

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
      <div className="grid min-h-svh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b justify-between bg-muted/40 px-4 lg:px-6">
            <SidebarMobile />
            <UserSettingsDropdown />
          </header>
          <main className="h-[calc(100svh-3.5rem)] overflow-y-scroll bg-muted/60 p-4">
            {children}
          </main>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
