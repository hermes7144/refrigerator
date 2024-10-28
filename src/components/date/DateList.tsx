import { FC, memo, useCallback } from 'react';
import { DateItem } from './DateItem';
import { DateListProps } from '../../types';
import WeekNavigationButton from './WeekNavigationButton';
import { useWeek } from '../../context/WeekContext';

export const DateList: FC<DateListProps> = ({ selectedDate, onDate }) => {
  const { week, handleShift } = useWeek();

  const handlePlusWeek = useCallback(() => {
    window.scrollTo(0, 0);
    handleShift(1);
  }, [handleShift]);

  const handleMinusWeek = useCallback(() => {
    window.scrollTo(0, 0);
    handleShift(-1);
  }, [handleShift]);

  return (
    <div
      className='flex w-full justify-center fixed top-16 bg-white z-10'
    >
      <WeekNavigationButton 
        onClick={handleMinusWeek} 
        ariaLabel="Previous week" 
        direction='left'
      >
      </WeekNavigationButton>
      <ul className={`overflow-hidden flex gap-2 p-2 whitespace-nowrap`}>
        {week.map((date) => <DateItem key={date} isSelected={date === selectedDate} date={date} onDate={onDate} />)}
      </ul>
      <WeekNavigationButton 
        onClick={handlePlusWeek} 
        ariaLabel="Next week"
        direction='right'
      >
      </WeekNavigationButton>
    </div>
  );
};



export default memo(DateList);


