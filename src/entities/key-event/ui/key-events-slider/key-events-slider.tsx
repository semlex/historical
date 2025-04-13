import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useFadeOut } from '../../lib/hooks/use-fade-out';
import { useFadeIn } from '../../lib/hooks/use-fade-in';
import KeyEvent from '../key-event/key-event';
import { KeyEvent as KeyEventType } from '../../model/types';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './key-events-slider.module.scss';

type KeyEventsSliderProps = {
  events: KeyEventType[];
};

const KeyEventsSlider = ({ events }: KeyEventsSliderProps) => {
  const [localEvents, setLocalEvents] = useState<KeyEventType[]>(events);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  useFadeOut(wrapperRef, events, () => setLocalEvents(events));
  useFadeIn(wrapperRef, localEvents);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0, 0);
    }
  }, [events]);

  return (
    <div className={styles.sliderWrapper} ref={wrapperRef}>
      <div className="swiper-button-prev">
        <svg
          className={styles.chevronIcon}
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 1L2 6L7 11" stroke="#3877EE" strokeWidth="2" />
        </svg>
      </div>

      <Swiper
        ref={swiperRef}
        slideToClickedSlide
        modules={[Navigation]}
        slidesPerView="auto"
        grabCursor={true}
        spaceBetween={80}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          0: {
            spaceBetween: 25,
          },
          1010: {
            spaceBetween: 80,
          },
        }}
      >
        {localEvents.map((evt) => (
          <SwiperSlide key={evt.id}>
            <KeyEvent event={evt} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-next">
        <svg
          className={styles.chevronIcon}
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default KeyEventsSlider;
