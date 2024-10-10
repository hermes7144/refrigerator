import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContextProvider';
import Side from './components/common/Side';
import { SidebarProvider } from './context/SidebarContextProvider';
import useIsMobile from './hooks/useIsMobile';
import BottomNavigation from './components/common/BottomNavigation';
import AddNewButton from './components/common/AddNewButton';
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
        <SidebarProvider>
          <Navbar />
          {isMobile ? <BottomNavigation /> : <Side />}
          <Outlet />
          {/* {isMobile ? <BottomNavigation /> : <Side />} */}
          <AddNewButton />
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
