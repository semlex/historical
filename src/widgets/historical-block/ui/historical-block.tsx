import { useState, useRef } from 'react';
import { Interval, intervals, IntervalTitle } from 'entities/interval';
import { events, KeyEventsSlider } from 'entities/key-event';
import { BlockTitle, LineHorizontal, LineVertical } from 'shared/ui';
import { CircleTabs, IntervalNav } from 'features/select-interval';
import { useCenter } from '../libs/hooks/use-center';
import { useFadeIn, useFadeOut } from 'shared/libs';

import styles from './historical-block.module.scss';

const HistoricalBlock = () => {
  const [selectedIntervalIndex, setSelectedIntervalIndex] = useState(0);
  const [selectedInterval, setSelectedInterval] = useState<Interval>(
    intervals[selectedIntervalIndex],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const keyEventsSliderWrapperRef = useRef<HTMLDivElement>(null);

  const center = useCenter(containerRef, circleRef);

  const keyEventsFadeOut = useFadeOut(keyEventsSliderWrapperRef);
  const keyEventsFadeIn = useFadeIn(keyEventsSliderWrapperRef);

  const handleIntervalSelect = (index: number) => {
    setSelectedIntervalIndex(index);
  };

  const handleRotateStart = () => {
    keyEventsFadeOut();
  };

  const handleRotateEnd = () => {
    setSelectedInterval(intervals[selectedIntervalIndex]);
    keyEventsFadeIn();
  };

  const filteredEvents = events.filter(
    (event) => event.intervalId === selectedInterval?.id,
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <LineVertical
        className={styles.centerLineVertical}
        style={{ left: `${center.x}px` }}
      />
      <LineHorizontal
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
          circleRef={circleRef}
          intervals={intervals}
          selectedIntervalIndex={selectedIntervalIndex}
          onSelect={handleIntervalSelect}
          onRotateStart={handleRotateStart}
          onRotateEnd={handleRotateEnd}
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
          <IntervalTitle>{selectedInterval?.title}</IntervalTitle>
        </div>
        <KeyEventsSlider events={filteredEvents} />
      </div>
    </div>
  );
};

export default HistoricalBlock;
