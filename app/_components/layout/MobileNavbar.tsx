import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/app/_components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { NavItems } from '@/app/_components/layout/NavItems';

export function MobileNavbar() {
  return (
    <Drawer direction="left">
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
