import React from 'react';
import { MealImage } from './MealImage';
import { EmptyMealItemProps } from '../../types/mealTypes';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

 const EmptyMealItem: React.FC<EmptyMealItemProps> = ({ meal, date, onOpenDialog }) => (
  <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 hover:cursor-pointer' onClick={() => onOpenDialog(meal, date)}>
    <div className='flex space-x-1'>
      <MealImage meal={meal} />
      <h3 className='font-semibold'>{mealTranslations[meal.name as keyof typeof mealTranslations]}</h3>
    </div>
    <div className='pl-6 text-gray-400'>No meals added</div>
  </div>
);
 
export default EmptyMealItem