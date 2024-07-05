import { Ingredient } from './ingredientTypes';

export interface Recipe {
  id?: string;
  name: string;
  ingredients: Ingredient[];
}