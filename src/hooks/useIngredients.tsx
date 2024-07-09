import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addNewIngredient, editIngredient, getIngredients, removeIngredient, updateIngredientQuantity } from '../api/firebase';
import { Ingredient } from '../types/ingredientTypes';

export default function useIngredients() {
  const authContext = useAuthContext();

  if (!authContext || !authContext.uid) {
    throw new Error('User is not authenticated');
  }

  const { uid } = authContext;

  const queryClient = useQueryClient();
  const ingredientsQuery = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => getIngredients(uid),
  });

  const addIngredient = useMutation({
    mutationFn: (ingredient: Ingredient) => addNewIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients'] }),
  });

  const updateIngredient = useMutation({
    mutationFn: (ingredient: Ingredient) => editIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients'] }),
  });

  const deleteIngredient = useMutation({
    mutationFn: (ingredient: Ingredient) => removeIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients'] }),
  });

  const updateIngredientQty = useMutation({
    mutationFn: ({ ingredientId, quantityChange }: { ingredientId: string; quantityChange: number }) => updateIngredientQuantity(uid, ingredientId, quantityChange),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients'] }),
  });

  return { ingredientsQuery, addIngredient, updateIngredient, deleteIngredient, updateIngredientQty };
}
