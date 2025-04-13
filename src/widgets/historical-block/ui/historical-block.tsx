import { useState, useRef } from 'react';
import { intervals } from 'entities/interval';
import { events, KeyEventsSlider } from 'entities/key-event';
import { BlockTitle } from 'shared/ui';
import { CircleTabs, IntervalNav } from 'features/select-interval';
import { useCenter } from '../libs/hooks/use-center';

import styles from './historical-block.module.scss';

const HistoricalBlock = () => {
  const [selectedIntervalIndex, setSelectedIntervalIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const center = useCenter(containerRef, circleRef);

  const filteredEvents = events.filter(
    (event) => event.intervalId === intervals[selectedIntervalIndex].id,
  );

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
      <div className={styles.blockBottom}>
        <div className={styles.intervalNavWrapper}>
          <IntervalNav
            activeIndex={selectedIntervalIndex}
            length={intervals.length}
            onSelect={handleIntervalSelect}
          />
        </div>
        <KeyEventsSlider events={filteredEvents} />
      </div>
    </div>
  );
};

export default HistoricalBlock;
