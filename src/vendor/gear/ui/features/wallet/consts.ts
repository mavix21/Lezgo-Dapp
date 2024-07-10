import EncryptSVG from '@/vendor/gear/ui/features/wallet/assets/enkrypt.svg';
import PolkadotSVG from '@/vendor/gear/ui/features/wallet/assets/polkadot.svg';
import SubwalletSVG from '@/vendor/gear/ui/features/wallet/assets/subwallet.svg';
import TalismanSVG from '@/vendor/gear/ui/features/wallet/assets/talisman.svg';
import NovaSVG from '@/vendor/gear/ui/features/wallet/assets/nova.svg';
import { Wallets } from './types';

// const isNovaWallet = !!window?.walletExtension?.isNovaWallet;

// const WALLET = isNovaWallet
//   ? {
//       'polkadot-js': { name: 'Nova Wallet', SVG: NovaSVG },
//       'subwallet-js': { name: 'SubWallet', SVG: SubwalletSVG },
//     }
//   : {
//       'polkadot-js': { name: 'Polkadot JS', SVG: PolkadotSVG },
//       'subwallet-js': { name: 'SubWallet', SVG: SubwalletSVG },
//       talisman: { name: 'Talisman', SVG: TalismanSVG },
//       enkrypt: { name: 'Enkrypt', SVG: EncryptSVG },
//     };
//

const WALLET = {
  'polkadot-js': { name: 'Polkadot JS', SVG: PolkadotSVG },
  'subwallet-js': { name: 'SubWallet', SVG: SubwalletSVG },
  talisman: { name: 'Talisman', SVG: TalismanSVG },
  enkrypt: { name: 'Enkrypt', SVG: EncryptSVG },
};

const WALLETS = Object.entries(WALLET) as Wallets;

export { WALLET, WALLETS };
