'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
// import { MenuHandler } from '@/components/vendor/gear/components/menu-handler/menu-handler';
import styles from './header.module.css';
import dynamic from 'next/dynamic';

const MenuHandler = dynamic(
  () =>
    import('../../../vendor/gear/ui/components/menu-handler').then(
      (mod) => mod.MenuHandler,
    ),
  { ssr: false, loading: () => <div>Loading...</div> },
);

export function Header() {
  return (
    <header className="header w-full fixed backdrop-blur-md top-0 left-0 z-10 border-b border-gray-800">
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
        {/*<Button variant="default">Login</Button>*/}
        <MenuHandler
          className={{
            wallet: {
              balance: styles.walletBalance,
            },
            icon: styles.menuIcon,
          }}
        />

        {/*  customItems={[*/}
        {/*  {*/}
        {/*    key: 'signless',*/}
        {/*    option: (*/}
        {/*      <EzSignlessTransactions*/}
        {/*        allowedActions={SIGNLESS_ALLOWED_ACTIONS}*/}
        {/*      />*/}
        {/*    ),*/}
        {/*  },*/}
        {/*  { key: 'gasless', option: <EzGaslessTransactions /> },*/}
        {/*]}*/}
      </div>
    </header>
  );
}
