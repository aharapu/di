import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CharacterDetails, HomePage, RouteError } from '@src/pages';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/character/:id',
    element: <CharacterDetails />,
    errorElement: <RouteError />,
  },
  {
    path: '/',
    element: <HomePage />,
    errorElement: <RouteError />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
