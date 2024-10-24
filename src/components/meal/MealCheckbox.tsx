import { memo } from 'react';
import useIngredients from '../../hooks/useIngredients';
import useMeals from '../../hooks/useMeals';
import { MealProps } from '../../types/mealTypes';

const MealCheckbox: React.FC<{ meal: MealProps }> = ({ meal }) => {
  const { editMealDone } = useMeals();
  const { updateIngredientsQty } = useIngredients();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    editMealDone.mutate({ ...meal, done: checked });

    if (!meal.isDiningOut) {
      updateIngredientsQty.mutate({ 
        ingredients: meal.ingredients, 
        isAdding: !checked 
      });
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <input 
        className='checkbox' 
        type='checkbox' 
        onChange={handleCheck} 
        checked={Boolean(meal?.done)} 
      />
    </div>
  );
};

export default memo(MealCheckbox);
