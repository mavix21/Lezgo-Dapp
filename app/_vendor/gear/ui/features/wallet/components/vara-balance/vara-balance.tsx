import clsx from 'clsx';
import {
  useAccount,
  useApi,
  useBalanceFormat,
  useDeriveBalancesAll,
} from '@gear-js/react-hooks';
import VaraSVG from '@/app/_vendor/gear/ui/features/wallet/assets/vara-coin.svg';
import TVaraSVG from '@/app/_vendor/gear/ui/features/wallet/assets/tvara-coin.svg';
import styles from './vara-balance.module.css';

type Props = {
  className?: string;
};

function VaraBalance({ className }: Props) {
  const { account } = useAccount();
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  const { getFormattedBalance } = useBalanceFormat();
  const balances = useDeriveBalancesAll(account?.decodedAddress);
  const balance =
    isApiReady && balances?.freeBalance
      ? getFormattedBalance(balances.freeBalance.toString())
      : undefined;

  return isAccountReady && balance ? (
    <div className={clsx(styles.balance, className)}>
      {balance.unit?.toLowerCase() === 'vara' ? <VaraSVG /> : <TVaraSVG />}

      <p className={styles.text}>
        <span className={styles.value}>{balance.value}</span>
        <span className={styles.unit}>{balance.unit}</span>
      </p>
    </div>
  ) : null;
}

export { VaraBalance };
