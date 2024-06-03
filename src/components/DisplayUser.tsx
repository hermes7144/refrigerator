import { useAuthContext } from '../context/AuthContext';

export default function DisplayUser() {
  const authContext = useAuthContext();

  if (!authContext) {
    return null; // or some fallback UI
  }
  const { user } = authContext;

  return <div>{user?.displayName}</div>;
}
