import { useEffect, useState } from 'react';

interface Dish {
  name: string;
  ingredients: string[];
  instructions: string;
}

export const SavedDishesPage = () => {
  const [savedDishes, setSavedDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const storedDishes = localStorage.getItem('savedDishes');
    if (storedDishes) {
      setSavedDishes(JSON.parse(storedDishes));
    }
  }, []);

  return (
    <div className="saved-dishes-container">
      <h2>Saved Dishes</h2>
      {savedDishes.length > 0 ? (
        <ul>
          {savedDishes.map((dish, index) => (
            <li key={index}>
              <h3>{dish.name}</h3>
              <p><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p>
              <p><strong>Instructions:</strong> {dish.instructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved dishes yet.</p>
      )}
    </div>
  );
};
