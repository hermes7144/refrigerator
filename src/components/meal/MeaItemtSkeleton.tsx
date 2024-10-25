import { FC } from 'react';
import { MealListProps } from '../../types/mealTypes';
import { MealSectionSkeleton } from './MealSectionSkeleton';
import { useWeek } from '../../context/WeekContext';

export const MealListSkeleton: FC<MealListProps> = ({ selectedDate, scrollRefs }) => {
  const { week } = useWeek();

  return (
    <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-80'>
      {week.map((date) => {
        return (
          <MealSectionSkeleton
            date={date}
            key={date}
            selected={selectedDate === date}
            scrollRef={(el) => scrollRefs.current[date] = el}
            isSkeleton={true}
          />
        );
      })}
    </ul>
  );
};
