import { useState } from 'react';
import RemoveDialog from '../components/common/RemoveDialog';
import useRecipes from '../hooks/useRecipes';
import { RecipeProps } from '../types/RecipeTypes';
import Button from '../components/ui/Button';
import RecipeTable from '../components/recipe/RecipeTable';
import RecipeDialog from '../components/recipe/RecipeDialog';

export default function Recipes() {
  const { removeRecipe } = useRecipes();
  const [visible, setVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeProps | null>(null);

  const handleDialog = () => setVisible(true);    

  const handleCloseDialog = () => {
    setEditingRecipe(null);
    setVisible(false);
  };

  const handleEditIngredient = (recipe: RecipeProps) => {
    setEditingRecipe(recipe);
    setVisible(true);    
    };

  const handleRemoveIngredient = (): void => {
    if (!editingRecipe) return;
    removeRecipe.mutate(editingRecipe);
    setRemoveVisible(false);
  };

  const handleRemoveDialog = (recipe:RecipeProps) => {
    setEditingRecipe(recipe);
    setRemoveVisible(true);
  };

  const handleCloseRemoveDialog = () => {
    setRemoveVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full md:w-3/5 ">
      <div className='flex justify-center text-2xl font-bold'><h1>레시피 목록</h1></div>
      <div className="flex justify-end mb-4">
          <Button text={'추가'} onClick={handleDialog} />
      </div>
      <RecipeTable onEdit={handleEditIngredient} onDelete={handleRemoveDialog} />
      <RecipeDialog visible={visible} onClose={handleCloseDialog} recipe={editingRecipe} />
      <RemoveDialog removeVisible={removeVisible} onSubmit={handleRemoveIngredient} onClose={handleCloseRemoveDialog} />
    </div>
  );
}