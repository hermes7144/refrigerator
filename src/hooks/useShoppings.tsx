import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthContext from '../context/AuthContext';
import { getShoppings, addNewShopping, editShopping, removeShopping } from '../api/firebase';
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

  // const updateShoppingQty = useMutation({
  //   mutationFn: ({ ShoppingId, quantityChange }: { ShoppingId: string; quantityChange: number }) => updateShoppingQuantity(uid, ShoppingId, quantityChange),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Shoppings', uid] }),
  // });

  return { shoppingsQuery, addShopping, updateShopping, deleteShopping };
}
