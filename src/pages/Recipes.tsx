import { useState } from 'react';
import RemoveDialog from '../components/ingredient/RemoveDialog';
import useRecipes from '../hooks/useRecipes';
import { Link, useNavigate } from 'react-router-dom';
import { RecipeProps } from '../types/RecipeTypes';
import Button from '../components/ui/Button';
import RecipeTable from '../components/recipe/RecipeTable';

export default function Recipes() {
  const { removeRecipe } = useRecipes();
  const [removeVisible, setRemoveVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeProps | null>(null);
  const navigate = useNavigate();

  const handleEditIngredient = (recipe: RecipeProps) => {
    navigate("/recipes/new", { state: { recipe } });
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
    <div className="container mx-auto px-4 py-8 w-full md:w-3/5">
      <div className='flex justify-center text-2xl font-bold'><h1>레시피 목록</h1></div>
      <div className="flex justify-end mb-4">
        <Link to='/recipes/new'  state={{}}>
          <Button text={'추가'} />
        </Link>
      </div>
      <RecipeTable onEdit={handleEditIngredient} onDelete={handleRemoveDialog} />
      <RemoveDialog visible={removeVisible} onSubmit={handleRemoveIngredient} onClose={handleCloseRemoveDialog} />
    </div>
  );
}