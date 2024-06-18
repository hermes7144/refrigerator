import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../types/mealTypes';
import { Ingredient } from '../types/ingredientTypes';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

const MealItem: React.FC<MealItemProps> = ({ meal, date, meals }) => {
  return (
    <Link to='/meals' state={{ meal, date, meals }}>
      <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
        <h3 className='text-base  font-semibold'>{mealTranslations[meal]}</h3>
        {meals?.ingredients ? (
          <ul className='mt-2'>
            {Object.values(meals.ingredients).map((ingredient: Ingredient) => (
              <li key={ingredient.id} className='flex items-center text-gray-700'>
                <span className='mr-2'>{ingredient.name}</span>
                <span className='text-gray-500'>{`${ingredient.qty}${ingredient.unit === 'g' ? 'g' : '개'}`}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-gray-400'>No meals added</div>
        )}
      </div>
    </Link>
  );
};
export default MealItem;
