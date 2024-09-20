import React from 'react';
import { Link } from 'react-router-dom';
import { MealImage } from './MealImage';
import { EmptyMealProps } from '../../types/mealTypes';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const SkeletonMealItem: React.FC<{meal:EmptyMealProps }> = ({ meal }) => (
  <Link  to='/meals' state={{ meal }} className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <div className='flex space-x-1 mb-1'>
      <MealImage meal={meal} />
      <h3 className='font-semibold'>{mealTranslations[meal.mealType as keyof typeof mealTranslations]}</h3>
    </div>
    <div className="flex pl-6 border-l-2 border-gray-100">
      <div className="skeleton h-4 w-40"></div>
    </div>
  </Link>
);
