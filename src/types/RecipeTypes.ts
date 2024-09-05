import { IngredientProps } from './ingredientTypes';

export interface RecipeProps {
  id: string;
  name: string;
  ingredients: IngredientProps[];
  image?: string;
}

export interface RecipeItemProps {
  recipe: RecipeProps;
  onEdit: (recipe: RecipeProps) => void;
  onOpenDialog: (recipe: RecipeProps) => void;
}

export interface CommonDialogProps {
  text: string;
  isVisible: boolean;
  onSubmit: () => void;
  onClose: () => void;
}
