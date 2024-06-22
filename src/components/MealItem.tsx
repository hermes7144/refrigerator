import React from 'react';
import { Link } from 'react-router-dom';
import { Meal, MealItemProps } from '../types/mealTypes';
import MealImage from './MealImage';
import useMeals from '../hooks/useMeals';
import useIngredients from '../hooks/useIngredients';
import { Ingredient } from '../types/ingredientTypes';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

const MealCheckbox: React.FC<{ meals: Meal; meal: string; date: string }> = ({ meals, meal, date }) => {
  const { editMealDone } = useMeals();
  const { updateIngredientQty } = useIngredients();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!meals) return;
    const { checked } = e.target;
    editMealDone.mutate({ name: meal, date, done: checked });

    // Update each ingredient's quantity
    Object.entries(meals.ingredients).forEach(([ingredientId, ingredient]) => {
      const quantityChange = checked ? -ingredient.qty : ingredient.qty;
      updateIngredientQty.mutate({ ingredientId, quantityChange });
    });
  };

  return <input type='checkbox' onChange={handleCheck} checked={meals?.done ?? false} />;
};

const MealIngredientsList: React.FC<{ ingredients: Ingredient[] }> = ({ ingredients }) => (
  <ul>
    {Object.values(ingredients).map((ingredient) => (
      <li key={ingredient.id} className='flex items-center text-gray-700'>
        <span className='mr-2 tracking-tighter'>{ingredient.name}</span>
        <span className='text-gray-500 tracking-tight'>{`${ingredient.qty}${ingredient.unit === 'g' ? 'g' : '개'}`}</span>
      </li>
    ))}
  </ul>
);

const RemoveMealButton: React.FC<{ meal: string; date: string }> = ({ meal, date }) => {
  const { removeMeal } = useMeals();

  return (
    <button className='btn btn-square btn-sm' onClick={() => removeMeal.mutate({ name: meal, date })}>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
      </svg>
    </button>
  );
};

export const MealItem: React.FC<MealItemProps> = ({ meal, date, meals }) => (
  <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <h3 className='font-semibold'>{mealTranslations[meal]}</h3>
    <div className='flex mt-3 gap-3'>
      {meals?.ingredients && <MealCheckbox meals={meals} meal={meal} date={date} />}
      <Link className='flex flex-1 items-center gap-4' to='/meals' state={{ meal, date, meals }}>
        <MealImage meal={meal} />
        {meals?.ingredients ? (
          <MealIngredientsList ingredients={meals.ingredients} />
        ) : (
          <div className='text-gray-400'>No meals added</div>
        )}
      </Link>
      {meals?.ingredients && <RemoveMealButton meal={meal} date={date} />}
    </div>
  </div>
);
