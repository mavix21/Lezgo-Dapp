'use client';

import { useMediaQuery } from '@/app/_hooks/use-media-query';
import { MobileNavbar } from '@/app/_components/layout/MobileNavbar';
import { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { Navbar } from '@/app/_components/layout/Navbar';

export function NavbarHandler() {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setIsClient(true);
  }, []);

  return !isClient ? (
    <>
      <Navbar className="hidden md:flex" />
      <MenuIcon className="md:hidden" />
    </>
  ) : isDesktop ? (
    <Navbar />
  ) : (
    <MobileNavbar />
  );
}
