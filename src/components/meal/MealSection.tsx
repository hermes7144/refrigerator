import { FC } from 'react';
import { MealSectionProps, MealTypeProps } from '../../types/mealTypes';
import { MealItem } from './MealItem';
import dayjs from 'dayjs';

const MEAL_TYPES: MealTypeProps[] = ['breakfast', 'lunch', 'dinner'];

export const MealSection: FC<MealSectionProps> = ({ date, scrollRef}) => {
  return (
    <div ref={scrollRef} className='flex flex-col gap-2 p-4'>
      <div className='flex items-center gap-1'>
        <h2 className='text-lg font-semibold'>{dayjs(date).format('M.D ddd요일')}</h2>
      </div>
      {MEAL_TYPES.map(mealType => <MealItem key={date + mealType} date={date} mealType={mealType} /> )}
    </div>
  );
};
