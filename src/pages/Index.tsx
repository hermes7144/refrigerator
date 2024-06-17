import { useAuthContext } from '../context/AuthContext';
import Loading from './Loading';
import Home from './Home';
import Landing from './Landing';

export default function Index() {
  const { user, isAuthLoading } = useAuthContext();

  if (isAuthLoading) return <Loading />;

  return user ? <Home /> : <Landing />;
}
