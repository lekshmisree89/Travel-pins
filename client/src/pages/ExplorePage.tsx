import '../App.css';
import { FormEvent, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';  // For navigation
import { GET_COUNTRY_BY_NAME } from '../utils/queries';

export const ExplorePage = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation to SavedDishesPage
  const [fetchCountries, { loading: loadingCountries, data: countryResponse }] = useLazyQuery(GET_COUNTRY_BY_NAME);


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
      setError('Failed to fetch national dish');
      console.error(err);
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
          <p><strong>Dishes: {countryResponse.countryByName?.dishes.map((dish: any) => dish.dishName).join(', ')}</strong></p>
          <p><strong>Instructions:</strong> {countryResponse.countryByName?.notes}</p>
          {/* <button className="save-dish-button" onClick={handleAddToSaved}>Add to Saved Dishes</button> */}
        </div>
      )}
    </div>
  );
};
