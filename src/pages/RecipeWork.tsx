import { useLocation, useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import React, { useState, useEffect } from 'react';
import { Ingredient } from '../types/ingredientTypes';
import ErrorDialog from '../components/common/ErrorDialog';
import Select, { SingleValue } from 'react-select';
import useRecipes from '../hooks/useRecipes';


export default function RecipeWork() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state;
  const { ingredientsQuery: { data: ingredients }} = useIngredients();
  const { addRecipe, updateRecipe } = useRecipes();
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [name, setName] = useState('');

  // useEffect(() => {
  //   if (meal.ingredients) {
  //     const initialIngredients: Ingredient[] = Object.values(meal.ingredients) as Ingredient[];
  //     setIngredientList(initialIngredients);
  //   } else {
  //     setIngredientList([{ id: '', name: '', unit: '', qty: 0, category: '' }]);
  //   }
  // }, [meal]);

  const handleIngredientChange = (e: SingleValue<{ value: string; label: string }>, index: number) => {
    const newIngredientList = [...ingredientList];
    const selectedIngredient = ingredients?.find((ingredient) => ingredient.id === e?.value);
    if (selectedIngredient) {
      newIngredientList[index] = {
        ...newIngredientList[index],
        id: selectedIngredient.id,
        name: selectedIngredient.name,
        unit: selectedIngredient.unit,
        category: selectedIngredient.category,
      };
      setIngredientList(newIngredientList);
    }
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newIngredientList = [...ingredientList];
    newIngredientList[index] = {
      ...newIngredientList[index],
      qty: Number(e.target.value),
    };
    setIngredientList(newIngredientList);
  };

  const handleAddIngredient = () => {
    setIngredientList([...ingredientList, { id: '', name: '', unit: '', qty: 0, category: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredientList.length === 1) return;
  
    const newIngredientList = ingredientList.filter((_, i) => i !== index);
    setIngredientList(newIngredientList);
  };

  const handleSubmit = () => {
    const isValid = ingredientList.every((ingredient, i) => {
      if (!ingredient.category) {
        setErrorMessage(`${i + 1}번째 카테고리가 없습니다.`);
        return false;
      }
      if (!ingredient.qty) {
        setErrorMessage(`재료: ${ingredient.name}의 수량을 입력해주세요.`);
        return false;
      }
      return true;
    });

    if (!isValid) {
      return false;
    }

    // 같은 카테고리의 재료를 합치는 로직
    const mergedIngredients = ingredientList.reduce((acc, ingredient) => {
      const existingIngredient = acc.find((item) => item.id === ingredient.id);
      if (existingIngredient) {
        existingIngredient.qty += ingredient.qty;
      } else {
        acc.push({ ...ingredient });
      }
      return acc;
    }, [] as Ingredient[]);

    const recipeData = {
      name: name,
      ingredients: mergedIngredients.filter((ingredient) => ingredient.id && ingredient.qty > 0),
    };

    if (recipe) {
      updateRecipe.mutate({
        ...recipeData,
        id: recipe.id,
      });
    } else {
      addRecipe.mutate(recipeData);
    }
    navigate('/recipes');
  };

  const ingredientOptions = ingredients?.map((ingredient) => ({ value: ingredient.id, label: `${ingredient.name} (${ingredient.unit})` }));

   const handleChange =(e) => setName(e.target.value);

  return (
    <div className='flex flex-col items-center  p-2 w-full md:w-2/5 mx-auto'>

    <div>
    <input type="text" value={name} onChange={handleChange} />

    </div>
    <div>
      {ingredientList.map((ingredient, index) => (
          <div key={index} className='flex items-center mb-2 w-full'>
            <div className='flex gap-1'>
              <Select
                className='basic-single w-60'
                classNamePrefix='select'
                options={ingredientOptions}
                defaultValue={ingredientOptions?.find((option) => option.value === ingredient.id)}
                onChange={(selectedOption: SingleValue<{ value: string; label: string }>) => handleIngredientChange(selectedOption, index)}
              />
              <input
                type='text'
                className='input input-bordered w-full max-w-20 text-right h-10'
                onChange={(e) => handleQtyChange(e, index)}
                value={+ingredient.qty.toString() > 0 ? ingredient.qty.toString() : undefined}
              />
            </div>
            {index > 0 && (
              <button className='btn btn-sm btn-circle ml-1 btn-error text-white' onClick={() => handleRemoveIngredient(index)}>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            )}
          </div>
        ))}
    </div>
      <div className='w-full flex justify-between items-center mt-10'>
        <button className=' btn btn-success text-white' onClick={handleAddIngredient}>
          재료 추가
        </button>
        <button className=' btn btn-primary' onClick={handleSubmit}>
          확인
        </button>
      </div>
      {errorMessage && <ErrorDialog message={errorMessage} onClose={() => setErrorMessage(null)} />}
    </div>
  );
}
