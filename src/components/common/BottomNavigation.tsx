import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline';
import { BiFoodMenu } from '@react-icons/all-files/bi/BiFoodMenu';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import { FiShoppingCart } from '@react-icons/all-files/fi/FiShoppingCart';
import useAuthContext from '../../context/AuthContext';
import NavButton from './NavButton';

export default function BottomNavigation() {
  const { uid } = useAuthContext() ?? {};

  if (!uid) {
    return;
  }

  return (
    <div className='btm-nav'>
      <NavButton to='/' icon={IoHomeOutline} label='식사계획' />
      <NavButton to='/ingredients' icon={CgSmartHomeRefrigerator} label='재료 관리' />
      <NavButton to='/recipes' icon={BiFoodMenu} label='레시피 관리' />
      <NavButton to='/shoppings' icon={FiShoppingCart} label='쇼핑 목록' />
    </div>
  );
}
