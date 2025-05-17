import { createBrowserRouter } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Single from './pages/Single';
import Favorites from './pages/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/favorites', element: <Favorites /> },
      { path: '/:tipo/:id', element: <Single /> }, 
      { path: '/:tipo', element: <Home /> } 
    ]
  }
]);