import { ReactNode } from 'react';

import styles from './interval-title.module.scss';

type IntervalTitleProps = {
  children: ReactNode;
};

const IntervalTitle = ({ children }: IntervalTitleProps) => {
  return <span className={styles.intervalTitle}>{children}</span>;
};

export default IntervalTitle;
