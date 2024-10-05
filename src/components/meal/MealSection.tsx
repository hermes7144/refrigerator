import { FC } from 'react';
import { MealSectionProps, MealTypeProps } from '../../types/mealTypes';
import { MealItem } from './MealItem';
import { EmptyMealItem } from './EmptyMealItem';
import dayjs from 'dayjs';

const MEAL_TYPES: MealTypeProps[] = ['breakfast', 'lunch', 'dinner'];

export const MealSection: FC<MealSectionProps> = ({ date, meals, scrollRef ,selected}) => {

  return (
    <div ref={scrollRef} className='flex flex-col gap-2 p-4'>
      <div className='flex items-center gap-1'>
        {selected && (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={5} d='M9 5l7 7-7 7' />
          </svg>
        )}
        <h2 className='text-lg font-semibold'>{dayjs(date).format('M.D ddd요일')}</h2>
      </div>
      {MEAL_TYPES.map(mealType => { 
        const meal = meals?.[mealType];
        return meal ? <MealItem key={mealType} meal={meal} date={date}   />: <EmptyMealItem key={mealType} meal={{mealType , date}} />;
      })}
    </div>
  );
};
