import '../App.css';
import { FormEvent, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
//import { useNavigate } from 'react-router-dom';  // For navigation
import { GET_COUNTRY_BY_NAME } from '../utils/queries';
import { ADD_COUNTRY } from '../utils/mutations'; 
import { useMutation } from '@apollo/client'; // Import the ADD_DISHES mutation
import { Dish } from '../models/Country'; // Import the Dish type

export const ExplorePage = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  //const navigate = useNavigate(); // For navigation to SavedDishesPage
  const [fetchCountries, { loading: loadingCountries, data: countryResponse }] = useLazyQuery(GET_COUNTRY_BY_NAME);

// Mutation for adding dishes to the saved list
const [addCountry] = useMutation(ADD_COUNTRY);
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
    const handleAddToSaved = async () => {
      const countryInput = {
        countryName: country,
        notes: countryResponse?.countryByName?.notes,

      };
    
      try {
        const { data } = await addCountry({
          variables: { CountryInput: countryInput }, // Pass the country input object
        });
        console.log('Added country:', data.addCountry);
      } catch (err) {
        console.error('Error adding country:', err);
      }
    };
    


  



  return (
    <div className="form-container">
      <h3>Please use the search functionality to explore the local cuisine <br></br> 
        of a country you visited</h3>
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
          <h2><strong>Country: {countryResponse.countryByName?.countryName}</strong></h2>
          <p><strong>Dishes: {countryResponse.countryByName?.dishes.map((dish:Dish) => dish.dishName).join(', ')}</strong></p>
          <p><strong>Notes:</strong> {countryResponse.countryByName?.notes}</p>
       
        </div>
      )}
      <button className="save-dish-button" onClick={handleAddToSaved}>Add to Saved Dishes</button> 
    </div>
  );
};
