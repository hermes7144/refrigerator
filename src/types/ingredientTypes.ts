export interface IngredientProps {
  id: string;
  name: string;
  unit: string;
  qty: number;
  category: string;
  expiration: string;
}

export interface IngredientTableProps {
  items: IngredientProps[];
  selectedItems: IngredientProps[];
  toggleSelection: (item: IngredientProps) => void;
}

export interface IngredientDialogProps {
  onClose: () => void;
  visible: boolean;
  initialIngredient: IngredientProps | null;
}

// export interface IngredientTableProps {
//   query: string;
//   isStale: boolean;
//   onEdit: (ingredient: IngredientProps) => void;
//   onDelete: (ingredient: IngredientProps) => void;
// }

export interface IngredientItemProps {
  ingredient: IngredientProps;
  onEdit: (ingredient: IngredientProps) => void;
  onDelete: (ingredient: IngredientProps) => void;
}
