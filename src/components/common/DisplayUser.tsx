import  useAuthContext  from '../../context/AuthContext';

export default function DisplayUser() {
  const { user } = useAuthContext();

  return <div>{user?.displayName}</div>;
}
