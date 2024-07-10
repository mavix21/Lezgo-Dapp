import { MenuOptionsClassNameProps } from '@/components/ui/vendor/gear/components/menu-options';
import { MobileMenuClassNameProps } from '@/components/ui/vendor/gear/components/mobile-menu';
import React from 'react';

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

export function MenuHandler() {
  return <></>;
}
