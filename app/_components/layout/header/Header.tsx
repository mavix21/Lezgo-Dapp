import dynamic from 'next/dynamic';
import { NavbarHandler } from '@/app/_components/layout/NavbarHandler';
import { Logo } from '@/app/_components/layout/Logo';
import { Skeleton } from '@/app/_components/ui/skeleton';
import { auth } from '@/auth';
import { SignOutButton } from '@/app/_components/auth/SignOutButton';
import Link from 'next/link';
import { buttonVariants } from '@/app/_components/ui/button';

// const MenuHandler = dynamic(
//   () => import('@/app/_vendor/gear/ui/components/menu-handler/menu-handler'),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="h-10 w-[135px] rounded-md" />,
//   },
// );

export async function Header() {
  const session = await auth();

  return (
    <header className="header w-full fixed backdrop-blur-md top-0 left-0 z-10 border-b border-gray-800">
      <div className="grid items-center grid-cols-[1fr,1fr,auto] p-4">
        <NavbarHandler />
        <Logo />
        <div>
          {/*<MenuHandler />*/}
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: 'default' })}
            >
              Click here
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
