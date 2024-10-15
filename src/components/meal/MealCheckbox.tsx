import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { MealProps } from '../../types/mealTypes';

export const MealCheckbox: React.FC<{ meal: MealProps }> = ({ meal }) => {
  const { editMealDone } = useMeals();
  const { updateIngredientQty } = useIngredients();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const updatedMeal = { ...meal, done: checked }; // meal 객체를 복사하고 업데이트
    editMealDone.mutate(updatedMeal); // 새로운 객체로 업데이트
  
    meal.ingredients.forEach((ingredient) => {
      const quantityChange = checked ? -ingredient.qty : ingredient.qty;
      updateIngredientQty.mutate({ ...ingredient, qty: quantityChange });
    });
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <input className='checkbox' type='checkbox' onChange={handleCheck} checked={meal?.done ?? false} />
    </div>
  );
};
