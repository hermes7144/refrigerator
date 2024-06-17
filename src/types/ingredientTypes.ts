export interface Ingredient {
  id?: string;
  name: string | undefined;
  qty: number;
  unit?: string | undefined;
  category?: string | undefined;
  image?: string;
  expiration?: string;
}
