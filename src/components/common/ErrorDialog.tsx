import { useEffect } from 'react';

const ErrorDialog = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!message) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-xl font-semibold mb-4'>Error</h2>
        <p>{message}</p>
        <div className='flex justify-end'>
          <button className='mt-4 btn btn-error text-white' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
