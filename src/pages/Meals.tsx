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

  // 외식 여부 상태 추가
  const [isDiningOut, setIsDiningOut] = useState<boolean>(meal?.isDiningOut || false);
  const [ingredientList, setIngredientList] = useState<IngredientProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [diningOutMenu, setDiningOutMenu] = useState<string>(meal?.diningOutMenu || '');

  useEffect(() => {
    if (meal.ingredients && !isDiningOut) {
      const initialIngredients: IngredientProps[] = meal.ingredients.sort((a: IngredientProps, b: IngredientProps) => a.seq! - b.seq!);
      setIngredientList(initialIngredients);
    } else {
      setIngredientList([{ id: '', name: '', unit: '', qty: 0, category: '', expiration: '' }]);
    }
  }, [meal, isDiningOut]);

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
    setIngredientList([...ingredientList, { id: '', name: '', unit: '', qty: 0, category: '', expiration: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredientList.length === 1) return;
    const newIngredientList = ingredientList.filter((_, i) => i !== index);
    setIngredientList(newIngredientList);
  };

  const handleSubmit = () => {
    if (isDiningOut) {
      if (!diningOutMenu) {
        setErrorMessage("외식 메뉴를 입력해주세요.");
        return;
      }
  
      const diningOutData: MealProps = {
        id: '',
        mealType: meal.mealType,
        date: meal.date,
        ingredients: [],  // 외식인 경우 재료는 빈 배열
        done: meal?.done,
        isDiningOut: true,
        diningOutMenu,
      };
  
      if (meal.id) {
        updateMeal.mutate({ ...diningOutData, id: meal.id });
      } else {
        addMeal.mutate(diningOutData);
      }
  
    } else {
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
 
      if (!isValid) return;
  
      const mealData: MealProps = {
        id: '',
        mealType: meal.mealType,
        date: meal.date,
        ingredients: ingredientList.filter((ingredient) => ingredient.id && ingredient.qty > 0),
        done: meal?.done,
        isDiningOut: false,
        diningOutMenu: '',  // 외식이 아니므로 빈 값
      };
  
      if (meal.id) {
        updateMeal.mutate({ ...mealData, id: meal.id });
      } else {
        addMeal.mutate(mealData);
      }
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
      <div className='p-4 w-full lg:w-1/2 '>
        <h1 className='text-2xl font-semibold mb-4'>{`${dayjs(meal.date).format('M월 D일 ddd요일')} ${mealTranslations[meal.mealType]} `}</h1>

        {/* 외식 여부 선택 */}
        <div className='flex items-center mb-4'>
          <label className='mr-2'>외식 여부</label>
          <input type='checkbox' checked={isDiningOut} onChange={() => setIsDiningOut(!isDiningOut)} />
        </div>

        {!isDiningOut ? (
          <div className='flex flex-col gap-2 w-full'>
            <button className='btn btn-success text-white py-2' onClick={handleAddIngredient}>
              재료 추가
            </button>
            <div className='w-full h-80 overflow-y-auto p-2'>
              {ingredientList.map((ingredient, index) => (
                <div key={index} className='flex gap-2 mb-2 w-full'>
                  <div key={index} className='flex gap-2 mb-2 w-full'>
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
                    <input
                      type='text'
                      placeholder='수량'
                      className='input input-bordered w-1/6 p-1 h-10 text-right'
                      onChange={(e) => handleQtyChange(e, index)}
                      value={ingredient.qty === 0 ? '' : ingredient.qty}
                    />
                    {index > 0 && (
                      <button className='btn btn-sm btn-circle btn-error text-white' onClick={() => handleRemoveIngredient(index)}>
                        <BsX className='h-5 w-5' />
                      </button>
                    )}
                    {index === 0 && <div className='w-8'></div>} {/* 첫 번째 행에 빈 공간 추가 */}
                  </div>{' '}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <label>외식 메뉴</label>
            <input type='text' placeholder='외식 메뉴를 입력해주세요' className='input input-bordered w-full' value={diningOutMenu} onChange={(e) => setDiningOutMenu(e.target.value)} />
          </div>
        )}

        <div className='w-full flex justify-end mt-4 gap-3'>
          <button className='btn' onClick={() => navigate(-1)}>
            돌아가기
          </button>
          <button className='btn flex-1 text-white bg-brand hover:bg-brand hover:brightness-110' onClick={handleSubmit}>
            등록하기
          </button>
        </div>

        {errorMessage && <ErrorDialog message={errorMessage} onClose={() => setErrorMessage(null)} />}
      </div>
    </div>
  );
}
