import  { Dayjs } from 'dayjs';
import { Ingredient } from './ingredientTypes';

export interface Meals {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
}

export interface Meal {
  id?: string;
  name: MealType;
  date: string;
  ingredients: Ingredient[];
  done: boolean;
}

export interface MealListProps {
  week: Dayjs[];
  selectedDate: string;
  meals?: MealsByDate ;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  isSkeleton?:boolean;
}


export interface MealSectionProps {
  date: string;
  weekday: Dayjs;
  meals?: Meals;
  scrollRef: (el: HTMLDivElement | null) => void;
  isSkeleton?:boolean;
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
