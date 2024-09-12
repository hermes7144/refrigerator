import { Dayjs } from 'dayjs';
import { IngredientProps } from './ingredientTypes';

export interface Meals {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
}

export interface Meal {
  id?: string;
  name: MealType;
  date: string;
  ingredients: IngredientProps[];
  done: boolean;
}

export interface MealListProps {
  week: Dayjs[];
  selectedDate: string;
  meals?: MealsByDate;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  isSkeleton?: boolean;
}

export interface MealSectionProps {
  date: Dayjs;
  meals?: Meals;
  scrollRef: (el: HTMLDivElement | null) => void;
  isSkeleton?: boolean;
  selected:boolean;
}

export interface MealsByDate {
  [date: string]: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
  };
}

export interface MealItemProps {
  meal: Meal;
  date: Dayjs;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';
