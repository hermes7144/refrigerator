import { useLocation } from 'react-router-dom';
import useIngredients from '../hooks/useIngredients';
import React, { useState, useEffect } from 'react';
import { formatDate } from '../ts/util';
import IngredientSelector from '../components/IngredientSelector';
import useMeals from '../hooks/useMeals';
import { Ingredient } from '../types/ingredientTypes';
import { MealData } from '../types/mealTypes';

export default function Meals() {
  const location = useLocation();
  const { meal, date, meals } = location.state; // meals 추가

  const {
    ingredientsQuery: { data: ingredients },
  } = useIngredients();

  const { addMeal, updateMeal } = useMeals(); // updateMeal 추가

  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]); // 초기 상태 빈 배열로 변경

  // useEffect를 사용하여 meals가 변경될 때 ingredientList를 설정
  useEffect(() => {
    if (meals) {
      // meals의 ingredients 데이터를 ingredientList로 설정

      const initialIngredients: Ingredient[] = Object.values(meals.ingredients).map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        unit: ingredient.unit,
        qty: ingredient.qty,
      }));
      setIngredientList(initialIngredients);
    } else {
      // meals가 없는 경우 기본적으로 한 개의 빈 ingredientList 설정
      setIngredientList([{ id: '', name: '', unit: '', qty: 0 }]);
    }
  }, [meals]); // meals가 변경될 때마다 useEffect 실행

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newIngredientList = [...ingredientList];
    const selectedIngredient = ingredients?.find((ingredient) => ingredient.id === e.target.value);
    if (selectedIngredient) {
      newIngredientList[index] = {
        ...newIngredientList[index],
        id: selectedIngredient.id,
        name: selectedIngredient.name,
        unit: selectedIngredient.unit,
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
    setIngredientList([...ingredientList, { id: '', name: '', unit: '', qty: 0 }]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredientList.length === 1) {
      // 최소 하나의 재료가 있어야 하므로, 한 개 이상의 재료가 있을 때만 삭제 가능하도록 설정
      return;
    }
    const newIngredientList = ingredientList.filter((_, i) => i !== index);
    setIngredientList(newIngredientList);
  };

  const handleSubmit = () => {
    const mealData: MealData = {
      name: meal,
      date: formatDate(date),
      ingredients: ingredientList.filter((ingredient) => ingredient.id && ingredient.qty > 0),
    };

    console.log(mealData);

    if (meals) {
      // meals가 있는 경우 updateMeal 호출
      updateMeal.mutate({
        id: meals.id,
        ...mealData,
      });
    } else {
      // meals가 없는 경우 addMeal 호출
      addMeal.mutate(mealData);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {`${meal} ${date}`}
      {ingredientList.map((ingredient, index) => (
        <div key={index} className='mb-2'>
          <IngredientSelector ingredients={ingredients || []} selectedIngredient={ingredient.id} onIngredientChange={(e) => handleIngredientChange(e, index)} qty={ingredient.qty.toString()} onQtyChange={(e) => handleQtyChange(e, index)} index={index} />
          {index > 0 && (
            <button className='ml-2' onClick={() => handleRemoveIngredient(index)}>
              삭제
            </button>
          )}
        </div>
      ))}
      <button className='btn' onClick={handleAddIngredient}>
        재료 추가
      </button>
      <button className='btn' onClick={handleSubmit}>
        확인
      </button>
    </div>
  );
}
