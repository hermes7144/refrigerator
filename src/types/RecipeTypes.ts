import { Ingredient } from './ingredientTypes';

export interface Recipe {
  id?: string;
  name: string;
  ingredients: Ingredient[];
  image?:string;
}

export interface RecipeItemProps {
  recipe:Recipe;
  onEdit: (recipe:Recipe) => void;
  onDelete: (recipe:Recipe) => void;
}