import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import useSidebarContext from '../../context/SidebarContext';
import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline';
import { BiFoodMenu } from '@react-icons/all-files/bi/BiFoodMenu';
import { CgSmartHomeRefrigerator } from '@react-icons/all-files/cg/CgSmartHomeRefrigerator';
import { FiShoppingCart } from '@react-icons/all-files/fi/FiShoppingCart';

export default function Side() {
  const location = useLocation();
  const { setToggled, toggled, setBroken } = useSidebarContext();

  const { uid } = useAuthContext() ?? {};

  if (!uid) {
    return;
  }

  return (
    <aside className='fixed top-18 left-0 h-full bg-[#f7f8f9] z-20'>
      <Sidebar toggled={toggled} onBackdropClick={() => setToggled(false)} onBreakPoint={setBroken} breakPoint='lg' backgroundColor='white' transitionDuration={300}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.ps-active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}>
          <MenuItem component={<Link to='/' />} active={location.pathname === '/'} icon={<IoHomeOutline />}>
            Home
          </MenuItem>
          <MenuItem component={<Link to='/ingredients' />} active={location.pathname === '/ingredients'} icon={<CgSmartHomeRefrigerator />}>
            Ingredients
          </MenuItem>
          <MenuItem component={<Link to='/recipes' />} active={location.pathname === '/recipes'} icon={<BiFoodMenu />}>
            Recipes
          </MenuItem>
          <MenuItem component={<Link to='/shopping' />} active={location.pathname === '/shopping'} icon={<FiShoppingCart />}>
            Shopping
          </MenuItem>
        </Menu>
      </Sidebar>
    </aside>
  );
}
