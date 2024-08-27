import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useLocation, useNavigate } from 'react-router-dom';

const AddNewButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${location.pathname}/new`);
  };
  const visiblePaths = ['/ingredients', '/recipes', '/shoppings'];
  const shouldShowButton = visiblePaths.includes(location.pathname);

  return (
    <div className='fixed bottom-5 right-5 z-50'>
      {shouldShowButton && (
        <button onClick={handleNavigate} className='bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300'>
          <FaPlus className='w-6 h-6' />
        </button>
      )}
    </div>
  );
};

export default AddNewButton;
