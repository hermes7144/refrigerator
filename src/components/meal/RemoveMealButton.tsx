import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { Meal } from '../../types/mealTypes';

export const RemoveMealButton: React.FC<{ meal: Meal; date: string }> = ({ meal, date }) => {
  const { removeMeal } = useMeals();
  const { updateIngredientQty } = useIngredients();
  

  const handleClick =() => {
    if (meal.done) {
      Object.entries(meal.ingredients).forEach(([ingredientId, ingredient]) => {      
        updateIngredientQty.mutate({ ingredientId, quantityChange :ingredient.qty});
      });
    }
    removeMeal.mutate({ name: meal.name, date });
  }

  return (
    <button className='btn btn-square btn-sm' onClick={handleClick}>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
      </svg>
    </button>
  );
};