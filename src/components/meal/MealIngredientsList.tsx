import React from 'react';
import { IngredientProps } from '../../types/ingredientTypes';

export const MealIngredientsList: React.FC<{ ingredients: IngredientProps[] }> = ({ ingredients }) => (
  <ul className='pl-6 border-l-2 border-gray-100 '>
    {ingredients.map((ingredient) => (
      <li key={ingredient.id} className='flex items-center text-gray-700 leading-snug tracking-tight text-sm'>
        <span className='mr-2'>{ingredient.name}</span>
        <span className='text-gray-500'>{`${ingredient.qty}${ingredient.unit === 'g' ? 'g' : '개'}`}</span>
      </li>
    ))}
  </ul>
);
