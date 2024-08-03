import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContextProvider';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { useState } from 'react';
const MINUTE = 1000 * 60;

function App() {
  const location = useLocation();
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * MINUTE,
        gcTime: 10 * MINUTE,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <div className='flex h-full'>
          <aside className='fixed top-18 left-0 h-full bg-[#f7f8f9] z-10'>
            <Sidebar toggled={toggled} onBackdropClick={() => setToggled(false)} onBreakPoint={setBroken} breakPoint='md' backgroundColor='white'>
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
          <div className='flex-1 p-4'>
            {broken && (
              <button className='btn' onClick={() => setToggled(true)}>
                Toggle
              </button>
            )}
            <Outlet />
          </div>
        </div>
        <ScrollToTopButton />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
