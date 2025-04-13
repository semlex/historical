import { KeyEvent as KeyEventType } from '../../model/types';

import styles from './key-event.module.scss';

type KeyEventProps = {
  event: KeyEventType;
};

const KeyEvent = ({ event }: KeyEventProps) => {
  return (
    <div className={styles.event}>
      <h2 className={styles.title}>{event.year}</h2>
      <p className={styles.text}>{event.text}</p>
    </div>
  );
};

export default KeyEvent;
