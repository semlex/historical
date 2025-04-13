import { useState, RefObject } from 'react';
import { Interval, IntervalBoundaries } from 'entities/interval';
import styles from './select-interval.module.scss';

type SelectIntervalProps = {
  selectedInterval: Interval;
  intervals: Interval[];
  onSelect: (interval: Interval) => void;
  circleRef?: RefObject<HTMLDivElement | null>;
};

const SelectInterval = ({
  selectedInterval,
  intervals,
  onSelect,
  circleRef,
}: SelectIntervalProps) => {
  const [activeIndex, setActiveIndex] = useState(
    intervals.findIndex((interval) => interval.id === selectedInterval.id),
  );
  const [rotation, setRotation] = useState(0);

  const radius = 265;
  const anglePerTab = 360 / intervals.length;
  const activeAngle = -60;

  const handleClick = (newIndex: number) => {
    let delta = newIndex - activeIndex;

    if (delta > intervals.length / 2) delta -= intervals.length;
    if (delta < -intervals.length / 2) delta += intervals.length;

    const newRotation = rotation - delta * anglePerTab;

    onSelect(intervals[newIndex]);
    setActiveIndex(newIndex);
    setRotation(newRotation);
  };

  const handlePrev = () => {
    handleClick(activeIndex > 0 ? activeIndex - 1 : intervals.length - 1);
  };

  const handleNext = () => {
    handleClick((activeIndex + 1) % intervals.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.circleTabs}>
        <div
          className={styles.circle}
          style={{ transform: `rotate(${rotation + activeAngle}deg)` }}
          ref={circleRef}
        >
          {intervals.map((tab, index) => {
            const angle = index * anglePerTab;
            return (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => handleClick(index)}
                style={{
                  transform: `rotate(${angle}deg) translate(${radius}px)`,
                }}
              >
                <div className={styles.dot}>
                  <span
                    className={styles.tabNumber}
                    style={{
                      transform: `rotate(${-rotation - activeAngle - angle}deg)`,
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
                <div
                  className={styles.tabTitle}
                  style={{
                    transform: `rotate(${-rotation - activeAngle - angle}deg) translate(46px, -50%)`,
                  }}
                >
                  {tab.title}
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.centerContent}>
          <IntervalBoundaries
            startYear={intervals[activeIndex].startYear}
            endYear={intervals[activeIndex].endYear}
          />
        </div>
      </div>

      <div className={styles.circleNav}>
        <span className={styles.circleCounter}>
          {String(activeIndex + 1).padStart(2, '0')}/
          {String(intervals.length).padStart(2, '0')}
        </span>
        <div className={styles.buttons}>
          <button
            className={`${styles.circleButton}`}
            disabled={activeIndex === 0}
            onClick={handlePrev}
          >
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
          </button>
          <button
            className={`${styles.circleButton}`}
            disabled={activeIndex === intervals.length - 1}
            onClick={handleNext}
          >
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectInterval;
