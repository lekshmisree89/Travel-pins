import '../App.css';
import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_COUNTRY } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';  // For navigation
import { GET_COUNTRIES } from '../utils/queries';

const seedData = [
  {
    name: "Spain",
    notes: "Mediterranean country known for its tapas and Mediterranean cuisine",
    dish: {
      name: "Paella",
      ingredients: ["Rice", "Saffron", "Seafood", "Chicken", "Vegetables"],
      instructions: "Cook rice with saffron, add seafood and chicken, simmer with vegetables."
    }
  },
  {
    name: "India",
    notes: "Rich culinary diversity with extensive use of spices and curry",
    dish: {
      name: "Biryani",
      ingredients: ["Rice", "Chicken", "Curry spices", "Yogurt", "Saffron"],
      instructions: "Layer rice with chicken and spices, cook together for a flavorful meal."
    }
  },
  {
    name: "Peru",
    notes: "Cuisine that blends indigenous, European and Asian influences",
    dish: {
      name: "Ceviche",
      ingredients: ["Fish", "Lime", "Onions", "Chili", "Coriander"],
      instructions: "Marinate fish in lime juice, mix with onions, chili, and coriander."
    }
  }
];

interface Dish {
  name: string;
  ingredients: string[];
  instructions: string;
}

export const ExplorePage = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation to SavedDishesPage
  const [fetchCountries, { loading: loadingCountries, data: countries }] = useLazyQuery(GET_COUNTRIES);


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
      fetchCountries({ variables: { name: country } });
    } catch (err) {
      setError('Failed to fetch national dish');
      console.error(err);
    }
  };

  console.log('log: countries', countries);

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
      
      {/* {dish && (
        <div className="dish-info">
          <h2>National Dish of {country}:</h2>
          <p><strong>{dish?.name}</strong></p>
          <p><strong>Ingredients:</strong> {dish?.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {dish?.instructions}</p>
          <button className="save-dish-button" onClick={handleAddToSaved}>Add to Saved Dishes</button>
        </div>
      )} */}
    </div>
  );
};
