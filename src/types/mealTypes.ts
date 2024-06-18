import { Ingredient } from './ingredientTypes';

export interface MealItemProps {
  meal: 'breakfast' | 'lunch' | 'dinner';
  date: string;
  meals: Meal | null;
}
export interface Meal {
  id?: string;
  name: string;
  date: string;
  ingredients: Ingredient[];
}

export interface MealsByDate {
  [date: string]: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
  };
}
