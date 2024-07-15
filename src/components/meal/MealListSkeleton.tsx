import { FC } from 'react';
import { MealSection } from './MealSection';
import { MealListProps } from '../../types/mealTypes';

export const MealListSkeleton: FC<MealListProps> = ({ week, selectedDate, scrollRefs }) => {

  return (
    <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-80'>
      {week.map((weekday) => {
        return (
          <MealSection
            key={weekday.format('MMDD')}
            date={selectedDate}
            weekday={weekday}
            scrollRef={(el) => scrollRefs.current[weekday.format('YYYY-MM-DD')] = el}
            isSkeleton={true}
          />
        );
      })}
    </ul>
  );
};
