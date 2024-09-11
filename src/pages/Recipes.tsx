import CommonDialog from '../components/ingredient/CommonDialog';
import RecipeTable from '../components/recipe/RecipeTable';
import useConfirmationDialog from '../hooks/useConfirmationDialog';
import useRecipes from '../hooks/useRecipes';
import useSelection from '../hooks/useSelection';
import { RecipeProps } from '../types/RecipeTypes';

export default function Recipes() {
  const { selectedItems, setSelectedItems, toggleSelection } = useSelection<RecipeProps>(); // 선택된 항목을 관리
  const { recipesQuery, removeRecipes } = useRecipes();
  const { data: shoppings } = recipesQuery;

  const { isVisible, openDialog, closeDialog, submitAction } = useConfirmationDialog<RecipeProps>(selectedItems, setSelectedItems, removeRecipes);

  const isDisabled = !selectedItems.length;

  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      <div className='flex justify-center text-2xl font-bold'>
        <h1>레시피 목록</h1>
      </div>
      <div className='flex justify-end mb-4'>
        <button className={`btn btn-outline btn-error ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => openDialog('delete')}>
          삭제
        </button>
      </div>
      <RecipeTable items={shoppings} selectedItems={selectedItems} toggleSelection={toggleSelection} />
      <CommonDialog text={'삭제'} isVisible={isVisible} onSubmit={submitAction} onClose={closeDialog} />
    </div>
  );
}
