import { ChangeEvent, useDeferredValue, useState } from 'react';
import useSelection from '../hooks/useSelection';
import useIngredients from '../hooks/useIngredients';
import IngredientTable from '../components/ingredient/IngredientTable';
import CommonDialog from '../components/ingredient/CommonDialog';
import useConfirmationDialog from '../hooks/useConfirmationDialog';
import SearchInput from '../components/common/SearchInput';
import { IngredientProps } from '../types/ingredientTypes';

export default function Ingredients() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const { selectedItems, setSelectedItems, toggleSelection } = useSelection<IngredientProps>(); // 선택된 항목을 관리
  const { ingredientsQuery, deleteIngredients } = useIngredients();
  const { isVisible, action, openDialog, closeDialog, submitAction } = useConfirmationDialog<IngredientProps>(selectedItems, setSelectedItems, deleteIngredients);
  const { data: ingreidents } = ingredientsQuery || {};

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => setQuery(target.value);

  const isDisabled = !selectedItems.length;

  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      <div className='flex justify-center text-2xl font-bold'>
        <h1>재료 목록</h1>
      </div>
      <div className='flex justify-between mb-4 gap-1'>
        <SearchInput query={query} onChange={handleSearchChange} />
        <div className='flex gap-2'>
          <button className={`btn btn-outline btn-success ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => openDialog('move')}>
            담기
          </button>
          <button className={`btn btn-outline btn-error ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => openDialog('delete')}>
            삭제
          </button>
        </div>
      </div>
      <IngredientTable query={query} isStale={isStale} items={ingreidents} selectedItems={selectedItems} toggleSelection={toggleSelection} />
      <CommonDialog text={action === 'move' ? '쇼핑 목록으로 이동' : '삭제'} isVisible={isVisible} onSubmit={submitAction} onClose={closeDialog} />
    </div>
  );
}
