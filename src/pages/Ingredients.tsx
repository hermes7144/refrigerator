import { ChangeEvent, useDeferredValue, useState } from 'react';
import useSelection from '../hooks/useSelection';
import useIngredients from '../hooks/useIngredients';
import IngredientTable from '../components/ingredient/IngredientTable';
import CommonDialog from '../components/ingredient/CommonDialog';
import useConfirmationDialog from '../hooks/useConfirmationDialog';
import SearchInput from '../components/common/SearchInput';
import { IngredientProps } from '../types/ingredientTypes';
import useUpdateStatus from '../context/UpdateContext';

export default function Ingredients() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const { hasUpdated, setHasUpdated } = useUpdateStatus(); // Context에서 상태 가져오기


  const { selectedItems, setSelectedItems, toggleSelection } = useSelection<IngredientProps>(); // 선택된 항목을 관리
  const { ingredientsQuery, deleteIngredients, invalidIngredients } = useIngredients();
  const { isVisible, action, openDialog, closeDialog, submitAction } = useConfirmationDialog<IngredientProps>(selectedItems, setSelectedItems, deleteIngredients);
  const { data: ingredients } = ingredientsQuery || {};

  // 데이터 갱신 후 쿼리 무효화
  if (ingredientsQuery.isSuccess && hasUpdated) {
     invalidIngredients();
     setHasUpdated(false);
  }


  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => setQuery(target.value);

  const isDisabled = !selectedItems.length;

  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      <div className='fixed top-[64px] left-0 right-0 bg-white z-10 px-4 pt-4 w-full md:w-3/5 mx-auto'>
        <div className='flex justify-center text-2xl font-bold mb-4'>
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
      </div>
      <div className='mt-24'>
        <IngredientTable query={query} isStale={isStale} items={ingredients} selectedItems={selectedItems} toggleSelection={toggleSelection} />
        <CommonDialog text={action === 'move' ? '쇼핑 목록으로 이동' : '삭제'} isVisible={isVisible} onSubmit={submitAction} onClose={closeDialog} />
      </div>
    </div>
  );
}
