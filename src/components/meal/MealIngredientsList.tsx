import React from 'react';
import { Ingredient } from '../../types/ingredientTypes';

export const MealIngredientsList: React.FC<{ ingredients: Ingredient[] }> = ({ ingredients }) => (
  <ul>
    {Object.values(ingredients).map((ingredient) => (
      <li key={ingredient.id} className='flex items-center text-gray-700'>
        <span className='mr-2 tracking-tighter'>{ingredient.name}</span>
        <span className='text-gray-500 tracking-tight'>{`${ingredient.qty}${ingredient.unit === 'g' ? 'g' : '개'}`}</span>
      </li>
    ))}
  </ul>
);