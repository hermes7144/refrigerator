import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps } from '../../types/mealTypes';
import { MealIngredientsList } from './MealIngredientsList';
import { RemoveMealButton } from './RemoveMealButton';
import { MealCheckbox } from './MealCheckbox';
import { MealImage } from './MealImage';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import useMeals from '../../hooks/useMeals';
import { useCopyContext } from '../../context/CopyContext';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const {  addMeal } = useMeals();
  const { copy, setCopy } = useCopyContext(); // copy 상태와 setCopy 함수 사용


  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleCopy = () => {
    setCopy(meal);
  };

  const handlePaste = () => {
    if (!copy) return;
    // 외식인 경우 diningOutMenu 복사, 아니면 ingredients 복사
    
    addMeal.mutate({
      ...meal,
      ingredients: copy.isDiningOut ? [] : copy.ingredients, // 외식일 경우 빈 배열
      isDiningOut: !!copy.isDiningOut,
      diningOutMenu: copy.isDiningOut ? copy.diningOutMenu : '', // 외식일 경우 diningOutMenu 복사
    });
  };

  const mealType = mealTranslations[meal.mealType] || meal.mealType;
  const isCopyMeal = meal === copy;
  const Container = copy ? 'div' : Link;

  return (
    <Container to={'/meals'} state={{ meal }} className={`bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 border border-gray-200 ${isCopyMeal ? 'bg-blue-100' : ''}`}>
      <div className='flex justify-between items-center mb-1'>
        <div className='flex items-start space-x-1'>
          <MealCheckbox meal={meal} />
          <MealImage meal={meal} />
          <h3 className='font-semibold tracking-tight'>{mealType}</h3>
        </div>

        {isCopyMeal ? (
          ''
        ) : (
          <div className='flex items-center space-x-2' onClick={handleStopPropagation}>
            {!copy && 
            <div className="tooltip" data-tip="복사">
                <button className='btn btn-circle btn-ghost btn-sm hover:bg-slate-200' onClick={handleCopy}>
                  <FaRegCopy className='w-4 h-4 text-gray-600' />
                </button>
            </div>
            }
            {copy && 
              <div className="tooltip" data-tip="복사 적용">
                <button className='btn btn-circle btn-ghost btn-sm p-2 hover:bg-slate-200 transition-colors duration-200 flex items-center justify-center' onClick={handlePaste}>
                  <FaCheck className='w-4 h-4 text-gray-600' />
                </button>
              </div>
            }
            {!copy &&
              <div className="tooltip" data-tip="삭제">
                <RemoveMealButton meal={meal} />
              </div>}
          </div>
        )}
      </div>

      {/* 외식 여부에 따른 조건부 렌더링 */}
      {meal.isDiningOut ? (
        <div className='text-gray-600 text-sm'>
          <span>외식: {meal.diningOutMenu}</span>
        </div>
      ) : (
        <MealIngredientsList ingredients={meal.ingredients} />
      )}
    </Container>
  );
};
