import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../../types/mealTypes';
import { MealIngredientsList } from './MealIngredientsList';
import { RemoveMealButton } from './RemoveMealButton';
import { MealCheckbox } from './MealCheckbox';
import { MealImage } from './MealImage';
// import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
// import { FaPaste } from '@react-icons/all-files/fa/FaPaste';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

const mealName = mealTranslations[meal.name as keyof typeof mealTranslations] || meal.name;

  return (
    <Link to='/meals' state={{ meal, date:meal.date }} className='bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 border border-gray-200'>
      <div className='flex justify-between items-center mb-1'>
        <div className='flex items-start space-x-1'>
          <div onClick={handleStopPropagation}>
            <MealCheckbox meal={meal} date={meal.date} />
          </div>
          <MealImage meal={meal} />
          <h3 className='font-semibold tracking-tight'>{mealName}</h3>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='flex' onClick={handleStopPropagation}>
            {/* <button className='btn btn-circle btn-ghost btn-sm' onClick={onCopy}>
              <FaRegCopy className='w-4 h-4 text-gray-600' />
            </button> */}
            {/* <button className='btn btn-circle btn-ghost btn-sm' onClick={onPaste} >
              <FaPaste className='w-4 h-4 text-gray-600' />
            </button> */}
            <RemoveMealButton meal={meal} date={meal.date} />
          </div>
        </div>
      </div>
      <MealIngredientsList ingredients={meal.ingredients} />
    </Link>
  );
};


