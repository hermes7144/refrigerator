import { useLocation, useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import React, { useState, useEffect } from 'react';
import useMeals from '../hooks/useMeals';
import { Meal } from '../types/mealTypes';
import { IngredientProps } from '../types/ingredientTypes';
import ErrorDialog from '../components/common/ErrorDialog';
import dayjs from 'dayjs';
import Select, { SingleValue } from 'react-select';
import { BsX } from '@react-icons/all-files/bs/BsX';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export default function Meals() {
  const location = useLocation();
  const navigate = useNavigate();
  const { meal, date }: { meal: Meal; date: string } = location.state;
  const {
    ingredientsQuery: { data: ingredients },
  } = useIngredients();
  const { addMeal, updateMeal } = useMeals();
  const [ingredientList, setIngredientList] = useState<IngredientProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (meal.ingredients) {
      const initialIngredients: IngredientProps[] = Object.values(meal.ingredients) as IngredientProps[];
      setIngredientList(initialIngredients);
    } else {
      setIngredientList([{ id: '', name: '', unit: '', qty: 0, category: '' }]);
    }
  }, [meal]);

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
    }, [] as IngredientProps[]);

    const mealData: Meal = {
      name: meal.name,
      date: dayjs(date).format('YYYY-MM-DD'),
      ingredients: mergedIngredients.filter((ingredient) => ingredient.id && ingredient.qty > 0),
      done: meal?.done,
    };

    if (meal.ingredients) {
      updateMeal.mutate({
        ...mealData,
        id: meal.id,
      });
    } else {
      addMeal.mutate(mealData);
    }
    navigate(-1);
  };

  const ingredientOptions = ingredients?.map((ingredient) => ({ value: ingredient.id, label: `${ingredient.name} (${ingredient.unit})` }));

  return (
    <div className='flex flex-col items-center' style={{ minHeight: 'calc(100vh - 57px)' }}>
      <h1></h1>
      <div className='p-4 w-full md:w-1/2 lg:w-1/3'>
        <h1 className='text-2xl font-semibold mb-4'>{`${dayjs(date).format('M월 D일 ddd요일')} ${mealTranslations[meal.name]} `}</h1>
        <div className='flex flex-col gap-2 w-full'>
          <button className='btn btn-success text-white py-2' onClick={handleAddIngredient}>
            재료 추가
          </button>
          <div className='w-full h-80 overflow-y-auto p-2'>
            {ingredientList.map((ingredient, index) => (
              <div key={index} className='flex items-center mb-2 w-full'>
                <Select
                  className='basic-single flex-grow'
                  classNamePrefix='select'
                  options={ingredientOptions}
                  value={ingredientOptions?.find((option) => option.value === ingredient.id)}
                  onChange={(selectedOption) => handleIngredientChange(selectedOption, index)}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (provided) => ({ ...provided, zIndex: 9999 }) }}
                />
                <input type='text' className='input input-bordered w-24 ml-2 p-2 h-10' onChange={(e) => handleQtyChange(e, index)} value={ingredient.qty ? ingredient.qty.toString() : ''} />
                {index > 0 && (
                  <button className='btn btn-sm btn-circle ml-2 btn-error text-white' onClick={() => handleRemoveIngredient(index)}>
                    <BsX className='h-5 w-5' />
                  </button>
                )}
                {index === 0 && <div className='w-10'></div>} {/* 첫 번째 행에 빈 공간 추가 */}
              </div>
            ))}
          </div>
        </div>
        <div className='w-full flex justify-end mt-8'>
          <button className='btn btn-primary' onClick={handleSubmit}>
            확인
          </button>
        </div>
        {errorMessage && <ErrorDialog message={errorMessage} onClose={() => setErrorMessage(null)} />}
      </div>
    </div>
  );
}
