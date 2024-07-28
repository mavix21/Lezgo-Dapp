import EncryptSVG from '@/app/_vendor/gear/ui/features/wallet/assets/enkrypt.svg';
import PolkadotSVG from '@/app/_vendor/gear/ui/features/wallet/assets/polkadot.svg';
import SubwalletSVG from '@/app/_vendor/gear/ui/features/wallet/assets/subwallet.svg';
import TalismanSVG from '@/app/_vendor/gear/ui/features/wallet/assets/talisman.svg';
import NovaSVG from '@/app/_vendor/gear/ui/features/wallet/assets/nova.svg';
import { Wallets } from './types';

const isNovaWallet =
  typeof window !== 'undefined' &&
  !!(window as any)?.walletExtension?.isNovaWallet;

const WALLET = isNovaWallet
  ? {
      'polkadot-js': { name: 'Nova Wallet', SVG: NovaSVG },
      'subwallet-js': { name: 'SubWallet', SVG: SubwalletSVG },
    }
  : {
      'polkadot-js': { name: 'Polkadot JS', SVG: PolkadotSVG },
      'subwallet-js': { name: 'SubWallet', SVG: SubwalletSVG },
      talisman: { name: 'Talisman', SVG: TalismanSVG },
      enkrypt: { name: 'Enkrypt', SVG: EncryptSVG },
    };

const WALLETS = Object.entries(WALLET) as Wallets;

export { WALLET, WALLETS };
