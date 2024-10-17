import { Navigate } from 'react-router-dom';
import  useAuthContext  from '../context/AuthContext';
import { providerProps } from '../types/commonTypes';

export default function ProtectedRoute({ children } : providerProps) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return children;
}
