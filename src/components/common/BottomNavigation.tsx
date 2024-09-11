import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline';
import { BiFoodMenu } from '@react-icons/all-files/bi/BiFoodMenu';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import { FiShoppingCart } from '@react-icons/all-files/fi/FiShoppingCart';
import useAuthContext from '../../context/AuthContext';
import NavButton from './NavButton';
import { useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const { uid } = useAuthContext() ?? {};
  const location = useLocation(); // Get the current location


 const visibleRoutes = ['/', '/ingredients', '/recipes', '/shoppings'];
 const shouldShowNavigation = visibleRoutes.includes(location.pathname);


 if (!uid || !shouldShowNavigation) { // Hide BottomNavigation if user is not logged in or on the home page
   return null;
 }

  return (
    <div className='btm-nav'>
      <NavButton to='/' icon={IoHomeOutline} label='홈' />
      <NavButton to='/ingredients' icon={CgSmartHomeRefrigerator} label='재료 관리' />
      <NavButton to='/recipes' icon={BiFoodMenu} label='레시피 관리' />
      <NavButton to='/shoppings' icon={FiShoppingCart} label='쇼핑 목록' />
    </div>
  );
}
