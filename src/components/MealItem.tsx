import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../types/mealTypes';
import { Ingredient } from '../types/ingredientTypes';

const MealItem: React.FC<MealItemProps> = ({ meal, date, meals }) => {
  return (
    <Link className='flex' to='/meals' state={{ meal, date, meals: meals }}>
      <div className='border p-2'>
        <h3>{meal}</h3>
        {meals?.ingredients ? (
          <ul>
            {Object.values(meals.ingredients).map((ingredient: Ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} - {ingredient.qty} {ingredient.unit}
              </li>
            ))}
          </ul>
        ) : (
          <div>No ingredients</div>
        )}
      </div>
    </Link>
  );
};

export default MealItem;
