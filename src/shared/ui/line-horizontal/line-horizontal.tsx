import { CSSProperties } from 'react';

import styles from './line-horizontal.module.scss';

type LineHorizontalProps = {
  className?: string;
  style?: CSSProperties;
};

const LineHorizontal = ({ className, style }: LineHorizontalProps) => {
  return (
    <div className={`${styles.lineHorizontal} ${className}`} style={style} />
  );
};

export default LineHorizontal;
