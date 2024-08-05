import { Link, useLocation } from 'react-router-dom';
import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline';
import { BiFoodMenu } from '@react-icons/all-files/bi/BiFoodMenu';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import { FiShoppingCart } from '@react-icons/all-files/fi/FiShoppingCart';

export default function BottomNavigation() {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className='btm-nav'>
      <button className={`text-brand ${location.pathname === '/' ? 'active' : ''}`}>
        <Link to='/'>
          <IoHomeOutline className='w-7 h-7' />
        </Link>
      </button>
      <button className={`text-brand ${location.pathname === '/ingredients' ? 'active' : ''}`}>
        <Link to='/ingredients'>
          <CgSmartHomeRefrigerator className='w-7 h-7' />
        </Link>
      </button>
      <button className={`text-brand ${location.pathname === '/recipes' ? 'active' : ''}`}>
        <Link to='/recipes'>
          <BiFoodMenu className='w-7 h-7' />
        </Link>
      </button>
      <button className={`text-brand ${location.pathname === '/shopping' ? 'active' : ''}`}>
        <Link to='/shopping'>
          <FiShoppingCart className='w-7 h-7' />
        </Link>
      </button>
    </div>
  );
}
