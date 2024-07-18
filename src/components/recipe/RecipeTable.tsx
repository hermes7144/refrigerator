import { useNavigate } from 'react-router-dom';
import useRecipes from '../../hooks/useRecipes';
import { RecipeProps } from '../../types/RecipeTypes';
import RemoveDialog from '../ingredient/RemoveDialog';
import RecipeItem from './RecipeItem';
import { useState } from 'react';

 export default function RecipeTable() {
  const { recipesQuery: { data: recipes } ,removeRecipe } = useRecipes();
  const [visible, setVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeProps | null>(null);
  const navigate = useNavigate();

  const handleEditRecipe = (recipe: RecipeProps) => {
    navigate("/recipes/new", { state: { recipe } });
  };

  const handleDelete = () => {
    removeRecipe.mutate(editingRecipe);
    setVisible(false);
  };

  const handleDialog = (recipe:RecipeProps) => {
    setEditingRecipe(recipe);
    setVisible(true);
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };

  return (
    <div className="flex justify-center">
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-center w-1/2">Recipe</th>
          <th className="px-4 py-2 text-center w-1/2">Ingredient</th>
          <th className='w-1/4'></th>
        </tr>
      </thead>
      <tbody>
        {recipes?.map(recipe => (
          <RecipeItem 
            key={recipe.id} 
            recipe={recipe} 
            onEdit={handleEditRecipe} 
            onOpenDialog={handleDialog} 
          />
        ))}
      </tbody>
    </table>
    <RemoveDialog visible={visible} onDelete={handleDelete} onClose={handleCloseDialog} />
  </div>
  )
;
}