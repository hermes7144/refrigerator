import { Link } from 'react-router-dom';
import ShoppingTable from '../components/shopping/ShoppingTable';
import useShoppings from '../hooks/useShoppings';
import { useState } from 'react';
import CommonDialog from '../components/ingredient/CommonDialog';

export default function Shoppings() {
  const { bulkUpdateShoppings } = useShoppings();
  const [selectedItems, setSelectedItems] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogAction, setDialogAction] = useState(null); // 새로 추가된 상태

  const handleOpenDialog = (action) => {
    // TODO select 안됐을 시 선택 Toast

    if (selectedItems.length === 0) return;

    setDialogAction(action); // 작업을 설정
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
    setDialogAction(null); // 작업 상태 초기화
  };

  const handleSubmit = () => {
    if (!dialogAction) return;

    bulkUpdateShoppings.mutate({
      action: dialogAction,
      selectedItems,
    });

    setSelectedItems([]);
    handleCloseDialog(); // 다이얼로그 닫기
  };

  return (
    <div className='container mx-auto px-4 py-8 w-full md:w-3/5'>
      <div className='flex justify-center text-2xl font-bold mb-4'>
        <h1>쇼핑 목록</h1>
      </div>
      <div className='flex justify-between mb-4'>
        <Link to='/shoppings/new' className='btn btn-outline btn-primary'>
          추가
        </Link>
        <div className='flex gap-2'>
          <button
            className='btn btn-outline btn-success'
            onClick={() => handleOpenDialog('moveToCart')} // 다이얼로그 열기
          >
            장바구니
          </button>
          <button
            className='btn btn-outline btn-error'
            onClick={() => handleOpenDialog('delete')} // 다이얼로그 열기
          >
            삭제
          </button>
        </div>
      </div>
      <ShoppingTable setSelectedItems={setSelectedItems} />
      <CommonDialog text={dialogAction === 'moveToCart' ? '재료로 이동' : '삭제'} visible={dialogVisible} onDelete={handleSubmit} onClose={handleCloseDialog} />
    </div>
  );
}
