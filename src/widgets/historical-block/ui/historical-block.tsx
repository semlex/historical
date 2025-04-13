import { useState, useRef } from 'react';
import { intervals, IntervalTitle } from 'entities/interval';
import { events, KeyEventsSlider } from 'entities/key-event';
import { BlockTitle } from 'shared/ui';
import { CircleTabs, IntervalNav } from 'features/select-interval';
import { useCenter } from '../libs/hooks/use-center';
import { useFadeIn, useFadeOut } from 'shared/libs';

import styles from './historical-block.module.scss';

const HistoricalBlock = () => {
  const [selectedIntervalIndex, setSelectedIntervalIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const keyEventsSliderWrapperRef = useRef<HTMLDivElement>(null);

  const center = useCenter(containerRef, circleRef);

  const filteredEvents = events.filter(
    (event) => event.intervalId === intervals[selectedIntervalIndex].id,
  );

  useFadeOut(keyEventsSliderWrapperRef, filteredEvents);
  useFadeIn(keyEventsSliderWrapperRef, filteredEvents);

  const handleIntervalSelect = (index: number) => {
    setSelectedIntervalIndex(index);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.centerLineVertical}
        style={{ left: `${center.x}px` }}
      />
      <div
        className={styles.centerLineHorizontal}
        style={{ top: `${center.y}px` }}
      />
      <div className={styles.blockTop}>
        <div className={styles.blockTitleWrapper}>
          <BlockTitle>
            Исторические <br /> даты
          </BlockTitle>
        </div>
        <CircleTabs
          intervals={intervals}
          selectedInterval={intervals[selectedIntervalIndex]}
          onSelect={handleIntervalSelect}
          circleRef={circleRef}
        />
      </div>
      <div className={styles.intervalNavWrapper}>
        <IntervalNav
          activeIndex={selectedIntervalIndex}
          length={intervals.length}
          onSelect={handleIntervalSelect}
        />
      </div>
      <div
        ref={keyEventsSliderWrapperRef}
        className={styles.keyEventsSliderWrapper}
      >
        <div className={styles.mobileIntervalTitle}>
          <IntervalTitle>
            {intervals[selectedIntervalIndex].title}
          </IntervalTitle>
        </div>
        <KeyEventsSlider events={filteredEvents} />
      </div>
    </div>
  );
};

export default HistoricalBlock;
