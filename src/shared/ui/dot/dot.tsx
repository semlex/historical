import { MouseEventHandler } from 'react';

import styles from './dot.module.scss';

type DotProps = {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLSpanElement>;
};

const Dot = ({ isActive, onClick }: DotProps) => {
  return (
    <span
      className={`${styles.dot} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    />
  );
};

export default Dot;
