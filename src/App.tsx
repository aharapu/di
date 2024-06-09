import { CharacterDetails, HomePage, RouteError } from '@src/pages';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
