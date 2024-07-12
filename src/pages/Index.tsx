import  useAuthContext  from '../context/AuthContext';
import Loading from './Loading';
import Landing from './Landing';
import  Home  from './Home';

export default function Index() {
  const { user, isAuthLoading } = useAuthContext() ?? {};
  if (isAuthLoading) return <Loading />;

  return user ? <Home /> : <Landing />;
}
