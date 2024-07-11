import { Suspense, ComponentType } from 'react';
import ProtectedRoute from '../pages/ProtectedRoute.tsx';
import SyncLoader from "react-spinners/SyncLoader";
 
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen">
      <SyncLoader color='#016bc3' />
  </div>
);

function withSuspense(Component: ComponentType) {
  return function SuspendedComponent(props: any) {
    return (
      <Suspense fallback={<LoadingSpinner/>}>
        <Component {...props} />
      </Suspense>
    );
  };
}

function withProtectedRoute(Component: ComponentType) {
  return function ProtectedComponent(props: any) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

export { withSuspense, withProtectedRoute };
