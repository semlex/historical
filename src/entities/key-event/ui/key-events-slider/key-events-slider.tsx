import { useEffect, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import KeyEvent from '../key-event/key-event';
import { KeyEvent as KeyEventType } from '../../model/types';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './key-events-slider.module.scss';

type KeyEventsSliderProps = {
  events: KeyEventType[];
};

const KeyEventsSlider = ({ events }: KeyEventsSliderProps) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0, 0);
    }
  }, [events]);

  return (
    <div className={styles.sliderWrapper}>
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
        freeMode={true}
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
        {events.map((evt) => (
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
