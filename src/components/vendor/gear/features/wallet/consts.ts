import EncryptSVG from './assets/enkrypt.svg';
import PolkadotSVG from './assets/polkadot.svg';
import SubwalletSVG from './assets/subwallet.svg';
import TalismanSVG from './assets/talisman.svg';
import NovaSVG from './assets/nova.svg';
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
