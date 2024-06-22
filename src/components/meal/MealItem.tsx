import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../../types/mealTypes';
import MealImage from './MealImage';
import { MealIngredientsList } from './MealIngredientsList';
import { RemoveMealButton } from './RemoveMealButton';
import { MealCheckbox } from './MealCheckbox';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const MealItem: React.FC<MealItemProps> = ({ meal, date, meals }) => (
  <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <h3 className='font-semibold'>{mealTranslations[meal]}</h3>
    <div className='flex mt-3 gap-3'>
    <MealCheckbox meals={meals} meal={meal} date={date.format('YYYY-MM-DD')} />
      <Link className='flex flex-1 items-center gap-4' to='/meals' state={{ meal, date, meals }}>
        <MealImage meal={meal} />
        <MealIngredientsList ingredients={meals.ingredients} />
      </Link>
      <RemoveMealButton meal={meal} date={date.format('YYYY-MM-DD')} />
    </div>
  </div>
);
