import { Ingredient } from './ingredientTypes';

export interface MealItemProps {
  meal: string;
  date: string;
  meals: any; // 적절한 타입으로 변경 필요
}

export interface MealData {
  id?: string;
  name: string;
  date: string;
  ingredients: Ingredient[];
}
