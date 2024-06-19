import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../types/mealTypes';
import { Ingredient } from '../types/ingredientTypes';
import MealImage from './MealImage';
import useMeals from '../hooks/useMeals';
import useIngredients from '../hooks/useIngredients';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

const MealItem: React.FC<MealItemProps> = ({ meal, date, meals }) => {
  const { removeMeal, editMealDone } = useMeals();
  const { updateIngredientQty } = useIngredients();
  const handleDelete = () => {
    removeMeal.mutate({ name: meal, date });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    editMealDone.mutate({ name: meal, date, done: e.target.checked });

    // 각 재료의 수량 업데이트
    Object.entries(meals?.ingredients).forEach(([ingredientId, ingredient]: [string, Ingredient]) => {
      const quantityChange = e.target.checked ? -ingredient.qty : ingredient.qty;
      updateIngredientQty.mutate({ ingredientId, quantityChange });
    });
  };

  return (
    <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
      <h3 className='font-semibold'>{mealTranslations[meal]}</h3>
      <div className='flex mt-3 gap-3'>
        <input type='checkbox' onChange={handleCheck} checked={meals?.done} />
        <Link className='flex flex-1 items-center gap-4' to='/meals' state={{ meal, date, meals }}>
          <MealImage meal={meal} />
          {meals?.ingredients ? (
            <ul className=''>
              {Object.values(meals.ingredients).map((ingredient: Ingredient) => (
                <li key={ingredient.id} className='flex items-center text-gray-700'>
                  <span className='mr-2 tracking-tighter'>{ingredient.name}</span>
                  <span className='text-gray-500 tracking-tight'>{`${ingredient.qty}${ingredient.unit === 'g' ? 'g' : '개'}`}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className='text-gray-400'>No meals added</div>
          )}
        </Link>

        {meals?.ingredients && (
          <button className='btn btn-square btn-sm' onClick={handleDelete}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
export default MealItem;
