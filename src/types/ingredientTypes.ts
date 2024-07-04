export interface Ingredient {
  id: string;
  name: string;
  qty: number;
  unit: string;
  category: string;
  image?: string;
  expiration?: string;
}

export interface DialogAddIngredientProps {
  onSubmit: (ingredient: Ingredient) => void;
  onClose: () => void;
  visible: boolean;
  initialIngredient?: Ingredient | null;
}

export interface IngredientItemProps {
  ingredient: Ingredient;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (ingredient: Ingredient) => void;
}
