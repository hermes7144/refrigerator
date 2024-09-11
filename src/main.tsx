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
const RegisterIngredients = withSuspense(withProtectedRoute(lazy(() => import('./pages/RegisterIngredients.tsx'))));
const Meals = withSuspense(withProtectedRoute(lazy(() => import('./pages/Meals.tsx'))));
const RegisterRecipes = withSuspense(withProtectedRoute(lazy(() => import('./pages/RegisterRecipes.tsx'))));
const Shoppings = withSuspense(withProtectedRoute(lazy(() => import('./pages/Shoppings.tsx'))));
const RegisterShopping = withSuspense(withProtectedRoute(lazy(() => import('./pages/RegisterShopping.tsx'))));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Index /> },
      { path: '/meals', element: <Meals /> },
      { path: '/recipes', element: <Recipes /> },
      { path: '/recipes/new', element: <RegisterRecipes /> },
      { path: '/ingredients', element: <Ingredients /> },
      { path: '/ingredients/new', element: <RegisterIngredients /> },
      { path: '/shoppings', element: <Shoppings /> },
      { path: '/shoppings/new', element: <RegisterShopping /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
