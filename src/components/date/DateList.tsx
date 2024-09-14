import { FC, useRef, useState } from 'react';
import { DateItem } from './DateItem';
import { DateListProps } from '../../types';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import useIsMobile from '../../hooks/useIsMobile';

export const DateList: FC<DateListProps> = ({ week, selectedDate, onDateClick, onWeek }) => {
  const touchStartRef = useRef<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null); // Track swipe direction
  const isMobile = useIsMobile();  

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0].clientX; // Capture initial touch position
    setSwipeDirection(null); // Reset swipe direction
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = event.changedTouches[0].clientX;
    const swipeDistance = touchStartRef.current - touchEnd;

    // Determine if it was a left or right swipe
    if (swipeDistance > 50) {
      setSwipeDirection('right');
      window.scrollTo(0,0);
      onWeek(1); // Navigate to next week
    } else if (swipeDistance < -50) {
      setSwipeDirection('left');
      onWeek(-1); // Navigate to previous week
      window.scrollTo(0,0);
    }

    setTimeout(() => {
      setSwipeDirection(null);
    }, 300);
  };


  return (
    <div className='flex w-full justify-center fixed top-16 bg-white z-10'
    onTouchStart={handleTouchStart} 
    onTouchEnd={handleTouchEnd}>
    {!isMobile &&<button 
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onWeek(-1);
      }} 
      className='px-4 py-2 rounded-lg'
      aria-label="Previous week"
    >
      <FaArrowLeft />
    </button>}
    
    <div className={`overflow-hidden flex gap-2 p-2 whitespace-nowrap transition-transform duration-300 ${swipeDirection === 'left' ? 'translate-x-10' : swipeDirection === 'right' ? '-translate-x-10' : ''}`}>
        <ul className='flex gap-2'>
          {week.map((weekday) => (
            <DateItem 
              key={weekday} 
              isSelected={weekday === selectedDate} 
              weekday={weekday} 
              onDateClick={onDateClick} 
            />
          ))}
        </ul>
      </div>

    {!isMobile && 
    <button 
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onWeek(1);
      }} 
      className='px-4 py-2 rounded-lg'
      aria-label="Next week"
    >
      <FaArrowRight />
    </button>
    }
  </div>

  )
};

export default DateList;
