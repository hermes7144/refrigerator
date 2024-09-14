import React from 'react';
import { Link } from 'react-router-dom';
import { MealImage } from './MealImage';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};


export const EmptyMealItem: React.FC<{meal: {name:string}; date:string}> = ({ meal, date }) => (
  <Link to='/meals' state={{ meal, date }} className='flex flex-col w-full px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <div className='flex space-x-1'>
      <MealImage meal={meal} />
      <h3 className='font-semibold'>{mealTranslations[meal.name as keyof typeof mealTranslations]}</h3>
    </div>
    <div className='pl-6 text-gray-400'>등록된 식사가 없습니다</div>
  </Link>
);
