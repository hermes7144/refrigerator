import  useAuthContext  from '../context/AuthContext';
import Landing from './Landing';
import  Home  from './Home';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Index() {
  const { user, isAuthLoading } = useAuthContext();
  if (isAuthLoading) return <LoadingSpinner/>;

  return user ? <Home /> : <Landing />;
}
