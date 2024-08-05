import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContextProvider';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Side from './components/common/Side';
import ToggleWrapper from './components/common/ToggleWrapper';
import { SidebarProvider } from './context/SidebarContextProvider';
import useIsMobile from './hooks/useIsMobile';
import BottomNavigation from './components/common/BottomNavigation';
const MINUTE = 1000 * 60;

function App() {
  const isMobile = useIsMobile();

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
        {isMobile ? (
          <>
            <Outlet />
            <BottomNavigation />
          </>
        ) : (
          <div className='flex h-full'>
            <SidebarProvider>
              <Side />
              <ToggleWrapper>
                <Outlet />
              </ToggleWrapper>
            </SidebarProvider>
            <ScrollToTopButton />
          </div>
        )}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
