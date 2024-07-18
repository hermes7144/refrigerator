import { FC } from 'react';
import { MealItem } from './MealItem';
import { MealSectionProps, MealType } from '../../types/mealTypes';
import { EmptyMealItem } from './EmptyMealItem';
import { SkeletonMealItem } from './SkeletonMealItem';

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner'];
export const MealSection: FC<MealSectionProps> = ({ date, weekday, meals, scrollRef, isSkeleton }) => {
  
  return (
    <div ref={scrollRef} className='flex flex-col gap-2 p-4'>
      <div className='flex items-center gap-1'>
        {date === weekday.format('YYYY-MM-DD') && (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={5} d='M9 5l7 7-7 7' />
          </svg>
        )}
        <h2 className='text-lg font-semibold'>{`${weekday.format('M월 D일 ddd요일')}`}</h2>
      </div>
      {MEAL_TYPES.map(mealType => {
        if (isSkeleton) return <SkeletonMealItem key={mealType} meal={{name:mealType}} date={weekday} />

        const meal = meals?.[mealType];
        return meal ? <MealItem key={mealType} meal={meal} date={weekday} />: <EmptyMealItem key={mealType} meal={{name:mealType}} date={weekday} />
        ;
      })}
    </div>
  );
};
