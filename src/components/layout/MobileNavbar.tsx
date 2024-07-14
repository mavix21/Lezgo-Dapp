import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { NavItems } from '@/components/layout/NavItems';

export function MobileNavbar() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <nav className="flex flex-col p-6 gap-4">
          <NavItems />
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
