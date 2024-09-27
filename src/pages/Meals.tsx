import { useLocation, useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import React, { useState, useEffect } from 'react';
import useMeals from '../hooks/useMeals';
import { MealProps } from '../types/mealTypes';
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
  const { meal } = location.state as { meal: MealProps };

  const {
    ingredientsQuery: { data: ingredients },
  } = useIngredients();
  const { addMeal, updateMeal } = useMeals();
  const [ingredientList, setIngredientList] = useState<IngredientProps []>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (meal.ingredients) {
      const initialIngredients: IngredientProps[] = meal.ingredients.sort((a: IngredientProps,b:IngredientProps) => a.seq! - b.seq!) ;
      setIngredientList(initialIngredients);
    } else {
      setIngredientList([{ id: '', name: '', unit: '', qty: 0, category: '' ,expiration:''}]);
    }
  }, [meal]);

  const handleIngredientChange = (e: SingleValue<{ value: string | undefined; label: string }>, index: number) => {
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
    const { value } = e.target;

    if (/^\d*$/.test(value)) {
      const newIngredientList = [...ingredientList];
      newIngredientList[index] = {
        ...newIngredientList[index],
        qty: Number(e.target.value),
      };
      setIngredientList(newIngredientList);    
    }
  };

  const handleAddIngredient = () => {
    setIngredientList([...ingredientList, { id: '', name: '', unit: '', qty: 0, category: '', expiration:'' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredientList.length === 1) return;
    const newIngredientList = ingredientList.filter((_, i) => i !== index);
    setIngredientList(newIngredientList);
  };

  const handleSubmit = () => {
    const validateIngredient = (ingredient : IngredientProps, index :number) => {
      const { category, qty, name } = ingredient;
      
      if (!category && !qty) {
        return true;
      }
      
      if (!category) {
        setErrorMessage(`${index + 1}번째 카테고리가 없습니다.`);
        return false;
      }
  
      if (!qty) {
        setErrorMessage(`${name}의 수량을 입력해주세요.`);
        return false;
      }
  
      return true;
    };
  
    const isValid = ingredientList.every(validateIngredient);
  
    if (!isValid) {
      return false;
    }

    // // 같은 카테고리의 재료를 합치는 로직
    // const mergedIngredients = ingredientList.reduce((acc, ingredient) => {
    //   const existingIngredient = acc.find((item) => item.id === ingredient.id);
    //   if (existingIngredient) {
    //     existingIngredient.qty += ingredient.qty;
    //   } else {
    //     acc.push({ ...ingredient });
    //   }
    //   return acc;
    // }, [] as IngredientProps[]);

    const mealData: MealProps = {
      id:'',
      mealType: meal.mealType,
      date: meal.date,
      ingredients: ingredientList.filter((ingredient) => ingredient.id && ingredient.qty > 0),
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

  const ingredientOptions = ingredients?.map(({ id, name, qty, unit }) => ({
    value: id,
    label: `${name} (${qty}${unit === 'ea' ? '개' : unit})`,
  }));

  return (
    <div className='flex flex-col items-center' style={{ minHeight: 'calc(100vh - 100px)' }}>
      <h1></h1>
      <div className='p-4 w-full md:w-1/2 lg:w-1/3'>
        <h1 className='text-2xl font-semibold mb-4'>{`${dayjs(meal.date).format('M월 D일 ddd요일')} ${mealTranslations[meal.mealType]} `}</h1>
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
                  onChange={(e) => handleIngredientChange(e, index)}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (provided) => ({ ...provided, zIndex: 9999 }) }}
                  placeholder='재료 선택'
                />
                <input type='text' className='input input-bordered w-24 ml-2 p-2 h-10' onChange={(e) => handleQtyChange(e, index)} value={ingredient.qty} />
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

        <div className='w-full flex justify-end mt-4 gap-3'>
          <button className='btn' onClick={() => navigate(-1)}>
            돌아가기
          </button>
          <button className='btn flex-1 text-white  bg-brand hover:bg-brand hover:brightness-110' onClick={handleSubmit}>
            등록하기
          </button>
        </div>

        {errorMessage && <ErrorDialog message={errorMessage} onClose={() => setErrorMessage(null)} />}
      </div>
    </div>
  );
}
