import '../App.css';
import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COUNTRY } from '../utils/mutations';

// Seed data (replace API with this data)
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
  const [addCountry] = useMutation(ADD_COUNTRY);
  const [dish, setDish] = useState<Dish | null>(null); // State to store the national dish data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedDishes, setSavedDishes] = useState<Dish[]>([]); // State to store saved dishes

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!country) return;

    setLoading(true);
    setError('');
    
    try {
      // Find the country in the seed data
      const countryData = seedData.find((data) => data.name.toLowerCase() === country.toLowerCase());

      if (countryData) {
        setDish(countryData.dish); // Set the dish data if the country is found
      } else {
        setError('Country not found in the seed data');
      }

      // Optionally, add the country to your database (with GraphQL mutation)
      addCountry({
        variables: { name: country },
      });

    } catch (err) {
      setError('Failed to fetch national dish');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding dish to saved dishes
  const handleAddToSaved = () => {
    if (dish) {
      setSavedDishes((prevSavedDishes) => [...prevSavedDishes, dish]); // Add the dish to the saved dishes
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

      {loading && <p>Loading...</p>} {/* Show loading text */}
      {error && <p>{error}</p>} {/* Show error message */}
      
      {dish && (
        <div className="dish-info">
          <h2>National Dish of {country}:</h2>
          <p><strong>{dish?.name}</strong></p>
          <p><strong>Ingredients:</strong> {dish?.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {dish?.instructions}</p>
          <button className="save-dish-button" onClick={handleAddToSaved}>Add to Saved Dishes</button>
        </div>
      )}

      {savedDishes.length > 0 && (
        <div className="saved-dishes">
          <h3>Saved Dishes:</h3>
          <ul>
            {savedDishes.map((savedDish, index) => (
              <li key={index}>
                <strong>{savedDish.name}</strong> - Ingredients: {savedDish.ingredients.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
