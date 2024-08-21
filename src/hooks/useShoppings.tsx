import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthContext from '../context/AuthContext';
import { getShoppings, addNewShopping, editShopping, removeShopping, editIngredient } from '../api/firebase';
import { ShoppingProps } from '../types/ShoppingTypes';

export default function useShoppings() {
  const { uid } = useAuthContext() ?? {};

  if (!uid) {
    throw new Error('User is not authenticated');
  }

  const queryClient = useQueryClient();
  const shoppingsQuery = useQuery({ queryKey: ['shoppings', uid], queryFn: () => getShoppings(uid) });

  const addShopping = useMutation({
    mutationFn: (shopping: ShoppingProps) => addNewShopping(uid, shopping),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shoppings', uid] }),
  });

  const updateShopping = useMutation({
    mutationFn: (shopping: ShoppingProps) => editShopping(uid, shopping),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shoppings', uid] }),
  });

  const deleteShopping = useMutation({
    mutationFn: (shopping: ShoppingProps) => removeShopping(uid, shopping),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shoppings', uid] }),
  });

  // New mutation for bulk updating shopping items (moving to cart or deleting)
  const bulkUpdateShoppings = useMutation({
    mutationFn: async ({ action, selectedItems }) => {
      const promises = selectedItems.map(async (shopping) => {
        console.log(selectedItems);

        if (action === 'delete') {
          await removeShopping(uid, shopping);
        } else if (action === 'moveToCart') {
          await removeShopping(uid, shopping);
          await editIngredient(uid, shopping);
        }
      });
      return Promise.all(promises);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shoppings', uid] }),
  });

  return { shoppingsQuery, addShopping, updateShopping, deleteShopping, bulkUpdateShoppings };
}
