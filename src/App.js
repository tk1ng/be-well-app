import { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/authContext';
import { checkAuthLoader } from './utils/authLoader';
import Auth from './components/Auth';
import ErrorPage from './views/ErrorPage';
import Home from './components/Home';
import MealLogs from './components/mealLogs/mealLogs';
import Navbar from './components/navBar/Navbar';
import Profile from './components/Profile';
import RootLayout from './components/RootLayout';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//         loader: checkAuthLoader
//       },
//       {
//         path: '/profile',
//         element: <Profile />,
//         loader: checkAuthLoader
//       },
//       {
//         path: '/meal-tracker',
//         element: <MealLogs />,
//         loader: checkAuthLoader
//       },
//     ]
//   },
//   { path: '/auth', element: <Auth /> }
// ]);

function App() {

  const authContext = useContext(AuthContext);
  console.log('from app', authContext);

  return (
    // <RouterProvider router={router} />

    <div>
      {authContext.token && <Navbar />}
      <Routes>
        <Route path='/' element={authContext.token ? <Home /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!authContext.token ? <Auth /> : <Navigate to='/' />} />
        <Route path='/meal-tracker' element={authContext.token ? <MealLogs /> : <Navigate to='/auth' />} />
        <Route path='/profile' element={authContext.token ? <Profile /> : <Navigate to='/auth' />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
