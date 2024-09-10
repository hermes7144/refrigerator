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
  const { data: ingredients } = ingredientsQuery || {};

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => setQuery(target.value);

  const isDisabled = !selectedItems.length;

  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      {/* 상단 영역을 fixed로 설정 */}
      <div className='fixed top-[64px] left-0 right-0 bg-white z-10 p-4 w-full md:w-3/5 mx-auto'>
        {/* 네비바 높이를 고려한 top 설정 */}
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
      </div>

      {/* 테이블과 나머지 콘텐츠 */}
      <div className='mt-[160px]'>
        {' '}
        {/* 상단 고정 요소 아래에 여유 공간 확보 */}
        <IngredientTable query={query} isStale={isStale} items={ingredients} selectedItems={selectedItems} toggleSelection={toggleSelection} />
        <CommonDialog text={action === 'move' ? '쇼핑 목록으로 이동' : '삭제'} isVisible={isVisible} onSubmit={submitAction} onClose={closeDialog} />
      </div>
    </div>
  );
}
