import { useState } from 'react';
import useIngredients from '../hooks/useIngredients';
import  IngredientItem  from '../components/ingredient/IngredientItem';
import DialogAddIngredient from '../components/ingredient/DialogAddIngredient';
import { Ingredient } from '../types/ingredientTypes';
import RemoveDialog from '../components/ingredient/RemoveDialog';

export default function Ingredients() {
  const { ingredientsQuery: { data: ingredients }, addIngredient, updateIngredient, deleteIngredient } = useIngredients();
  

  const [visible, setVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

  const handleAddIngredient = (ingredient: Ingredient) => {
    if (ingredient.id) {
      updateIngredient.mutate(ingredient);
    } else {
      addIngredient.mutate(ingredient);
    }
  };

  const handleDialog = () => {
    setVisible(true);    
  };

  const handleCloseDialog = () => {
    setEditingIngredient(null);
    setVisible(false);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setVisible(true);    
  };

  const handleRemoveIngredient = (): void => {
    if (!editingIngredient) return;
    deleteIngredient.mutate(editingIngredient);
    setRemoveVisible(false); // RemoveDialog를 닫습니다.
  };

  const handleRemoveDialog = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setRemoveVisible(true);
  };

  const handleCloseRemoveDialog = () => {
    setRemoveVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleDialog}
        >
          추가
        </button>
      </div>
      <DialogAddIngredient visible={visible} onSubmit={handleAddIngredient} onClose={handleCloseDialog} initialIngredient={editingIngredient} />
      <RemoveDialog removeVisible={removeVisible} onSubmit={handleRemoveIngredient} onClose={handleCloseRemoveDialog} />
      <div className="flex justify-center">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-center">Ingredient</th>
              <th className="px-4 py-2 text-center">Qty</th>
              <th className="px-4 py-2 text-center">Expiration</th>
              <th className="px-4 py-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {ingredients?.map(ingredient => (
              <IngredientItem 
                key={ingredient?.id} 
                ingredient={ingredient} 
                onEdit={handleEditIngredient} 
                onDelete={handleRemoveDialog} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}