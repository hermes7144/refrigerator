import { useLocation, useNavigate } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import React, { useState, useEffect } from 'react';
import IngredientSelector from '../components/IngredientSelector';
import useMeals from '../hooks/useMeals';
import { Meal } from '../types/mealTypes';
import { Ingredient } from '../types/ingredientTypes';
import ErrorDialog from '../components/ErrorDialog';
import dayjs from 'dayjs';

const mealTranslations  = {
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

  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (meal.ingredients) {
      const initialIngredients: Ingredient[] = Object.values(meal.ingredients) as Ingredient[];
      setIngredientList(initialIngredients);
    } else {
      setIngredientList([{ id: '', name: '', unit: '', qty: 0, category: '' }]);
    }
  }, [meal]);

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newIngredientList = [...ingredientList];
    const selectedIngredient = ingredients?.find((ingredient) => ingredient.id === e.target.value);
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
    if (ingredientList.length === 1) {
      return;
    }
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
      const existingIngredient = acc.find((item) => item.category === ingredient.category);
      if (existingIngredient) {
        existingIngredient.qty += ingredient.qty;
      } else {
        acc.push({ ...ingredient });
      }
      return acc;
    }, [] as Ingredient[]);

    const mealData: Meal = {
      name: meal.name,
      date: dayjs(date).format('YYYY-MM-DD'),
      ingredients: mergedIngredients.filter((ingredient) => ingredient.id && ingredient.qty > 0),
      done:meal?.done
    };

    
    if (meal.ingredients) {
      updateMeal.mutate({
        id: meal.id,
        ...mealData,
      });
    } else {
      addMeal.mutate(mealData);
    }
    navigate('/');
  };

  return (
    <div className='flex flex-col items-center  p-2 w-4/5 mx-auto'>
      <h1 className='text-2xl font-semibold mb-4'>{`${dayjs(date).format('M월 D일 ddd요일')} ${mealTranslations[meal.name]} `}</h1>
      {ingredientList.map((ingredient, index) => (
        <div key={index} className='flex items-center mb-2 w-full'>
          <IngredientSelector ingredients={ingredients || []} selectedIngredient={ingredient.id} onIngredientChange={(e) => handleIngredientChange(e, index)} qty={ingredient.qty.toString()} onQtyChange={(e) => handleQtyChange(e, index)} index={index} />
          {index > 0 && 
          <button className="btn btn-circle ml-1 btn-error text-white" onClick={() => handleRemoveIngredient(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>  
          </button>
          }
        </div>
      ))}
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
