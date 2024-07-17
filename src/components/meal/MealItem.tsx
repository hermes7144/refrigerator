import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../../types/mealTypes';
import { MealIngredientsList } from './MealIngredientsList';
import { RemoveMealButton } from './RemoveMealButton';
import { MealCheckbox } from './MealCheckbox';
import { MealImage } from './MealImage';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};


export const MealItem: React.FC<MealItemProps> = ({ meal, date }) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link to='/meals' state={{ meal, date }} className='bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 border border-gray-200'>
      <div className='flex justify-between items-center mb-1'>
        <div className='flex items-start space-x-1'>
           <div onClick={handleButtonClick}>
              <MealCheckbox meal={meal} date={date.format('YYYY-MM-DD')} />
           </div>
          <MealImage meal={meal} />
          <h3 className='font-semibold tracking-tight'>{mealTranslations[meal.name as keyof typeof mealTranslations]}</h3>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='flex' onClick={handleButtonClick}>
          <button className='btn btn-circle btn-ghost btn-sm'>
            <FaRegCopy className='w-4 h-4 text-gray-600' />
          </button>
          <RemoveMealButton meal={meal} date={date.format('YYYY-MM-DD')} />
          </div>          
        </div>
      </div>
      <MealIngredientsList ingredients={meal.ingredients} />
    </Link>
  );
};
