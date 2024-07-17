import { useEffect, useRef } from 'react';

// DialogAddIngredient.tsx
type RemoveDialogProps = {
  visible:boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export default function RemoveDialog({ visible, onSubmit, onClose }: RemoveDialogProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <dialog ref={modalRef} id='my_modal_2' className='modal modal-bottom sm:modal-middle'  onCancel={onClose}>
      <div className='modal-box flex flex-col'>
        삭제하시겠습니까?
        <div className='modal-action'>
          <button className='btn btn-sm' onClick={onClose}>
            취소
          </button>
          <button className='btn btn-sm' onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}
