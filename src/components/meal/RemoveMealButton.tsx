import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { Meal } from '../../types/mealTypes';
import { BsX } from '@react-icons/all-files/bs/BsX';

export interface RemoveMealButtonProps {
  meal: Meal;
  date: string;
}

export const RemoveMealButton: React.FC<RemoveMealButtonProps> = ({ meal, date }) => {
  const { removeMeal } = useMeals();
  const { updateIngredientQty } = useIngredients();

  const handleClick = () => {
    if (meal.done) {
      Object.entries(meal.ingredients).forEach(([ingredientId, ingredient]) => {
        updateIngredientQty.mutate({ ingredientId, quantityChange: ingredient.qty });
      });
    }
    removeMeal.mutate({ name: meal.name, date });
  };

  return (
    <button className='btn btn-circle btn-ghost btn-sm' onClick={handleClick}>
      <BsX className='h-6 w-6' />
    </button>
  );
};
