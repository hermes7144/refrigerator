import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { MealImage } from './MealImage';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { EmptyMealProps } from '../../types/mealTypes';
import { useCopyContext } from '../../context/CopyContext';
import useMeals from '../../hooks/useMeals';

const mealTranslations = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const EmptyMealItem: React.FC<{meal: EmptyMealProps}> = ({ meal}) => {
  const { copy } = useCopyContext(); // copy 상태와 setCopy 함수 사용
  const { addMeal } = useMeals();

const handlePaste = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
  }

  const Container = copy ? 'div' : Link;

  return (
    <Container to='/meals' state={{ meal }} className='flex flex-col w-full px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <div className='flex justify-between min-h-8'>
      <div className='flex space-x-1'>
        <MealImage meal={meal} />
        <h3 className='font-semibold'>{mealTranslations[meal.mealType as keyof typeof mealTranslations]}</h3>
      </div>
      {copy && (
        <div className="tooltip" data-tip="복사 적용">
          <button
            className='btn btn-circle btn-ghost btn-sm p-2 hover:bg-slate-200 transition-colors duration-200 flex items-center justify-center'
            onClick={handlePaste}
          >
            <FaCheck className='w-10 h-4 text-gray-600' />
          </button>
        </div>
      )}
    </div>

    <div className='pl-6 text-gray-400'>식단을 등록해주세요</div>
  </Container>
  )
}

