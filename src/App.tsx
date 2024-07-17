import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContextProvider';
import ScrollToTopButton from './components/common/ScrollToTopButton';
const MINUTE = 1000 * 60;

function App() {
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
        <Outlet />
        <ScrollToTopButton />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

