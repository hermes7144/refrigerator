import { FC } from 'react';
import { MealSection } from './MealSection';
import { MealListProps } from '../../types/mealTypes';
import useMeals from '../../hooks/useMeals';

export const MealList: FC<MealListProps> = ({ week, selectedDate, scrollRefs }) => {
  const {
    mealsQuery: { data: meals },
  } = useMeals();

  return (
    <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-60 mt-20'>
      {week.map((weekday) => {
        return (
          <MealSection
            key={weekday.format('MMDD')}
            date={selectedDate}
            weekday={weekday}
            meals={meals?.[weekday.format('YYYY-MM-DD')]}
            scrollRef={(el) => (scrollRefs.current[weekday.format('YYYY-MM-DD')] = el)}
          />
        );
      })}
    </ul>
  );
};
