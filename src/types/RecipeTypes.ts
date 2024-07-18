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
  onOpenDialog: (recipe: RecipeProps) => void;
}

export interface RemoveDialogProps  {
  visible:boolean;
  onDelete: () => void;
  onClose: () => void;
}