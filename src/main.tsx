import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Home from './pages/Home.tsx';
import Recipe from './pages/Recipe.tsx';
import Ingredients from './pages/Ingredients.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/recipe',
        element: (
          <ProtectedRoute>
            <Recipe />
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

