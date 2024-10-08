import styles from './wallet-item.module.css';
import { WalletItemProps } from './wallet-item.interface';

function WalletItem({ Icon, name }: WalletItemProps) {
  return (
    <span className={styles.wallet}>
      <Icon className={styles.icon} />
      {name}
    </span>
  );
}

export { WalletItem };
