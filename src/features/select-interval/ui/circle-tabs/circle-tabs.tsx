import { useState, useEffect, RefObject } from 'react';
import { Interval, IntervalBoundaries, IntervalTitle } from 'entities/interval';
import gsap from 'gsap';

import styles from './circle-tabs.module.scss';

type CircleTabsProps = {
  intervals: Interval[];
  selectedInterval: Interval;
  onSelect: (interval: number) => void;
  circleRef?: RefObject<HTMLDivElement | null>;
  onRotateStart?: () => void;
  onRotateEnd?: () => void;
};

const CircleTabs = ({
  intervals,
  selectedInterval,
  onSelect,
  circleRef,
  onRotateStart,
  onRotateEnd,
}: CircleTabsProps) => {
  const anglePerTab = 360 / intervals.length;
  const activeAngle = -60;
  const radius = 265;

  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(
    intervals.findIndex((i) => i.id === selectedInterval.id),
  );

  const rotateTo = (newIndex: number) => {
    onRotateStart && onRotateStart();

    let delta = newIndex - activeIndex;
    if (delta > intervals.length / 2) delta -= intervals.length;
    if (delta < -intervals.length / 2) delta += intervals.length;

    setRotation((prev) => prev - delta * anglePerTab);
    setActiveIndex(newIndex);
    onSelect(newIndex);
  };

  useEffect(() => {
    if (circleRef?.current) {
      gsap.to(circleRef.current, {
        rotation: rotation + activeAngle,
        duration: 0.7,
        ease: 'power1.inOut',
        onStart: () => {
          setIsRotating(true);
        },
        onComplete: () => {
          setIsRotating(false);
          onRotateEnd && onRotateEnd();
        },
      });
    }
  }, [rotation]);

  useEffect(() => {
    const newIndex = intervals.findIndex((i) => i.id === selectedInterval.id);

    if (newIndex !== activeIndex) {
      rotateTo(newIndex);
    }
  }, [selectedInterval]);

  return (
    <div className={styles.circleTabs}>
      <div
        className={styles.circle}
        // style={{ transform: `rotate(${rotation + activeAngle}deg)` }}
        ref={circleRef}
      >
        {intervals.map((tab, index) => {
          const angle = index * anglePerTab;
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => rotateTo(index)}
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
                className={`${styles.tabTitle} ${activeIndex === index && !isRotating ? styles.active : ''}`}
                style={{
                  transform: `rotate(${-rotation - activeAngle - angle}deg) translate(46px, -50%)`,
                }}
              >
                <IntervalTitle>{tab.title}</IntervalTitle>
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
  );
};

export default CircleTabs;
