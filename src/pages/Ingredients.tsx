import { ChangeEvent, useState } from 'react';
import useIngredients from '../hooks/useIngredients';
import { IngredientProps } from '../types/ingredientTypes';
import RemoveDialog from '../components/ingredient/RemoveDialog';
import IngredientsSearch from '../components/ingredient/IngredientsSearch';
import IngredientTable from '../components/ingredient/IngredientTable';
import IngredientDialog from '../components/ingredient/IngredientDialog';

export default function Ingredients() {
  const { deleteIngredient } = useIngredients();
  const [query, setQuery] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [removeDialogVisible, setRemoveDialogVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<IngredientProps | null>(null);

  const handleOpenDialog = () => setDialogVisible(true);
  const handleCloseDialog = () => {
    setCurrentIngredient(null);
    setDialogVisible(false);
  };

  const handleEditIngredient = (ingredient: IngredientProps) => {
    setCurrentIngredient(ingredient);
    setDialogVisible(true);    
  };

  const handleRemoveIngredient = (): void => {
    if (currentIngredient) {
      deleteIngredient.mutate(currentIngredient);
      setRemoveDialogVisible(false);
    }
  };

  const handleOpenRemoveDialog = (ingredient: IngredientProps) => {
    setCurrentIngredient(ingredient);
    setRemoveDialogVisible(true);
  };

  const handleCloseRemoveDialog = () => setRemoveDialogVisible(false);
  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => setQuery(target.value);

  return (
    <div className="container mx-auto px-4 py-8 w-full md:w-3/5">
      <div className='flex justify-center text-2xl font-bold'><h1>재료 목록</h1></div>
      <div className="flex justify-between mb-4">
        <IngredientsSearch query={query} onChange={handleSearchChange} />
        <button className='btn bg-brand text-white' onClick={handleOpenDialog}>추가</button>
      </div>
      <IngredientTable query={query} onEdit={handleEditIngredient} onDelete={handleOpenRemoveDialog} />
      <IngredientDialog visible={dialogVisible} onClose={handleCloseDialog} initialIngredient={currentIngredient} />
      <RemoveDialog visible={removeDialogVisible} onDelete={handleRemoveIngredient} onClose={handleCloseRemoveDialog} />
    </div>
  );
}