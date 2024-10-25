import { MealTypeProps } from '../../types/mealTypes';

const mealTranslations: Record<MealTypeProps, string> = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const SkeletonMealItem = ({ mealType }: { mealType:MealTypeProps}) => (
  <div className='flex flex-col w-full px-4 py-2 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
    <div className='flex space-x-1 mb-1'>
      <h3 className='font-semibold'>{mealTranslations[mealType]}</h3>
    </div>
    <div className="flex pl-6 border-l-2 border-gray-100">
      <div className="skeleton h-4 w-40"></div>
    </div>
  </div>
);
