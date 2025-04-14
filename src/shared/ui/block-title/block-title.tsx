import { ReactNode } from 'react';
import styles from './block-title.module.scss';

type BlockTitleProps = {
  children: ReactNode;
};

const BlockTitle = ({ children }: BlockTitleProps) => {
  return <h1 className={styles.blockTitle}>{children}</h1>;
};

export default BlockTitle;
