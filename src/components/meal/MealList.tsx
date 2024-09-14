import { FC } from 'react';
import { MealSection } from './MealSection';
import {  MealListProps } from '../../types/mealTypes';
import useMeals from '../../hooks/useMeals';

export const MealList: FC<MealListProps> = ({ week, selectedDate, scrollRefs }) => {
  const {
    mealsQuery: { data: meals },
  } = useMeals();

  return (
    <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-60 mt-20'>
      {week.map((date) => 
          <MealSection
            key={date}
            date={date}
            meals={meals?.[date]}
            scrollRef={(el) => (scrollRefs.current[date] = el)}
            selected={selectedDate === date} // 선택된 날짜와 비교
          />)}
    </ul>
  );
};
