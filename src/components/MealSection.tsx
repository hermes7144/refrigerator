import { FC } from 'react';
import dayjs from 'dayjs';
import { MealItem } from './MealItem';
import { MealSectionProps } from '../types/mealTypes';

export const MealSection: FC<MealSectionProps> = ({ date, weekday, meals, scrollRef }) => {
  const formattedDate = dayjs(weekday).format('YYYY-MM-DD');

  const mealsForDate = meals?.[formattedDate] || {};

  return (
    <div ref={scrollRef} className='flex flex-col gap-2 p-4 relative'>
      <div className='flex items-center gap-1'>
        {date === formattedDate && (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={5} d='M9 5l7 7-7 7' />
          </svg>
        )}
        <h2 className='text-lg font-semibold'>{`${dayjs(weekday).format('M월 D일 ddd요일')}`}</h2>
      </div>
      <MealItem meal='breakfast' date={formattedDate} meals={mealsForDate.breakfast || null} />
      <MealItem meal='lunch' date={formattedDate} meals={mealsForDate.lunch || null} />
      <MealItem meal='dinner' date={formattedDate} meals={mealsForDate.dinner || null} />
    </div>
  );
};
