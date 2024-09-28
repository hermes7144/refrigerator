import { IngredientProps } from './ingredientTypes';

export interface RecipeProps {
  id: string;
  name: string;
  ingredients: IngredientProps[];
  image?: string;
}

export interface RecipeItemProps {
  item: RecipeProps;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export interface RecipeTableProps {
  query: string;
  isStale: boolean;
  items?: RecipeProps[];
  selectedItems: RecipeProps[];
  toggleSelection: (item: RecipeProps) => void;
}

export interface CommonDialogProps {
  text: string;
  isVisible: boolean;
  onSubmit: () => void;
  onClose: () => void;
}
