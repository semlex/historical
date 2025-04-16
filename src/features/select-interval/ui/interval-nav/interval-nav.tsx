import { Dot } from 'shared/ui';

import styles from './interval-nav.module.scss';

type IntervalNavProps = {
  activeIndex: number;
  length: number;
  onSelect: (interval: number) => void;
};

const IntervalNav = ({ activeIndex, length, onSelect }: IntervalNavProps) => {
  const onPrev = () => {
    const prevIndex = (activeIndex - 1 + length) % length;
    onSelect(prevIndex);
  };

  const onNext = () => {
    const nextIndex = (activeIndex + 1) % length;
    onSelect(nextIndex);
  };

  return (
    <div className={styles.intervalNav}>
      <div className={styles.block}>
        <span className={styles.intervalCounter}>
          {String(activeIndex + 1).padStart(2, '0')}/
          {String(length).padStart(2, '0')}
        </span>
        <div className={styles.buttons}>
          <button
            onClick={onPrev}
            disabled={activeIndex === 0}
            className={styles.circleButton}
          >
            <span className={styles.iconDesktop}>
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.49988 0.75L2.24988 7L8.49988 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <span className={styles.iconMobile}>
              <svg
                width="6"
                height="8"
                viewBox="0 0 6 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.7489 1.04178L1.6239 4.16678L4.7489 7.29178"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </button>
          <button
            onClick={onNext}
            disabled={activeIndex === length - 1}
            className={styles.circleButton}
          >
            <span className={styles.iconDesktop}>
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.50012 0.75L7.75012 7L1.50012 13.25"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <span className={styles.iconMobile}>
              <svg
                width="6"
                height="8"
                viewBox="0 0 6 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.2511 1.04178L4.3761 4.16678L1.2511 7.29178"
                  stroke="#42567A"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className={styles.dots}>
        {Array.from({ length }).map((_, i) => (
          <Dot
            key={i}
            isActive={i === activeIndex}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default IntervalNav;
