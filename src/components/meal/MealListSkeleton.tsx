import { FC } from 'react';
import { MealListProps } from '../../types/mealTypes';
import { MealSectionSkeleton } from './MealSectionSkeleton';

export const MealListSkeleton: FC<MealListProps> = ({ week, selectedDate, scrollRefs }) => {

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
