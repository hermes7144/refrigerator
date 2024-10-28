import { FC, memo, Suspense } from 'react';
import { MealSectionProps, MealTypeProps } from '../../types/mealTypes';
import { MealItem } from './MealItem';
import { SkeletonMealItem } from './SkeletonMealItem';

const MEAL_TYPES: MealTypeProps[] = ['breakfast', 'lunch', 'dinner'];

const MealSection: FC<MealSectionProps> = ({date}) => {

  return (
    <div  className='flex flex-col gap-2 p-4'>
      {MEAL_TYPES.map(mealType =>       
        <Suspense key={date + mealType} fallback={<SkeletonMealItem mealType={mealType} />}>
          <MealItem date={date} mealType={mealType} /> 
        </Suspense>
      )}
    </div>
  );
};


export default memo(MealSection);
