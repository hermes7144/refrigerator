import { useNavigate } from 'react-router-dom';
import { RecipeProps } from '../../types/RecipeTypes';
import RemoveDialog from '../ingredient/RemoveDialog';
// import RecipeItem from './RecipeItem';
import { useState } from 'react';
import ShoppingItem from './ShoppingItem';
import useShoppings from '../../hooks/useShoppings';

export default function ShoppingTable() {
  const {
    shoppingsQuery: { data: shoppings },
    removeRecipe,
  } = useShoppings();
  const [visible, setVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeProps | null>(null);
  const navigate = useNavigate();

  const handleEditRecipe = (recipe: RecipeProps) => {
    navigate('/shoppings/new', { state: { recipe } });
  };

  const handleDelete = () => {
    removeRecipe.mutate(editingRecipe);
    setVisible(false);
  };

  const handleDialog = (recipe: RecipeProps) => {
    setEditingRecipe(recipe);
    setVisible(true);
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };

  return (
    <div className='flex justify-center'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-center w-1/2'>Shopping List</th>
            <th className='px-4 py-2 text-center w-1/2'>Qty</th>
            <th className='w-1/4'></th>
          </tr>
        </thead>
        <tbody>
          {shoppings?.map((shopping) => (
            <ShoppingItem key={shopping.id} recipe={shopping} onEdit={handleEditRecipe} onOpenDialog={handleDialog} />
          ))}
        </tbody>
      </table>
      <RemoveDialog visible={visible} onDelete={handleDelete} onClose={handleCloseDialog} />
    </div>
  );
}
