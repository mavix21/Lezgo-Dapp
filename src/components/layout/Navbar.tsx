import { NavItems } from '@/components/layout/NavItems';
import { cn } from '@/lib/utils';

export function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cn('flex items-center gap-4', className)}>
      <NavItems />
    </nav>
  );
}
