import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { MealProps } from '../../types/mealTypes';

export const MealCheckbox: React.FC<{ meal: MealProps }> = ({ meal }) => {
  const { editMealDone } = useMeals();
  const { updateIngredientQty } = useIngredients();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    editMealDone.mutate({ ...meal, done: checked });

    meal.ingredients.forEach((ingredient) => {
      const quantityChange = checked ? -ingredient.qty : ingredient.qty;
      updateIngredientQty.mutate({ ...ingredient, qty: quantityChange });
    });
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="tooltip" data-tip={meal.done ? '취소': "완료"}>
      <input className='checkbox' type='checkbox' onChange={handleCheck} checked={meal?.done ?? false} />
    </div>
  );
};
