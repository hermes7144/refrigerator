import { FC } from 'react';
import { MealSection } from './MealSection';
import { MealListProps } from '../../types/mealTypes';
import useMeals from '../../hooks/useMeals';

export const MealList: FC<MealListProps> = ({ week, selectedDate, scrollRefs }) => {
  const {mealsQuery: { data: meals, isError }} = useMeals(); 

  if (isError) {
    return <div>Error loading meals</div>;
  }

  return (
    <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-80'>
      {week.map((weekday) => {
        return (
          <MealSection
            key={weekday.format('MMDD')}
            date={selectedDate}
            weekday={weekday}
            meals={meals?.[weekday.format('YYYY-MM-DD')]}
            scrollRef={(el) => scrollRefs.current[weekday.format('YYYY-MM-DD')] = el}
          />
        );
      })}
    </ul>
  );
};
