import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Dish {
  name: string;
  ingredients: string[];
  instructions: string;
}

interface SavedDishesPageProps {
  savedDishes: Dish[];
}

export const SavedDishesPage: React.FC<SavedDishesPageProps> = ({ savedDishes }) => {
  const navigate = useNavigate();

  return (
    <div className="saved-dishes-page">
      <h2>Saved Dishes</h2>
      {savedDishes.length === 0 ? (
        <p>No saved dishes yet.</p>
      ) : (
        <ul>
          {savedDishes.map((dish, index) => (
            <li key={index}>
              <h3>{dish.name}</h3>
              <p><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p>
              <p><strong>Instructions:</strong> {dish.instructions}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')}>Go Back to Explore</button>
    </div>
  );
};
