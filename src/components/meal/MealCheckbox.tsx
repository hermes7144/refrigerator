import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { Meal } from '../../types/mealTypes';

export const MealCheckbox: React.FC<{ meals: Meal; meal: string; date: string }> = ({ meals, meal, date }) => {
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
