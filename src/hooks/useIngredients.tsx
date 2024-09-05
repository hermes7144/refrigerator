import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthContext from '../context/AuthContext';
import { addNewIngredient, editIngredient, editShopping, getIngredients, removeIngredient, updateIngredientQuantity } from '../api/firebase';
import { IngredientProps } from '../types/ingredientTypes';

export default function useIngredients() {
  const { uid } = useAuthContext() ?? {};

  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();
  const ingredientsQuery = useQuery({ queryKey: ['ingredients', uid], queryFn: () => getIngredients(uid) });

  const addIngredient = useMutation({
    mutationFn: (ingredient: IngredientProps) => addNewIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients', uid] }),
  });

  const updateIngredient = useMutation({
    mutationFn: (ingredient: IngredientProps) => editIngredient(uid, ingredient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients', uid] }),
  });

  const updateIngredientQty = useMutation({
    mutationFn: ({ ingredientId, quantityChange }: { ingredientId: string; quantityChange: number }) => updateIngredientQuantity(uid, ingredientId, quantityChange),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredients', uid] }),
  });

  const deleteIngredients = useMutation({
    mutationFn: async ({ action, selectedItems }: { action: string; selectedItems: IngredientProps[] }) => {
      const promises = selectedItems.map(async (ingredient) => {
        if (action === 'delete') {
          await removeIngredient(uid, ingredient);
        } else if (action === 'move') {
          // await removeIngredient(uid, ingredient);
          await editShopping(uid, { ...ingredient, qty: 0, expiration: '' });
        }
      });
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients', uid] });
      queryClient.invalidateQueries({ queryKey: ['shoppings', uid] });
    },
  });

  return { ingredientsQuery, addIngredient, updateIngredient, updateIngredientQty, deleteIngredients };
}
