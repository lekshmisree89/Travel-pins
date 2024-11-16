import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExplorePage from './pages/ExplorePage.tsx';
import App from './App.jsx';


// import Country from './pages/Country.tsx';
// import SingleCountry from './pages/SingleCountry.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,


 

    errorElement: <h1 className='display-2'>Wrong page!</h1>,//
    children: [
      {
        index: true,
        element: <ExplorePage />
      },
      
     
      // { 
      //   path: '/country',
      //   element: <Country />
      // },
      // { 
      //   path: '/country/:countryId',
      //   element: <SingleCountry />
      // }

 
      ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)