import { Link } from 'react-router-dom';
import CommonDialog from '../components/ingredient/CommonDialog';
import useShoppings from '../hooks/useShoppings';
import IngredientTable from '../components/ingredient/IngredientTable';
import { ChangeEvent, useDeferredValue, useState } from 'react';
import SearchInput from '../components/common/SearchInput';
import useSelection from '../hooks/useSelection';
import useConfirmationDialog from '../hooks/useConfirmationDialog';

export default function Shoppings() {
  const { selectedItems, toggleSelection } = useSelection(); // 선택된 항목을 관리
  const { shoppingsQuery, bulkUpdateShoppings } = useShoppings();
  const { isVisible, action, openDialog, closeDialog, submitAction } = useConfirmationDialog(selectedItems, bulkUpdateShoppings);
  const { data: shoppings } = shoppingsQuery || {};

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => setQuery(target.value);

  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      <div className='flex justify-center text-2xl font-bold mb-4'>
        <h1>쇼핑 목록</h1>
      </div>
      <div className='flex justify-between mb-4'>
        <div className='flex gap-1'>
          <SearchInput query={query} onChange={handleSearchChange} />
          <Link to='/shoppings/new' className='btn btn-outline btn-primary'>
            추가
          </Link>
        </div>
        <div className='flex gap-2'>
          <button className='btn btn-outline btn-success' onClick={() => openDialog('moveToCart')}>
            장바구니
          </button>
          <button className='btn btn-outline btn-error' onClick={() => openDialog('delete')}>
            삭제
          </button>
        </div>
      </div>
      <IngredientTable query={query} isStale={isStale} items={shoppings} selectedItems={selectedItems} toggleSelection={toggleSelection} />
      <CommonDialog text={action === 'moveToCart' ? '재료로 이동' : '삭제'} isVisible={isVisible} onSubmit={submitAction} onClose={closeDialog} />
    </div>
  );
}
