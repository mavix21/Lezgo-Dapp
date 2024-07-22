import dynamic from 'next/dynamic';
import { NavbarHandler } from '@/components/layout/NavbarHandler';
import { Logo } from '@/components/layout/Logo';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { SignOutButton } from '@/components/auth/SignOutButton';

const MenuHandler = dynamic(
  () => import('@/vendor/gear/ui/components/menu-handler/menu-handler'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-[135px] rounded-md" />,
  },
);

export async function Header() {
  const session = await auth();

  return (
    <header className="header w-full fixed backdrop-blur-md top-0 left-0 z-10 border-b border-gray-800">
      <div className="grid items-center grid-cols-[1fr,1fr,auto] p-4">
        <NavbarHandler />
        <Logo />
        <div className="min-w-[135px]">
          {/*<MenuHandler />*/}
          {session ? <SignOutButton /> : <p>Log In</p>}
        </div>
      </div>
    </header>
  );
}
