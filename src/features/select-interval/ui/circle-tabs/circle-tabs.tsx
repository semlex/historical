import { useState, useEffect, RefObject } from 'react';
import { Interval, IntervalBoundaries, IntervalTitle } from 'entities/interval';
import gsap from 'gsap';

import styles from './circle-tabs.module.scss';

const ACTIVE_ANGLE = -60;
const RADIUS = 265;

type CircleTabsProps = {
  intervals: Interval[];
  selectedIntervalIndex: number;
  onSelect: (interval: number) => void;
  circleRef?: RefObject<HTMLDivElement | null>;
  onRotateStart?: () => void;
  onRotateEnd?: () => void;
};

const CircleTabs = ({
  intervals,
  selectedIntervalIndex,
  onSelect,
  circleRef,
  onRotateStart,
  onRotateEnd,
}: CircleTabsProps) => {
  const anglePerTab = 360 / intervals.length;

  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(selectedIntervalIndex);

  const rotateTo = (newIndex: number) => {
    if (!circleRef?.current) return;

    onRotateStart && onRotateStart();

    let delta = newIndex - activeIndex;
    if (delta > intervals.length / 2) delta -= intervals.length;
    if (delta < -intervals.length / 2) delta += intervals.length;

    setRotation((prev) => {
      const newRotation = prev - delta * anglePerTab;

      gsap.to(circleRef.current, {
        rotation: newRotation + ACTIVE_ANGLE,
        duration: 0.7,
        ease: 'power1.inOut',
        onStart: () => setIsRotating(true),
        onComplete: () => {
          setIsRotating(false);
          onRotateEnd && onRotateEnd();
        },
      });

      return newRotation;
    });

    setActiveIndex(newIndex);
    onSelect(newIndex);
  };

  useEffect(() => {
    if (circleRef?.current) {
      const initialRotation = -activeIndex * anglePerTab;

      gsap.set(circleRef.current, {
        rotation: initialRotation + ACTIVE_ANGLE,
      });

      setRotation(initialRotation);
    }
  }, [circleRef]);

  useEffect(() => {
    if (selectedIntervalIndex !== activeIndex) {
      rotateTo(selectedIntervalIndex);
    }
  }, [selectedIntervalIndex]);

  return (
    <div className={styles.circleTabs}>
      <div className={styles.circle} ref={circleRef}>
        {intervals.map((tab, index) => {
          const angle = index * anglePerTab;
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => rotateTo(index)}
              style={{
                transform: `rotate(${angle}deg) translate(${RADIUS}px)`,
              }}
            >
              <div className={styles.dot}>
                <span
                  className={styles.tabNumber}
                  style={{
                    transform: `rotate(${-rotation - ACTIVE_ANGLE - angle}deg)`,
                  }}
                >
                  {index + 1}
                </span>
              </div>
              <div
                className={`${styles.tabTitle} ${activeIndex === index && !isRotating ? styles.active : ''}`}
                style={{
                  transform: `rotate(${-rotation - ACTIVE_ANGLE - angle}deg) translate(46px, -50%)`,
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
