import { IngredientProps } from './ingredientTypes';

export interface MealsProps {
  breakfast?: MealProps;
  lunch?: MealProps;
  dinner?: MealProps;
}

export interface MealProps {
  id: string;
  mealType: MealTypeProps;
  date: string;
  ingredients: IngredientProps[];
  done: boolean;
  isDiningOut?:boolean;
  diningOutMenu?:string;
}

export interface EmptyMealProps {
  mealType: MealTypeProps;
  date: string;
  done?:boolean;
}

export interface MealListProps {
  week: string[];
  selectedDate: string;
  meals?: MealsByDate;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  isSkeleton?: boolean;
}

export interface MealSectionProps {
  date: string;
  meals?: MealsProps;
  scrollRef: (el: HTMLDivElement | null) => void;
  isSkeleton?: boolean;
  selected:boolean;
}

export interface MealsByDate {
  [date: string]: {
    breakfast?: MealProps;
    lunch?: MealProps;
    dinner?: MealProps;
  };
}

export interface MealItemProps {
  meal: MealProps;
}

export type MealTypeProps = 'breakfast' | 'lunch' | 'dinner';
