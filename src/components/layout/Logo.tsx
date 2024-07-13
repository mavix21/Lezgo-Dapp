import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import lezgoLogo from '/public/images/brand.png';

export function Logo({ className, ...props }: { className?: string }) {
  return (
    <Image
      src={lezgoLogo}
      alt="Lezgo logo"
      className={cn('filter-white', className)}
      height={45}
    />
  );
}
