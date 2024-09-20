import { FC, useState } from 'react';
import { MealSection } from './MealSection';
import {  MealProps, MealListProps } from '../../types/mealTypes';
import useMeals from '../../hooks/useMeals';

export const MealList: FC<MealListProps> = ({ week, selectedDate, scrollRefs }) => {
  const { mealsQuery: { data: meals }, addMeal } = useMeals();
  const [copy, setCopy] = useState<MealProps| null>();
  const handleCopy = (meal:MealProps) => {
    setCopy(meal);
  };

  const handlePaste = (meal : MealProps) => {
    if (!copy) return;

    addMeal.mutate({...meal, ingredients:copy.ingredients});
  };

  const handleCancelCopy = () => {
    setCopy(null); // 복사 모드 취소
  };

  return (
    <>
      <ul className='flex flex-col w-full md:w-[500px] gap-4 pb-60 mt-20'>
        {week.map((date) => 
          <MealSection
          key={date}
          date={date}
          meals={meals?.[date]}
          scrollRef={(el) => (scrollRefs.current[date] = el)}
          selected={selectedDate === date}
          copy={copy}
          onCopy={handleCopy}
          onPaste={handlePaste}
          onCancelCopy={handleCancelCopy}
          />)}
      </ul>
    </>
  );
};
