import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthContext from '../context/AuthContext';
import { getShoppings, addNewShopping, editShopping, removeShopping, editIngredient, getIngredient, addNewIngredient } from '../api/firebase';
import { IngredientProps } from '../types/ingredientTypes';

export default function useShoppings() {
  const { uid } = useAuthContext();
  if (!uid) throw new Error('User is not authenticated');
  
  const queryClient = useQueryClient();
  const shoppingsQuery = useQuery({ queryKey: ['shoppings', uid], queryFn: () => getShoppings(uid) });

  const addShopping = useMutation({
    mutationFn: (shopping: IngredientProps) => addNewShopping(uid, shopping),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shoppings', uid] }),
  });

  const updateShopping = useMutation({
    mutationFn: (shopping: IngredientProps) => editShopping(uid, shopping),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shoppings', uid] }),
  });

  const deleteShopping = useMutation({
    mutationFn: (shopping: IngredientProps) => removeShopping(uid, shopping),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shoppings', uid] }),
  });

  const bulkUpdateShoppings = useMutation({
    mutationFn: async ({ action, selectedItems }: { action: string; selectedItems: IngredientProps[] }) => {
      const promises = selectedItems.map(async (shopping) => {
        if (action === 'delete') {
          await removeShopping(uid, shopping);
        } else if (action === 'move') {
          await removeShopping(uid, shopping);

          const ingredient = await getIngredient(uid, shopping);
          console.log(ingredient);

          if (ingredient !== null) {
            await editIngredient(uid, { ...shopping, qty: ingredient.qty + shopping.qty });
          } else {
            await addNewIngredient(uid, shopping);
          }
        }
      });
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients', uid] });
      queryClient.invalidateQueries({ queryKey: ['shoppings', uid] });
    },
  });

  return { shoppingsQuery, addShopping, updateShopping, deleteShopping, bulkUpdateShoppings };
}
