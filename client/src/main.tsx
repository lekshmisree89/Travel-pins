import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.tsx';
import Profile from './components/Profile.tsx';
// import Country from './pages/Country.tsx';
// import SingleCountry from './pages/SingleCountry.tsx';

import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,


 

    errorElement: <h1 className='display-2'>Wrong page!</h1>,//
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/profiles/:username',
        element: <Profile />
      },
      { 
        path: '/me',
        element: <Profile />
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