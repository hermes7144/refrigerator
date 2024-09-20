export interface IngredientProps {
  id?: string;
  name: string;
  unit: string;
  qty: number;
  category: string;
  expiration?: string;
  image?: string;
  seq?:number;
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

export interface IngredientItemProps {
  item: IngredientProps;
  onSelect: (id: string) => void;
  isSelected: boolean;
}
