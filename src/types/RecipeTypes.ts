import { IngredientProps } from './ingredientTypes';

export interface RecipeProps {
  id?: string;
  name: string;
  ingredients: IngredientProps[];
  image?:string;
}

export interface RecipeItemProps {
  recipe: RecipeProps;
  onEdit: (recipe: RecipeProps) => void;
  onDelete: (recipe: RecipeProps) => void;
}