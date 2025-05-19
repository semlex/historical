import { CSSProperties } from 'react';

import styles from './line-vertical.module.scss';

type LineVerticalProps = {
  className?: string;
  style?: CSSProperties;
};

const LineVertical = ({ className, style }: LineVerticalProps) => {
  return (
    <div className={`${styles.lineVertical} ${className}`} style={style} />
  );
};

export default LineVertical;
