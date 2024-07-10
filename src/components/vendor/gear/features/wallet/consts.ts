import enkryptIcon from '@/components/ui/vendor/features/wallet/assets/enkrypt.svg';
import polkadotIcon from '@/components/ui/vendor/features/wallet/assets/polkadot.svg';
import subwalletIcon from '@/components/ui/vendor/features/wallet/assets/subwallet.svg';
import talismanIcon from '@/components/ui/vendor/features/wallet/assets/talisman.svg';
import novaIcon from '@/components/ui/vendor/features/wallet/assets/nova.svg';
import { Wallets } from './types';

// @ts-ignore
const isNovaWallet = !!window?.walletExtension?.isNovaWallet;

const WALLET = isNovaWallet
  ? {
      'polkadot-js': { name: 'Nova Wallet', SVG: novaIcon },
      'subwallet-js': { name: 'SubWallet', SVG: subwalletIcon },
    }
  : {
      'polkadot-js': { name: 'Polkadot JS', SVG: polkadotIcon },
      'subwallet-js': { name: 'SubWallet', SVG: subwalletIcon },
      talisman: { name: 'Talisman', SVG: talismanIcon },
      enkrypt: { name: 'Enkrypt', SVG: enkryptIcon },
    };

const WALLETS = Object.entries(WALLET) as Wallets;

export { WALLET, WALLETS, isNovaWallet };
