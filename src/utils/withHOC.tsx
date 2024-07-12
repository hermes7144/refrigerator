import React, { Suspense, ComponentType } from 'react';
import ProtectedRoute from '../pages/ProtectedRoute';
import SyncLoader from 'react-spinners/SyncLoader';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <SyncLoader color="#016bc3" />
  </div>
);

function withSuspense<P>(Component: ComponentType<P>) {
  return function SuspendedComponent(props: JSX.IntrinsicAttributes & P) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

function withProtectedRoute<P>(Component: ComponentType<P>) {
  return function ProtectedComponent(props: JSX.IntrinsicAttributes & P) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

export { withSuspense, withProtectedRoute };
