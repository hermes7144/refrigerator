import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { MealProps } from '../../types/mealTypes';
import { FaRegTrashAlt } from '@react-icons/all-files/fa/FaRegTrashAlt';

export interface RemoveMealButtonProps {
  meal: MealProps;
}
export const RemoveMealButton: React.FC<RemoveMealButtonProps> = ({ meal }) => {
  const { removeMeal } = useMeals();
  const { updateIngredientQty } = useIngredients();


  const handleClick = () => {
    if (meal.done) {
      meal.ingredients.forEach((ingredient) => {
        updateIngredientQty.mutate(ingredient);
      });
    }
    removeMeal.mutate(meal);
  };
  return (
    <button className='btn btn-circle btn-ghost btn-sm' onClick={handleClick}>
      <FaRegTrashAlt className='h-4 w-4' />
    </button>
  );
};
