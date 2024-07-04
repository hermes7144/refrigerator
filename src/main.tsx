import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Index from './pages/Index.tsx';
import Recipes from './pages/Recipes.tsx';
import Ingredients from './pages/Ingredients.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import Meals from './pages/Meals.tsx';
import RecipeWork from './pages/RecipeWork.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Index /> },
      {
        path: '/recipes',
        element: (
          <ProtectedRoute>
            <Recipes />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recipework',
        element: (
          <ProtectedRoute>
            <RecipeWork />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ingredients',
        element: (
          <ProtectedRoute>
            <Ingredients />
          </ProtectedRoute>
        ),
      },
      {
        path: '/meals',
        element: (
          <ProtectedRoute>
            <Meals />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

