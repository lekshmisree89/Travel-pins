import '../styles/CountryCard.css';
import { Country } from '../models/Country';

interface CountryCardProps {
  country: Country;
  
  onDeleteCountry?: (countryId: any) => void;
  onDeleteDish?: (countryId: any, dishId: any) => void;
}

export const CountryCard = ({ country, onDeleteCountry }: CountryCardProps) => {
  return (
    <div className="country-card">
      <div className="country-header">
        <h2>{country.countryName}</h2>
        {onDeleteCountry && (
          <button
            className="delete-button"
            onClick={() => onDeleteCountry(country._id)}
          >
            🗑 Delete
          </button>
        )}
      </div>
      <div className="dishes-section">
        <h3>🍽 Dishes</h3>
        <ul className="dishes-list">
          {country.dishes.map((dish, index) => (
            <li key={index} className="dish-item">
              {dish.dishName}
            </li>
          ))}
        </ul>
        <button className="del-dish-button">Delete Dish</button>
        
      </div>
    </div>
  );
};
