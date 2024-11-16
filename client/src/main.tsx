import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ExplorePage } from './pages/ExplorePage'; // Correct path
import { SavedDishesPage } from './pages/SavedDishesPage'; // Create this page for saved dishes
import App from './App'; // Main app container

// Define the router with paths and components
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Page not found!</h1>, // Handle invalid paths
    children: [
      {
        index: true, // The default route, shows the ExplorePage at '/'
        element: <ExplorePage />,
      },

      {
        path: '/dishlist', // The path for saved dishes
        element: <SavedDishesPage savedDishes={[]} />, // Pass the required 'savedDishes' prop
      },
      
      {
        path: '/saved-dishes', // The path for saved dishes
        element: <SavedDishesPage savedDishes={[]} />, // Pass the required 'savedDishes' prop
      },
    ],
  },
]);

// Render the application with React Router
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
