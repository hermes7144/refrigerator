import React from 'react';
import { Link } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { MealImage } from './MealImage';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};


export const EmptyMealItem: React.FC<{meal:{name:string}; date:Dayjs}> = ({ meal, date }) => (
  <Link  to='/meals' state={{ meal, date }} className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <div className='flex space-x-1'>
      <MealImage meal={meal} />
      <h3 className='font-semibold'>{mealTranslations[meal.name as keyof typeof mealTranslations]}</h3>
    </div>
    <div className='pl-6 text-gray-400'>No meals added</div>
  </Link>
);
