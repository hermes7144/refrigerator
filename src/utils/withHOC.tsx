import { ComponentType, Suspense } from 'react';
import ProtectedRoute from '../pages/ProtectedRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';

const withSuspense = (Component: ComponentType): ComponentType => () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const withProtectedRoute = (Component: ComponentType): ComponentType => () => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);


export { withSuspense, withProtectedRoute };
