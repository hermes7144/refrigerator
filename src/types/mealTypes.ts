import  { Dayjs } from 'dayjs';
import { Ingredient } from './ingredientTypes';

export interface Meal {
  id?: string;
  name: string;
  date: string;
  ingredients: Ingredient[];
  done: boolean;
}

export interface MealListProps {
  week: Dayjs[];
  selectedDate: string;
  meals?: MealsByDate ;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}


export interface MealSectionProps {
  date: string;
  weekday: Dayjs;
  meals?: MealsByDate2;
  scrollRef: (el: HTMLDivElement | null) => void;
}

export interface MealsByDate {
  [date: string]: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
  };
}

export interface MealsByDate2 {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
}

export interface MealItemProps {
  meal: MealType;
  date: Dayjs;
  meals: Meal ;
  done?: boolean;
}


export type MealType = 'breakfast' | 'lunch' | 'dinner';
