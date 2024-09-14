import { FC } from 'react';
import { MealSection } from './MealSection';
import { MealListProps } from '../../types/mealTypes';

export const MealListSkeleton: FC<MealListProps> = ({ week, selected, scrollRefs }) => {

  return (
    <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-80'>
      {week.map((weekday) => {
        return (
          <MealSection
            key={weekday}
            selected={selected}
            scrollRef={(el) => scrollRefs.current[weekday] = el}
            isSkeleton={true}
          />
        );
      })}
    </ul>
  );
};
