import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/Auth';
import ErrorPage from './views/ErrorPage';
import Home from './components/Home';
import RootLayout from './components/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
    ]
  },
  { path: '/authenticate', element: <Auth /> }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
