import { FC, useRef, useState } from 'react';
import { DateItem } from './DateItem';
import { DateListProps } from '../../types';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import useIsMobile from '../../hooks/useIsMobile';

export const DateList: FC<DateListProps> = ({ week, selectedDate, onDate, onWeek }) => {
  const touchStartRef = useRef<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0].clientX;
    setSwipeDirection(null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = event.changedTouches[0].clientX;
    const swipeDistance = touchStartRef.current - touchEnd;

    if (swipeDistance > 50) {
      handleSwipe(1); // 오른쪽으로 스와이프
    } else if (swipeDistance < -50) {
      handleSwipe(-1); // 왼쪽으로 스와이프
    }
  };

  const handleSwipe = (weekChange: number) => {
    if (isMobile) {
      setSwipeDirection(weekChange === 1 ? 'right' : 'left'); // 모바일일 때만 스와이프 방향 설정
    }
    window.scrollTo(0, 0);
    onWeek(weekChange);

    setTimeout(() => {
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div
      className='flex w-full justify-center fixed top-16 bg-white z-10'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ResponsiveButton onClick={() => handleSwipe(-1)} ariaLabel="Previous week">
        <FaArrowLeft />
      </ResponsiveButton>

      <div className={`overflow-hidden flex gap-2 p-2 whitespace-nowrap transition-transform duration-300 ${swipeDirection === 'left' ? 'translate-x-10' : swipeDirection === 'right' ? '-translate-x-10' : ''}`}>
        <ul className='flex gap-2'>
          {week.map((date) => (
            <DateItem
              key={date}
              isSelected={date === selectedDate}
              date={date}
              onDate={onDate}
            />
          ))}
        </ul>
      </div>
      <ResponsiveButton onClick={() => handleSwipe(1)} ariaLabel="Next week">
        <FaArrowRight />
      </ResponsiveButton>
    </div>
  );
};

  const ResponsiveButton: React.FC<{ 
    onClick: () => void; 
    ariaLabel: string; 
    children: React.ReactNode; 
  }> = ({ onClick, ariaLabel, children }) => {
    const isMobile = useIsMobile(); // 모바일 감지

    return !isMobile ? (
      <button onClick={onClick} aria-label={ariaLabel} className="desktop-button">
        {children}
      </button>
    ) : null; // 모바일에서는 렌더링하지 않음
  };

export default DateList;
