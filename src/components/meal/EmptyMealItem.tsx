import React from 'react';
import { Link } from 'react-router-dom';
import MealImage from './MealImage';
import { Dayjs } from 'dayjs';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};


export const EmptyMealItem: React.FC<{meal:string; date:Dayjs}> = ({ meal, date }) => (
  <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <h3 className='font-semibold'>{mealTranslations[meal]}</h3>
    <div className='flex mt-3 gap-3'>
      <Link className='flex flex-1 items-center gap-4' to='/meals' state={{ meal, date }}>
        <MealImage meal={meal} />
        <div className='text-gray-400'>No meals added</div>
      </Link>
    </div>
  </div>
);
