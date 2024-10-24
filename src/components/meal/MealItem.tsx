import React from 'react';
import { Link } from 'react-router-dom';
import { MealItemProps, MealTypeProps } from '../../types/mealTypes';
import MealIngredientsList from './MealIngredientsList';
import { RemoveMealButton } from './RemoveMealButton';
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
  const { GetMeal, addMeal, removeMeal } = useMeals();
  const { updateIngredientQty } = useIngredients();
  const { copy, setCopy } = useCopyContext(); // copy 상태와 setCopy 함수 사용

  const { data: meal } = GetMeal(date, mealType);

  if (!meal) {
    return <EmptyMealItem meal={{ date, mealType }} />;
  }

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

  const mealTypeText = mealTranslations[meal.mealType] || meal.mealType;
  const isCopyMeal = meal === copy;
  const Container = copy ? 'div' : Link;


  const handleRemove = () => {
    if (meal.done) {
      meal.ingredients.forEach((ingredient) => {
        updateIngredientQty.mutate(ingredient);
      });
    }
    removeMeal.mutate(meal);
  };


  return (
    <Container to={'/meals'} state={{ meal }} className={`bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 border border-gray-200 ${isCopyMeal ? 'bg-blue-100' : ''}`}>
      <div className='flex justify-between items-center mb-1'>
        <div className='flex items-start space-x-1'>
          <MealCheckbox meal={meal} />
          <MealImage meal={meal} />
          <h3 className='font-semibold tracking-tight'>{mealTypeText}</h3>
        </div>

        {/* 버튼 렌더링 로직 */}
        <div className='flex items-center space-x-2' onClick={handleStopPropagation}>
          {!isCopyMeal && (
            <>
              {!copy ? (
                <>
                  <IconButton onClick={handleCopy} tooltip='복사'>
                    <FaRegCopy className='w-4 h-4 text-gray-600' /> 
                  </IconButton>
                  <IconButton onClick={handleRemove} tooltip='삭제'>
                    <FaRegTrashAlt className='w-4 h-4 text-gray-600' /> 
                  </IconButton>
                </>
              ) : 
                (
                  <IconButton onClick={handlePaste} tooltip='복사 적용'>
                  <FaCheck className='w-4 h-4 text-gray-600' /> 
                </IconButton>
                )
              }
            </>
          )}
        </div>
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
