import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Logo } from '@/components/layout/Logo';
import { Skeleton } from '@/components/ui/skeleton';
// import { MenuHandler } from '@/vendor/gear/ui/components/menu-handler';

const MenuHandler = dynamic(
  () => import('@/vendor/gear/ui/components/menu-handler/menu-handler'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-[135px] rounded-md" />,
  },
);

export function Header() {
  return (
    <header className="header w-full fixed backdrop-blur-md top-0 left-0 z-10 border-b border-gray-800">
      <div className="grid grid-cols-[1fr,1fr,auto] p-4">
        <Navbar />
        <Logo />
        <MenuHandler />
      </div>
    </header>
  );
}
