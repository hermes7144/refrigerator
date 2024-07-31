export interface IngredientProps {
  id?: string;
  name: string;
  qty?: number;
  unit: string;
  category: string;
  image?: string;
  expiration: string | null;
}

export interface IngredientDialogProps {
  onClose: () => void;
  visible: boolean;
  initialIngredient: IngredientProps | null;
}

export interface IngredientTableProps {
  query: string;
  isStale: boolean;
  onEdit: (ingredient: IngredientProps) => void;
  onDelete: (ingredient: IngredientProps) => void;
}

export interface IngredientItemProps {
  ingredient: IngredientProps;
  onEdit: (ingredient: IngredientProps) => void;
  onDelete: (ingredient: IngredientProps) => void;
}
