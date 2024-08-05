import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import useAuthContext from '../../context/AuthContext';
import useSidebarContext from '../../context/SidebarContext';

export default function Side() {
  const location = useLocation();
  const { setToggled, toggled, setBroken } = useSidebarContext();

  const { uid } = useAuthContext() ?? {};

  if (!uid) {
    return;
  }

  return (
    <aside className='fixed top-18 left-0 h-full bg-[#f7f8f9] z-10'>
      <Sidebar toggled={toggled} onBackdropClick={() => setToggled(false)} onBreakPoint={setBroken} breakPoint='lg' backgroundColor='white'>
        <Menu
          menuItemStyles={{
            button: {
              [`&.ps-active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}>
          <MenuItem component={<Link to='/' />} active={location.pathname === '/'}>
            Home
          </MenuItem>
          <MenuItem component={<Link to='/ingredients' />} active={location.pathname === '/ingredients'}>
            Ingredients
          </MenuItem>
          <MenuItem component={<Link to='/recipes' />} active={location.pathname === '/recipes'}>
            Recipes
          </MenuItem>
          <MenuItem component={<Link to='/shopping' />} active={location.pathname === '/shopping'}>
            Shopping
          </MenuItem>
        </Menu>
      </Sidebar>
    </aside>
  );
}
