export interface IngredientProps {
  id: string;
  name: string;
  unit: string;
  qty: number;
  category: string;
  expiration: string;
}

export interface IngredientTableProps {
  query: string;
  isStale: boolean;
  items?: IngredientProps[];
  selectedItems: IngredientProps[];
  toggleSelection: (item: IngredientProps) => void;
}
export interface RemoveIngredientsParams {
  action: string;
  selectedItems: IngredientProps[];
}
