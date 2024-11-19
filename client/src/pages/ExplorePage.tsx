import '../App.css';
import { FormEvent, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
//import { useNavigate } from 'react-router-dom';  // For navigation
import { GET_COUNTRY_BY_NAME } from '../utils/queries';
import {  ADD_USER_COUNTRY } from '../utils/mutations'; 
import { useMutation } from '@apollo/client'; // Import the ADD_DISHES mutation
import { Dish } from '../models/Country'; // Import the Dish type
import Auth from '../utils/auth';

export const ExplorePage = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  //const navigate = useNavigate(); // For navigation to SavedDishesPage
  const [fetchCountries, { loading: loadingCountries, data: countryResponse }] = useLazyQuery(GET_COUNTRY_BY_NAME);

// Mutation for adding dishes to the saved list
// const [addCountry] = useMutation(ADD_COUNTRY);
  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };




  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!country) return;
    setError('');
    try {
      fetchCountries({ variables: { countryName: country } });
    } catch (err) {
      setError('Failed to fetch country data');
      console.error(err);
    }
  };



    // Add the country to the saved dishes
    // Use the ADD_DISHES mutation
    // Pass the country ID and dish name as variables
    // Redirect to the SavedDishesPage
  // Handle saving the dish (to saved list or database)
   // Get the current user's ID from the token
  const token = Auth.getToken();
  console.log('Token:', token);
  const profile = Auth.getProfile();
  console.log('Full profile:', profile);
  const userId = profile?.data?.id;
  console.log('User ID:', userId);

  const [addUserCountry] = useMutation(ADD_USER_COUNTRY);

  const handleAddToSaved = async () => {
    if (!Auth.loggedIn()) {
      setError('Please log in to save countries');
      return;
    }

    if (!userId) {
      setError('Unable to get user profile');
      return;
    }

    try {
      // First fetch the country data
      const countryResult = await fetchCountries({ 
        variables: { countryName: country } 
      });
      
      console.log('Country result:', countryResult);  // Debug log
      
      if (!countryResult.data?.countryByName?._id) {
        setError('Could not find country data');
        return;
      }

      // Then add it to user's saved countries
      const { data } = await addUserCountry({
        variables: { 
          userId: userId,
          countryId: countryResult.data.countryByName._id
        }
      });
      console.log('Added country to user:', data);
    } catch (err) {
      console.error('Error adding country:', err);
      setError('Failed to save country');
    }
  };

    


  



  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-box"
          value={country}
          onChange={handleChange}
          placeholder="Enter Country Name"
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>

      {loadingCountries && <p>Loading...</p>} {/* Show loading text */}
      {error && <p>{error}</p>} {/* Show error message */}

      {(countryResponse && countryResponse.countryByName) && (
        <div className="dish-info">
          <p><strong>Country: {countryResponse.countryByName?.countryName}</strong></p>
          <p><strong>Dishes: {countryResponse.countryByName?.dishes.map((dish:Dish) => dish.dishName).join(', ')}</strong></p>
          <p><strong>Instructions:</strong> {countryResponse.countryByName?.notes}</p>
       
        </div>
      )}
      <button className="save-dish-button" onClick={handleAddToSaved}>Add to Saved Dishes</button> 
    </div>
  );
};
