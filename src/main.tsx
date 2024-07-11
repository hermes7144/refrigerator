import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { withSuspense, withProtectedRoute } from './utils/withHOC.tsx';

const NotFound = withSuspense(lazy(() => import('./pages/NotFound.tsx')));
const Index = withSuspense(lazy(() => import('./pages/Index.tsx')));
const Recipes = withSuspense(withProtectedRoute(lazy(() => import('./pages/Recipes.tsx'))));
const Ingredients = withSuspense(withProtectedRoute(lazy(() => import('./pages/Ingredients.tsx'))));
const Meals = withSuspense(withProtectedRoute(lazy(() => import('./pages/Meals.tsx'))));
const RecipeWork = withSuspense(withProtectedRoute(lazy(() => import('./pages/RecipeWork.tsx'))));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Index /> },
      { path: '/recipes', element: <Recipes /> },
      { path: '/recipes/new', element: <RecipeWork /> },
      { path: '/ingredients', element: <Ingredients /> },
      { path: '/meals', element: <Meals /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);