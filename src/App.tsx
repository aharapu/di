import { HomePage, RouteError } from '@src/pages';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <RouteError />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
