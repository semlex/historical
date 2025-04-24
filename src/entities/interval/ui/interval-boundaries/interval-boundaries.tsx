import { useEffect, useRef } from 'react';
import { useAnimateNumber } from 'shared/libs';

import styles from './interval-boundaries.module.scss';

type IntervalBoundariesProps = {
  startYear: number;
  endYear: number;
};

const IntervalBoundaries = ({
  startYear,
  endYear,
}: IntervalBoundariesProps) => {
  const startRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);

  useAnimateNumber(startYear, startRef);
  useAnimateNumber(endYear, endRef);

  useEffect(() => {
    if (startRef.current) {
      startRef.current.textContent = startYear.toString();
    }
    if (endRef.current) {
      endRef.current.textContent = endYear.toString();
    }
  }, [startRef, endRef]);

  return (
    <div className={styles.years}>
      <span className={styles.blue} ref={startRef} />
      <span className={styles.pink} ref={endRef} />
    </div>
  );
};

export default IntervalBoundaries;
