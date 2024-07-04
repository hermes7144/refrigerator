import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../../types/mealTypes';
import { MealIngredientsList } from './MealIngredientsList';
import { RemoveMealButton } from './RemoveMealButton';
import { MealCheckbox } from './MealCheckbox';
import { MealImage } from './MealImage';
import { FaRegCopy } from "react-icons/fa";

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const MealItem: React.FC<MealItemProps> = ({ meal, date }) => (
  <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <div className='flex justify-between p-1'>
    <h3 className='font-semibold'>{mealTranslations[meal.name as keyof typeof mealTranslations]}</h3>
    <div className='flex justify-center items-center w-7 h-7 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
    <FaRegCopy className='w-4 h-4' />
    </div>
    </div> 
    <div className='flex mt-3 gap-3'>
      <MealCheckbox meal={meal} date={date.format('YYYY-MM-DD')} />
      <Link className='flex flex-1 items-center gap-4' to='/meals' state={{ meal, date }}>
        <MealImage meal={meal} />
        <MealIngredientsList ingredients={meal.ingredients} />
      </Link>
      <RemoveMealButton meal={meal} date={date.format('YYYY-MM-DD')} />
    </div>
  </div>
);
