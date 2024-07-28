import { NavItems } from '@/app/_components/layout/NavItems';
import { cn } from '@/app/_lib/utils';

export function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cn('flex items-center gap-4', className)}>
      <NavItems />
    </nav>
  );
}
