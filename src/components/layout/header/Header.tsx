import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="w-full fixed backdrop-blur-md top-0 left-0 z-10 border-b border-gray-800">
      <div className="grid grid-cols-[1fr,1fr,auto] p-4">
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
        <Image
          src="/images/brand.png"
          className="brand-logo | filter-white"
          width={96}
          height={45}
          alt="Picture of the author"
          priority
        />
        <Button variant="default">Login</Button>
      </div>
    </header>
  );
}
