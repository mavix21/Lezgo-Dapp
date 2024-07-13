'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';

export function Navbar() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? (
    <div className="flex items-center space-x-6 text-white">
      <a href="#" className="hover:underline uppercase">
        About us
      </a>
      <a href="#" className="hover:underline uppercase">
        Tickets
      </a>
      <a href="#" className="hover:underline uppercase">
        Solution
      </a>
    </div>
  ) : (
    <Drawer direction="right">
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <div className="flex flex-col items-start space-y-6 text-white">
          <a href="#" className="hover:underline uppercase">
            About us
          </a>
          <a href="#" className="hover:underline uppercase">
            Tickets
          </a>
          <a href="#" className="hover:underline uppercase">
            Solution
          </a>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
