import clsx from 'clsx';
import { AlertProps } from './alert.types';
import styles from './alert.module.css';
import { Button } from '@/app/_components/ui/button';
import { Cross } from 'lucide-react';

export function Alert({ alert, close }: AlertProps) {
  const { content, options } = alert;
  const { type, title, style, isClosed } = options;

  return (
    <div className={styles.alert} style={style}>
      <div className={clsx(styles.header, styles[type])}>{title || type}</div>
      <div className={styles.body}>{content}</div>
      {isClosed && (
        <Button variant="ghost" className={styles.button} onClick={close}>
          <Cross />
        </Button>
      )}
    </div>
  );
}

export { styles as alertStyles };
