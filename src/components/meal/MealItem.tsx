import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps, MealTypeProps } from '../../types/mealTypes';
import MealIngredientsList from './MealIngredientsList';
import MealCheckbox from './MealCheckbox';
import { MealImage } from './MealImage';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import useMeals from '../../hooks/useMeals';
import { useCopyContext } from '../../context/CopyContext';
import { EmptyMealItem } from './EmptyMealItem';
import IconButton from '../common/IconButton';
import useIngredients from '../../hooks/useIngredients';
import { FaRegTrashAlt } from '@react-icons/all-files/fa/FaRegTrashAlt';

const mealTranslations: Record<MealTypeProps, string> = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const MealItem: React.FC<MealItemProps> = ({ date, mealType }) => {
  const { updateIngredientsQty } = useIngredients();
  const { GetMeal, addMeal, removeMeal } = useMeals();
  const { data: meal } = GetMeal(date, mealType);
  const { copy, setCopy } = useCopyContext(); // copy 상태와 setCopy 함수 사용

  if (!meal) return <EmptyMealItem meal={{ date, mealType, done:false }} />;
  
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }
  const handleCopy = () => setCopy(meal);


  const handlePaste = () => {
    if (!copy) return;

    if (copy.isDiningOut) {
      // 외식일 경우
      addMeal.mutate({
        ...meal,
        ingredients: [], // 외식이므로 재료는 없음
        isDiningOut: true,
        diningOutMenu: copy.diningOutMenu ?? '' // 외식 메뉴 복사
      });
    } else {
      // 일반 식사의 경우
      addMeal.mutate({
        ...meal,
        ingredients: copy.ingredients, // 재료 복사
        isDiningOut: false,
        diningOutMenu: '' // 외식이 아니므로 빈 문자열
      });
    }

  };

  
  const handleRemove = () => {
    if (meal.done) updateIngredientsQty.mutate({ingredients: meal.ingredients, isAdding: true});
    removeMeal.mutate(meal);
  };

  const renderButtons = () => {
    if (!copy) {
      return (
        <>
          <IconButton onClick={handleCopy} tooltip="복사">
            <FaRegCopy className="w-4 h-4 text-gray-600" />
          </IconButton>
          <IconButton onClick={handleRemove} tooltip="삭제">
            <FaRegTrashAlt className="w-4 h-4 text-gray-600" />
          </IconButton>
        </>
      );
    } else {
      return (
        <IconButton onClick={handlePaste} tooltip="복사 적용">
          <FaCheck className="w-4 h-4 text-gray-600" />
        </IconButton>
      );
    }
  };



  const mealTypeText = mealTranslations[meal.mealType] || meal.mealType;
  const isCopyMeal = meal === copy;
  const Container = copy ? 'div' : Link;

  return (
    <Container to="/meals" state={{ meal }}
      className={`bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 border border-gray-200 ${isCopyMeal ? 'bg-blue-100' : ''}`}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-start space-x-1">
          <MealCheckbox meal={meal} />
          <MealImage meal={meal} />
          <h3 className="font-semibold tracking-tight">{mealTypeText}</h3>
        </div>
        <div className="flex items-center space-x-2" onClick={handleStopPropagation}>
          {!isCopyMeal && renderButtons()}
        </div>
      </div>

      {meal.isDiningOut ? <span className='text-gray-600 text-sm'>외식: {meal.diningOutMenu}</span> : <MealIngredientsList ingredients={meal.ingredients} /> }
    </Container>
  );
};