import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ExplorePage } from './pages/ExplorePage'; // Correct path
import { SavedDishesPage } from './pages/SavedDishesPage'; // Create this page for saved dishes
import App from './App'; // Main app container
import {ProtectedRoute}from './components/ProtectedRoutes'; // Correct path
import Home from './pages/Home.tsx';

// Define the router with paths and components
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Wrap the App component in ProtectedRoute
    errorElement: <h1 className="display-2">Page not found!</h1>, // Handle invalid paths
    

    
    children: [
     

    

      {
        path: '/home', // The path for the home page  
        index: true, // The default route, shows the ExplorePage at '/'
        element: <ProtectedRoute><Home/></ProtectedRoute>
      },

      {
        path: '/explore', // The path for saved dishes
        element:  <ProtectedRoute><ExplorePage /></ProtectedRoute>,

        
        // Pass the required 'savedDishes' prop
      },
      
      {
        path: '/saved-dishes', // The path for saved dishes
        element: <SavedDishesPage />, // Pass the required 'savedDishes' prop
      },
    ],
  },
]);

// Render the application with React Router
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
