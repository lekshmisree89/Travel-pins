import '../styles/CountryCard.css';
import { Country } from '../models/Country';

interface CountryCardProps {
  country: Country;
  onDelete: () => void;// fn is used to handle delete
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <div className="country-card">
      <div className="country-header">
        <h2>{country.countryName}</h2>
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
      </div>
      <button className="delete-btn" onClick={onDelete}>
        Delete Country
      </button>
    </div>
  );
}; 