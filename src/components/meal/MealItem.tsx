import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../../types/mealTypes';
import { MealIngredientsList } from './MealIngredientsList';
import { RemoveMealButton } from './RemoveMealButton';
import { MealCheckbox } from './MealCheckbox';
import { MealImage } from './MealImage';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
import { FaPaste } from '@react-icons/all-files/fa/FaPaste';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const MealItem: React.FC<MealItemProps> = ({ meal, copy, onCopy, onPaste, onCancelCopy, onRemove }) => {
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleCopy = () => {
    onCopy(meal);
  };

  const handlePaste = () => {
    onPaste(meal);
  };

  const handleCancelCopy = () => {
    onCancelCopy();
  };

  const handleRemove = () => {
    onRemove(meal);
  };

  const isCopyMeal = meal === copy;

  const mealName = mealTranslations[meal.name as keyof typeof mealTranslations] || meal.name;

  return (
    <Link to='/meals' state={{ meal }} className={`bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 border border-gray-200 ${isCopyMeal ? 'bg-blue-100' : ''}`}>
      <div className='flex justify-between items-center mb-1'>
        <div className='flex items-start space-x-1'>
          <div onClick={(e) => e.stopPropagation()}>
            <MealCheckbox meal={meal} />
          </div>
          <MealImage meal={meal} />
          <h3 className='font-semibold tracking-tight'>{mealName}</h3>
        </div>

        {/* Copy Mode Display */}
        {isCopyMeal ? (
          <div className='flex items-center space-x-2' onClick={handleStopPropagation}>
            <button
              className='btn btn-circle btn-ghost  bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 flex items-center space-x-1 px-3 py-2 rounded-full'
              onClick={handleCancelCopy}>
              <FaTimes className='w-4 h-4' />
            </button>
          </div>
        ) : (
          <div className='flex items-center space-x-2' onClick={handleStopPropagation}>
            <button className='btn btn-circle btn-ghost btn-sm hover:bg-slate-200' onClick={handleCopy}>
              <FaRegCopy className='w-4 h-4 text-gray-600' />
            </button>

            {copy && (
              <button className='btn btn-circle btn-ghost btn-sm' onClick={handlePaste}>
                <FaPaste className='w-4 h-4 text-gray-600' />
                <span className='ml-1'>Paste</span>
              </button>
            )}

            <RemoveMealButton meal={meal} onRemove={handleRemove} />
          </div>
        )}
      </div>
      <MealIngredientsList ingredients={meal.ingredients} />
    </Link>
  );
};
