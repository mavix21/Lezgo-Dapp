'use client';

import { motion } from 'framer-motion';
import { MenuOptions, MenuOptionsClassNameProps } from '../menu-options';
import { MobileMenu, MobileMenuClassNameProps } from '../mobile-menu';
import BurgerMenuSVG from './assets/burger-menu.svg';
import CrossSVG from '@/app/_vendor/gear/ui/assets/cross-icon.svg';
import {
  Wallet,
  WalletClassNameProps,
} from '../../features/wallet/components/wallet';
import React, { useRef, useState } from 'react';
import { useAccount } from '@gear-js/react-hooks';
import { useClickOutside, useRootModalRef } from '@/app/_vendor/gear/ui/utils';
import { clsx } from 'clsx';
import styles from './menu-handler.module.css';
import { Button } from '@gear-js/vara-ui';
import dynamic from 'next/dynamic';
import { withProviders } from '../../../../../_hocs';

// const MenuOptions = dynamic(
//   () => import('../menu-options').then((mod) => mod.MenuOptions),
//   { ssr: false },
// );
//
// const MobileMenu = dynamic(
//   () => import('../mobile-menu').then((mod) => mod.MobileMenu),
//   { ssr: false },
// );
//
// const Wallet = dynamic(
//   () =>
//     import('../../features/wallet/components/wallet').then((mod) => mod.Wallet),
//   { ssr: false },
// );

type Props = {
  customItems?: {
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    option: JSX.Element;
    key: string;
  }[];
  className?: {
    container?: string;
    dropdown?: string;
    mobileMenuWrapper?: string;
    icon?: string;
    menuOptions?: MenuOptionsClassNameProps;
    mobileMenu?: MobileMenuClassNameProps;
    wallet?: WalletClassNameProps;
  };
};

function Component({ customItems, className }: Props) {
  // function Component({ customItems, className }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { account } = useAccount();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  /**
   * Why we need modal root here:
   * useClickOutside closes the menu when clicked "outside the menu".
   * The modal is mounted in a portal, so it's "outside the menu", causing the menu to close when modal clicked.
   * After the menu is closed, the modal disappears as well because the <EzSignlessTransactions /> component,
   * which encapsulates the portal modal component, is unmounted from the menu.
   */
  const modalRootRef = useRootModalRef();

  useClickOutside(
    () => {
      closeMenu();
    },
    menuRef,
    modalRootRef,
  );

  return (
    <div className={clsx(styles.container, className?.container)} ref={menuRef}>
      <div>
        <Wallet
          isWalletModalOpen={isWalletModalOpen}
          walletModalHandler={setIsWalletModalOpen}
          className={className?.wallet}
        />
      </div>

      {account && (
        <>
          <div className={styles.contextMenuWrapper}>
            <Button
              color="transparent"
              icon={
                isMenuOpen
                  ? () => <CrossSVG className={styles.burger} />
                  : () => <BurgerMenuSVG className={styles.burger} />
              }
              className={clsx(className?.icon)}
              onClick={isMenuOpen ? closeMenu : openMenu}
            />
            {isMenuOpen && (
              <motion.div
                className={clsx(styles.dropdownContainer, className?.dropdown)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className={styles.dropdownHeader}>
                  <Button
                    color="transparent"
                    icon={CrossSVG}
                    className={styles.closeIcon}
                    onClick={closeMenu}
                  />
                </div>
                <MenuOptions
                  className={className?.menuOptions}
                  customItems={customItems}
                  onClose={closeMenu}
                />
              </motion.div>
            )}
          </div>
          {isMenuOpen && (
            <div
              className={clsx(
                styles.mobileWrapper,
                className?.mobileMenuWrapper,
              )}
            >
              <MobileMenu
                className={className?.mobileMenu}
                onClose={closeMenu}
                walletModalHandler={setIsWalletModalOpen}
              >
                <MenuOptions
                  customItems={customItems}
                  className={className?.menuOptions}
                  onClose={closeMenu}
                />
              </MobileMenu>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// const withProvidersClientSide = (WrappedComponent: any) => (props: any) => {
//   if (typeof window === 'undefined') return <WrappedComponent {...props} />;
//
//   const WrappedWithProviders = withProviders(WrappedComponent);
//   return <WrappedWithProviders {...props} />;
// };
//
const MenuHandler = withProviders(Component);

export default MenuHandler;
