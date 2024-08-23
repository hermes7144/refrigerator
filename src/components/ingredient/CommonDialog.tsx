import { useEffect, useRef } from 'react';
import { CommonDialogProps } from '../../types/RecipeTypes';

export default function CommonDialog({ text, isVisible, onSubmit, onClose }: CommonDialogProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    isVisible ? modalRef.current.showModal() : modalRef.current.close();
  }, [isVisible]);

  return (
    <dialog ref={modalRef} id='my_modal_2' className='modal modal-bottom sm:modal-middle' onCancel={onClose}>
      <div className='modal-box flex flex-col'>
        {text} 하시겠습니까?
        <div className='modal-action'>
          <button className='btn btn-sm' onClick={onClose}>
            취소
          </button>
          <button className='btn btn-sm' onClick={onSubmit}>
            확인
          </button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop' onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
