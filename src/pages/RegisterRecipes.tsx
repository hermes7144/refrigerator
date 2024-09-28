import { useLocation, useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import React, { useEffect, useState } from 'react';
import { IngredientProps } from '../types/ingredientTypes';
import ErrorDialog from '../components/common/ErrorDialog';
import Select, { SingleValue } from 'react-select';
import useRecipes from '../hooks/useRecipes';
import { BsX } from '@react-icons/all-files/bs/BsX';

export default function RegisterRecipes() {
  const location = useLocation();
  const recipe = location.state?.item;
  const navigate = useNavigate();

  const {
    ingredientsQuery: { data: ingredients },
  } = useIngredients();
  const { addRecipe, updateRecipe } = useRecipes();
  const [ingredientList, setIngredientList] = useState<IngredientProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (recipe) {
      const initialIngredients: IngredientProps[] = recipe.ingredients as IngredientProps[];
      setName(recipe.name);
      setIngredientList(initialIngredients);
    } else {
      setIngredientList([{ id: '', name: '', unit: '', qty: 0, category: '' ,expiration:''}]);

    }
  }, []);

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
    setIngredientList([...ingredientList, { id: '', name: '', unit: '', qty: 0, category: '', expiration: '' }]);
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
    }, [] as IngredientProps[]);

    const recipeData = {
      name,
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
    navigate(-1);
  };

  const ingredientOptions = ingredients?.map((ingredient) => ({ value: ingredient.id, label: `${ingredient.name} (${ingredient.unit})` }));

  return (
    <div className='flex flex-col items-center'>
      <div className='p-4 w-full lg:w-1/2 '>
        <label className='form-control w-full py-4'>
          <div className='label mb-2'>
            <span className='label-text text-lg font-semibold'>레시피 명</span>
          </div>
          <input type='text' className='input input-bordered w-full p-2 text-lg' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div className='flex flex-col gap-2 w-full'>
          <button className='btn btn-success text-white py-2' onClick={handleAddIngredient}>
            재료 추가
          </button>
          <div className='w-full max-h-80 overflow-y-auto'>
            {ingredientList.map((ingredient, index) => (
              <div key={index} className='flex mb-2 w-ful gap-2'>
                <Select
                  className='basic-single flex-grow w-2/3'
                  classNamePrefix='select'
                  options={ingredientOptions}
                  value={ingredientOptions?.find((option) => option.value === ingredient.id)}
                  onChange={(e) => handleIngredientChange(e, index)}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (provided) => ({ ...provided, zIndex: 9999 }) }}
                  placeholder='식단 재료를 선택해주세요'
                />
                <input type='text' placeholder='수량' className='input input-bordered w-1/6 p-1 h-10' onChange={(e) => handleQtyChange(e, index)} value={ingredient.qty === 0 ? '' :ingredient.qty } />
                {index > 0 && (
                  <button className='btn btn-sm btn-circle btn-error text-white' onClick={() => handleRemoveIngredient(index)}>
                    <BsX className='h-5 w-5' />
                  </button>
                )}
                {index === 0 && <div className='w-8'></div>}
              </div>
            ))}
          </div>
        </div>
        <div className='w-full flex justify-end mt-4 gap-2'>
          <button className='btn btn-outline btn-secondary' onClick={() => navigate(-1)}>
            취소
          </button>
          <button className='btn btn-outline btn-primary ' onClick={handleSubmit}>
            저장
          </button>
        </div>
        {errorMessage && <ErrorDialog message={errorMessage} onClose={() => setErrorMessage(null)} />}
      </div>
    </div>
  );
}
