import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { Meal } from '../../types/mealTypes';

export const MealCheckbox: React.FC<{ meal: Meal; date: string }> = ({ meal, date }) => {
  const { editMealDone } = useMeals();
  const { updateIngredientQty } = useIngredients();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    editMealDone.mutate({ name: meal.name, date, done: checked });

    // Update each ingredient's quantity
    Object.entries(meal.ingredients).forEach(([ingredientId, ingredient]) => {
      const quantityChange = checked ? -ingredient.qty : ingredient.qty;
      updateIngredientQty.mutate({ ingredientId, quantityChange });
    });
  };

  return <input className='checkbox' type='checkbox' onChange={handleCheck} checked={meal?.done ?? false} />;
};
